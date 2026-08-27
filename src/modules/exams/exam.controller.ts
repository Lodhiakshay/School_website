import { Response, NextFunction } from 'express';
import { examService } from './exam.service.js';
import { sendResponse, sendCreated } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/types/auth.types.js';

export class ExamController {
  async list(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const exams = await examService.listExams(req.query.academicYearId as string);
      sendResponse(res, 200, exams, 'Exams list fetched');
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const exam = await examService.getExamById(req.params.id);
      sendResponse(res, 200, exam, 'Exam details fetched');
    } catch (error) {
      next(error);
    }
  }

  async create(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const exam = await examService.createExam(req.body);
      sendCreated(res, exam, 'Exam created successfully');
    } catch (error) {
      next(error);
    }
  }

  async addSchedule(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const schedule = await examService.addSchedule(req.params.id, req.body);
      sendCreated(res, schedule, 'Exam schedule slot added');
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await examService.updateExamStatus(req.params.id, req.body.status);
      sendResponse(res, 200, updated, 'Exam status updated');
    } catch (error) {
      next(error);
    }
  }
}

export const examController = new ExamController();

