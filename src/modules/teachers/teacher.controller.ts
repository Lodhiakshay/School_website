import { Response, NextFunction } from 'express';
import { teacherService } from './teacher.service.js';
import { sendResponse, sendCreated } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/types/auth.types.js';

export class TeacherController {
  async list(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { department, status, search, page, limit } = req.query;
      const result = await teacherService.listTeachers({
        department: department as string,
        status: status as string,
        search: search as string,
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
      });
      sendResponse(res, 200, result.teachers, 'Teachers fetched', result.meta);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const teacher = await teacherService.getTeacherById(req.params.id);
      sendResponse(res, 200, teacher, 'Teacher details fetched');
    } catch (error) {
      next(error);
    }
  }

  async create(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const teacher = await teacherService.createTeacher(req.body);
      sendCreated(res, teacher, 'Teacher created successfully');
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await teacherService.updateTeacher(req.params.id, req.body);
      sendResponse(res, 200, updated, 'Teacher updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async delete(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await teacherService.deleteTeacher(req.params.id);
      sendResponse(res, 200, result, 'Teacher deleted');
    } catch (error) {
      next(error);
    }
  }
}

export const teacherController = new TeacherController();

