import { Response, NextFunction } from 'express';
import { homeworkService } from './homework.service.js';
import { sendResponse, sendCreated } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/types/auth.types.js';

export class HomeworkController {
  async list(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { classId, sectionId, subjectId, teacherId } = req.query;
      const homeworks = await homeworkService.listHomework({
        classId: classId as string,
        sectionId: sectionId as string,
        subjectId: subjectId as string,
        teacherId: teacherId as string,
      });
      sendResponse(res, 200, homeworks, 'Homework list fetched');
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await homeworkService.getHomeworkById(req.params.id);
      sendResponse(res, 200, result, 'Homework details fetched');
    } catch (error) {
      next(error);
    }
  }

  async create(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const homework = await homeworkService.createHomework({
        ...req.body,
        teacherId: req.user?.entityId || req.body.teacherId,
      });
      sendCreated(res, homework, 'Homework created successfully');
    } catch (error) {
      next(error);
    }
  }

  async submit(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const studentId = req.user?.entityId || req.body.studentId;
      const submission = await homeworkService.submitHomework(req.params.id, studentId, req.body);
      sendResponse(res, 200, submission, 'Homework submitted successfully');
    } catch (error) {
      next(error);
    }
  }

  async grade(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const graded = await homeworkService.gradeSubmission(req.params.submissionId, req.body);
      sendResponse(res, 200, graded, 'Submission graded successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const homeworkController = new HomeworkController();

