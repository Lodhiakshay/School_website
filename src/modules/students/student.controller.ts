import { Response, NextFunction } from 'express';
import { studentService } from './student.service.js';
import { sendResponse, sendCreated } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/types/auth.types.js';

export class StudentController {
  async list(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { academicYearId, classId, sectionId, status, search, page, limit } = req.query;
      const result = await studentService.listStudents({
        academicYearId: academicYearId as string,
        classId: classId as string,
        sectionId: sectionId as string,
        status: status as string,
        search: search as string,
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
      });
      sendResponse(res, 200, result.students, 'Students fetched', result.meta);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await studentService.getStudentById(req.params.id);
      sendResponse(res, 200, result, 'Student profile fetched');
    } catch (error) {
      next(error);
    }
  }

  async create(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const student = await studentService.createStudent(req.body);
      sendCreated(res, student, 'Student created and enrolled successfully');
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await studentService.updateStudent(req.params.id, req.body);
      sendResponse(res, 200, updated, 'Student updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async promote(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await studentService.promoteStudent(req.params.id, req.body);
      sendResponse(res, 200, result, 'Student promoted successfully');
    } catch (error) {
      next(error);
    }
  }

  async uploadDoc(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, fileUrl } = req.body;
      const student = await studentService.uploadDocument(req.params.id, title, fileUrl);
      sendResponse(res, 200, student, 'Document attached successfully');
    } catch (error) {
      next(error);
    }
  }

  async delete(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await studentService.deleteStudent(req.params.id);
      sendResponse(res, 200, result, 'Student record archived successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const studentController = new StudentController();

