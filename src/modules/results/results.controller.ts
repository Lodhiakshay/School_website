import { Response, NextFunction } from 'express';
import { resultsService } from './results.service.js';
import { sendResponse, sendCreated } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/types/auth.types.js';

export class ResultsController {
  async saveMarks(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await resultsService.saveMarksBatch({
        ...req.body,
        userId: req.user!.userId,
      });
      sendResponse(res, 200, result, 'Marks saved successfully');
    } catch (error) {
      next(error);
    }
  }

  async getSubjectMarks(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { examId, classId, sectionId, subjectId } = req.query;
      const sheet = await resultsService.getSubjectMarksSheet(
        examId as string,
        classId as string,
        sectionId as string,
        subjectId as string
      );
      sendResponse(res, 200, sheet, 'Marksheet fetched');
    } catch (error) {
      next(error);
    }
  }

  async publishResults(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { examId, classId, sectionId } = req.body;
      const result = await resultsService.generateAndPublishResults(
        examId,
        classId,
        sectionId,
        req.user!.userId
      );
      sendResponse(res, 200, result, 'Results computed and published');
    } catch (error) {
      next(error);
    }
  }

  async getReportCard(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { examId, studentId } = req.params;
      const targetStudentId = studentId || req.user?.entityId;
      const data = await resultsService.getStudentReportCard(examId, targetStudentId!);
      sendResponse(res, 200, data, 'Report card fetched');
    } catch (error) {
      next(error);
    }
  }

  async listResults(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { examId, classId, sectionId, studentId } = req.query;
      const results = await resultsService.listPublishedResults({
        examId: examId as string,
        classId: classId as string,
        sectionId: sectionId as string,
        studentId: (studentId as string) || (req.user?.role === 'Student' ? req.user.entityId : undefined),
      });
      sendResponse(res, 200, results, 'Published results fetched');
    } catch (error) {
      next(error);
    }
  }
}

export const resultsController = new ResultsController();

