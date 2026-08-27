import { ExamModel, IExam } from './models/exam.model.js';
import { ExamScheduleModel } from './models/exam-schedule.model.js';
import { AcademicYearModel } from '../academics/models/academic-year.model.js';
import { NotFoundError } from '../../common/errors/app-error.js';

class ExamService {
  async createExam(data: any): Promise<IExam> {
    if (!data.academicYearId) {
      const currentYear = await AcademicYearModel.findOne({ isCurrent: true });
      if (currentYear) data.academicYearId = currentYear._id;
    }
    return ExamModel.create(data);
  }

  async listExams(academicYearId?: string): Promise<IExam[]> {
    const filter = academicYearId ? { academicYearId } : {};
    return ExamModel.find(filter).populate('applicableClasses').sort({ startDate: -1 });
  }

  async getExamById(id: string): Promise<any> {
    const exam = await ExamModel.findById(id).populate('applicableClasses');
    if (!exam) throw new NotFoundError('Exam not found');
    const schedules = await ExamScheduleModel.find({ examId: id })
      .populate('classId')
      .populate('subjectId');
    return { exam, schedules };
  }

  async addSchedule(id: string, scheduleData: any): Promise<any> {
    const exam = await ExamModel.findById(id);
    if (!exam) throw new NotFoundError('Exam not found');
    return ExamScheduleModel.create({
      ...scheduleData,
      examId: id,
    });
  }

  async updateExamStatus(id: string, status: string): Promise<IExam> {
    const exam = await ExamModel.findByIdAndUpdate(id, { status }, { new: true });
    if (!exam) throw new NotFoundError('Exam not found');
    return exam;
  }
}

export const examService = new ExamService();
