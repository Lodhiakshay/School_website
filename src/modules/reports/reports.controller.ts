import { Response, NextFunction } from 'express';
import { reportsService } from './reports.service.js';
import { sendResponse } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/types/auth.types.js';

export class ReportsController {
  async getStudentReport(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await reportsService.getStudentReport(req.query);
      sendResponse(res, 200, data, 'Student report data generated');
    } catch (error) {
      next(error);
    }
  }

  async getFeeReport(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = await reportsService.getFeeCollectionReport(req.query);
      sendResponse(res, 200, data, 'Fee collection report data generated');
    } catch (error) {
      next(error);
    }
  }

  async getAttendanceReport(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { classId, sectionId, month } = req.query;
      const targetMonth = (month as string) || new Date().toISOString().substring(0, 7);
      const data = await reportsService.getAttendanceReport({
        classId: classId as string,
        sectionId: sectionId as string,
        month: targetMonth,
      });
      sendResponse(res, 200, data, 'Attendance monthly report data generated');
    } catch (error) {
      next(error);
    }
  }

  async getExamReport(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { examId, classId } = req.query;
      const data = await reportsService.getExamPerformanceReport(examId as string, classId as string);
      sendResponse(res, 200, data, 'Exam performance report generated');
    } catch (error) {
      next(error);
    }
  }
}

export const reportsController = new ReportsController();

