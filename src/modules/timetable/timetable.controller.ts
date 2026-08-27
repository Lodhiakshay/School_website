import { Response, NextFunction } from 'express';
import { timetableService } from './timetable.service.js';
import { sendResponse, sendCreated } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/types/auth.types.js';

export class TimetableController {
  async getSectionTimetable(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { sectionId } = req.params;
      const { academicYearId } = req.query;
      const slots = await timetableService.getSectionTimetable(sectionId, academicYearId as string);
      sendResponse(res, 200, slots, 'Section timetable fetched');
    } catch (error) {
      next(error);
    }
  }

  async getTeacherTimetable(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { teacherId } = req.params;
      const { academicYearId } = req.query;
      const slots = await timetableService.getTeacherTimetable(teacherId, academicYearId as string);
      sendResponse(res, 200, slots, 'Teacher timetable fetched');
    } catch (error) {
      next(error);
    }
  }

  async saveSlot(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const slot = await timetableService.saveSlot(req.body);
      sendCreated(res, slot, 'Timetable slot saved successfully');
    } catch (error) {
      next(error);
    }
  }

  async deleteSlot(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await timetableService.deleteSlot(req.params.id);
      sendResponse(res, 200, result, 'Timetable slot deleted');
    } catch (error) {
      next(error);
    }
  }
}

export const timetableController = new TimetableController();

