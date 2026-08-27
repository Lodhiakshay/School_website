import { HomeworkModel } from './models/homework.model.js';
import { HomeworkSubmissionModel } from './models/homework-submission.model.js';
import { AcademicYearModel } from '../academics/models/academic-year.model.js';
import { NotFoundError, BadRequestError } from '../../common/errors/app-error.js';

export class HomeworkService {
  async listHomework(query: {
    classId?: string;
    sectionId?: string;
    subjectId?: string;
    teacherId?: string;
  }) {
    const filter: any = {};
    if (query.classId) filter.classId = query.classId;
    if (query.sectionId) filter.sectionId = query.sectionId;
    if (query.subjectId) filter.subjectId = query.subjectId;
    if (query.teacherId) filter.teacherId = query.teacherId;

    return HomeworkModel.find(filter)
      .populate('subjectId', 'name code')
      .populate('classId', 'name code')
      .populate('sectionId', 'name')
      .populate('teacherId', 'name employeeId')
      .sort({ dueDate: -1 });
  }

  async getHomeworkById(id: string) {
    const homework = await HomeworkModel.findById(id)
      .populate('subjectId')
      .populate('classId')
      .populate('sectionId')
      .populate('teacherId');

    if (!homework) throw new NotFoundError('Homework not found');

    const submissions = await HomeworkSubmissionModel.find({ homeworkId: id })
      .populate('studentId', 'firstName lastName admissionNumber currentRollNumber');

    return { homework, submissions };
  }

  async createHomework(data: any) {
    let academicYearId = data.academicYearId;
    if (!academicYearId) {
      const activeYear = await AcademicYearModel.findOne({ isCurrent: true });
      if (!activeYear) throw new BadRequestError('Active academic year not found');
      academicYearId = activeYear._id;
    }

    const homework = new HomeworkModel({
      ...data,
      academicYearId,
    });
    await homework.save();
    return homework;
  }

  async submitHomework(homeworkId: string, studentId: string, data: { attachmentUrls: string[]; notes?: string }) {
    const homework = await HomeworkModel.findById(homeworkId);
    if (!homework) throw new NotFoundError('Homework not found');

    const isLate = new Date() > new Date(homework.dueDate);

    const submission = await HomeworkSubmissionModel.findOneAndUpdate(
      { homeworkId, studentId },
      {
        homeworkId,
        studentId,
        submissionDate: new Date(),
        attachmentUrls: data.attachmentUrls || [],
        notes: data.notes || '',
        status: isLate ? 'late' : 'submitted',
      },
      { upsert: true, new: true }
    );

    return submission;
  }

  async gradeSubmission(submissionId: string, data: { pointsObtained: number; feedback?: string }) {
    const submission = await HomeworkSubmissionModel.findByIdAndUpdate(
      submissionId,
      {
        pointsObtained: data.pointsObtained,
        feedback: data.feedback || '',
        status: 'reviewed',
      },
      { new: true }
    );
    if (!submission) throw new NotFoundError('Submission not found');
    return submission;
  }
}

export const homeworkService = new HomeworkService();

