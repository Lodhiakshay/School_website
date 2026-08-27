import { Response, NextFunction } from 'express';
import { attendanceService } from './attendance.service.js';
import { AuthRequest } from '../../common/types/auth.types.js';
import { sendResponse, sendCreated } from '../../common/utils/response.js';

class AttendanceController {
  async markBatch(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await attendanceService.markBatchAttendance({
        ...req.body,
        markedBy: req.user?.userId,
      });
      sendCreated(res, result, 'Attendance recorded successfully');
    } catch (err) {
      next(err);
    }
  }

  async getClassSheet(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { classId, sectionId, date } = req.query as { classId: string; sectionId: string; date: string };
      const sheet = await attendanceService.getClassAttendance(classId, sectionId, date);
      sendResponse(res, 200, sheet, 'Class attendance sheet fetched');
    } catch (err) {
      next(err);
    }
  }

  async getStudentSummary(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { studentId } = req.params;
      const { month } = req.query as { month?: string };
      const summary = await attendanceService.getStudentAttendanceSummary(studentId, month);
      sendResponse(res, 200, summary, 'Student attendance summary fetched');
    } catch (err) {
      next(err);
    }
  }

  async getTodayStats(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const stats = await attendanceService.getTodayOverview();
      sendResponse(res, 200, stats, 'Today attendance stats fetched');
    } catch (err) {
      next(err);
    }
  }
}

export const attendanceController = new AttendanceController();
