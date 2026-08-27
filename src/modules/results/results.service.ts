import { MarkModel } from './models/mark.model.js';
import { ResultModel } from './models/result.model.js';
import { ExamModel } from '../exams/models/exam.model.js';
import { StudentModel } from '../students/models/student.model.js';
import { SubjectModel } from '../academics/models/subject.model.js';
import { SchoolModel } from '../school/models/school.model.js';
import { NotFoundError, BadRequestError, ForbiddenError } from '../../common/errors/app-error.js';

export class ResultsService {
  async saveMarksBatch(data: {
    examId: string;
    classId: string;
    sectionId: string;
    subjectId: string;
    userId: string;
    marks: Array<{
      studentId: string;
      theoryMarks: number;
      practicalMarks?: number;
      isAbsent?: boolean;
      remarks?: string;
    }>;
  }) {
    const subject = await SubjectModel.findById(data.subjectId);
    if (!subject) throw new NotFoundError('Subject not found');

    const operations = data.marks.map((item) => {
      const theory = item.isAbsent ? 0 : Number(item.theoryMarks || 0);
      const practical = item.isAbsent ? 0 : Number(item.practicalMarks || 0);
      const total = theory + practical;

      return {
        updateOne: {
          filter: {
            examId: data.examId,
            studentId: item.studentId,
            subjectId: data.subjectId,
          },
          update: {
            $set: {
              examId: data.examId,
              classId: data.classId,
              sectionId: data.sectionId,
              subjectId: data.subjectId,
              studentId: item.studentId,
              theoryMarks: theory,
              practicalMarks: practical,
              totalMarks: total,
              maxMarks: subject.maxMarks || 100,
              isAbsent: !!item.isAbsent,
              remarks: item.remarks || '',
              enteredBy: data.userId,
              status: 'submitted',
            },
          },
          upsert: true,
        },
      };
    });

    await MarkModel.bulkWrite(operations as any);
    return { message: `Marks recorded successfully for ${data.marks.length} students` };
  }

  async getSubjectMarksSheet(examId: string, classId: string, sectionId: string, subjectId: string) {
    const students = await StudentModel.find({
      currentClassId: classId,
      currentSectionId: sectionId,
      status: 'active',
    })
      .sort({ currentRollNumber: 1 })
      .lean();

    const marks = await MarkModel.find({
      examId,
      classId,
      sectionId,
      subjectId,
    }).lean();

    const marksMap = new Map(marks.map((m) => [m.studentId.toString(), m]));

    const records = students.map((stu) => {
      const m = marksMap.get(stu._id.toString());
      return {
        studentId: stu._id,
        rollNumber: stu.currentRollNumber,
        admissionNumber: stu.admissionNumber,
        name: `${stu.firstName} ${stu.lastName}`,
        theoryMarks: m ? m.theoryMarks : 0,
        practicalMarks: m ? m.practicalMarks : 0,
        totalMarks: m ? m.totalMarks : 0,
        maxMarks: m ? m.maxMarks : 100,
        isAbsent: m ? m.isAbsent : false,
        remarks: m ? m.remarks : '',
        status: m ? m.status : 'draft',
      };
    });

    return {
      examId,
      classId,
      sectionId,
      subjectId,
      records,
    };
  }

  async generateAndPublishResults(examId: string, classId: string, sectionId: string, publishedBy: string) {
    const exam = await ExamModel.findById(examId);
    if (!exam) throw new NotFoundError('Exam not found');

    const school = await SchoolModel.findOne();
    const gradingScale = school?.gradingScale || [];

    // 1. Get all students in this class section
    const students = await StudentModel.find({
      currentClassId: classId,
      currentSectionId: sectionId,
      status: 'active',
    }).lean();

    // 2. Get all marks for this exam and class/section
    const allMarks = await MarkModel.find({
      examId,
      classId,
      sectionId,
    }).populate('subjectId').lean();

    const resultsToInsert = [];

    for (const student of students) {
      const studentMarks = allMarks.filter(
        (m) => m.studentId.toString() === student._id.toString()
      );

      let grandTotal = 0;
      let maxGrandTotal = 0;
      let allPassed = true;

      const subjectResults = studentMarks.map((m) => {
        const sub = m.subjectId as any;
        const total = m.totalMarks;
        const max = m.maxMarks || 100;
        const passMark = sub?.passingMarks || 33;
        const isPassed = !m.isAbsent && total >= passMark;
        if (!isPassed) allPassed = false;

        grandTotal += total;
        maxGrandTotal += max;

        const subPercentage = max > 0 ? (total / max) * 100 : 0;
        let subGrade = 'D';
        for (const scale of gradingScale) {
          if (subPercentage >= scale.minPercentage && subPercentage <= scale.maxPercentage) {
            subGrade = scale.grade;
            break;
          }
        }

        return {
          subjectId: sub?._id || m.subjectId,
          subjectName: sub?.name || 'Subject',
          subjectCode: sub?.code || '',
          theoryMarks: m.theoryMarks,
          practicalMarks: m.practicalMarks || 0,
          totalMarks: total,
          maxMarks: max,
          grade: subGrade,
          isPassed,
        };
      });

      const percentage = maxGrandTotal > 0 ? Math.round((grandTotal / maxGrandTotal) * 100 * 10) / 10 : 0;

      let finalGrade = 'D';
      for (const scale of gradingScale) {
        if (percentage >= scale.minPercentage && percentage <= scale.maxPercentage) {
          finalGrade = scale.grade;
          break;
        }
      }

      resultsToInsert.push({
        examId,
        studentId: student._id,
        classId,
        sectionId,
        academicYearId: exam.academicYearId,
        subjects: subjectResults,
        grandTotal,
        maxGrandTotal,
        percentage,
        grade: finalGrade,
        isPassed: allPassed && percentage >= 33,
        status: 'published',
        publishedAt: new Date(),
        publishedBy,
      });
    }

    // Sort by grand total to assign ranks
    resultsToInsert.sort((a, b) => b.grandTotal - a.grandTotal);
    resultsToInsert.forEach((r, idx) => {
      (r as any).rank = idx + 1;
    });

    // Bulk upsert into ResultModel
    const resultOps = resultsToInsert.map((res) => ({
      updateOne: {
        filter: { examId: res.examId, studentId: res.studentId },
        update: { $set: res },
        upsert: true,
      },
    }));

    if (resultOps.length > 0) {
      await ResultModel.bulkWrite(resultOps as any);
    }

    // Update Mark status to published
    await MarkModel.updateMany({ examId, classId, sectionId }, { status: 'published' });

    return {
      message: `Results calculated and published for ${resultsToInsert.length} students`,
      totalStudents: resultsToInsert.length,
    };
  }

  async getStudentReportCard(examId: string, studentId: string) {
    const result = await ResultModel.findOne({ examId, studentId })
      .populate('examId', 'name examType startDate endDate')
      .populate('studentId')
      .populate('classId', 'name code')
      .populate('sectionId', 'name')
      .populate('academicYearId', 'name');

    if (!result) throw new NotFoundError('Result not found or not published yet');

    const school = await SchoolModel.findOne();

    return {
      school,
      reportCard: result,
    };
  }

  async listPublishedResults(query: { examId?: string; classId?: string; sectionId?: string; studentId?: string }) {
    const filter: any = { status: 'published' };
    if (query.examId) filter.examId = query.examId;
    if (query.classId) filter.classId = query.classId;
    if (query.sectionId) filter.sectionId = query.sectionId;
    if (query.studentId) filter.studentId = query.studentId;

    return ResultModel.find(filter)
      .populate('examId', 'name examType')
      .populate('studentId', 'firstName lastName admissionNumber currentRollNumber')
      .populate('classId', 'name code')
      .populate('sectionId', 'name')
      .sort({ rank: 1 });
  }
}

export const resultsService = new ResultsService();
