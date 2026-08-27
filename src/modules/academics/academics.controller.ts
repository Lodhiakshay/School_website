import { Response, NextFunction } from 'express';
import { academicsService } from './academics.service.js';
import { sendResponse, sendCreated } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/types/auth.types.js';

export class AcademicsController {
  // Academic Years
  async listAcademicYears(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const years = await academicsService.listAcademicYears();
      sendResponse(res, 200, years, 'Academic years fetched');
    } catch (error) {
      next(error);
    }
  }

  async createAcademicYear(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const year = await academicsService.createAcademicYear(req.body);
      sendCreated(res, year, 'Academic year created');
    } catch (error) {
      next(error);
    }
  }

  async setCurrentAcademicYear(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const year = await academicsService.setCurrentAcademicYear(req.params.id);
      sendResponse(res, 200, year, 'Current academic year set');
    } catch (error) {
      next(error);
    }
  }

  // Classes
  async listClasses(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const classes = await academicsService.listClasses();
      sendResponse(res, 200, classes, 'Classes fetched');
    } catch (error) {
      next(error);
    }
  }

  async createClass(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const cls = await academicsService.createClass(req.body);
      sendCreated(res, cls, 'Class created');
    } catch (error) {
      next(error);
    }
  }

  async updateClass(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const cls = await academicsService.updateClass(req.params.id, req.body);
      sendResponse(res, 200, cls, 'Class updated');
    } catch (error) {
      next(error);
    }
  }

  async deleteClass(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await academicsService.deleteClass(req.params.id);
      sendResponse(res, 200, result, 'Class deleted');
    } catch (error) {
      next(error);
    }
  }

  // Sections
  async listSections(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const sections = await academicsService.listSections(req.query.classId as string);
      sendResponse(res, 200, sections, 'Sections fetched');
    } catch (error) {
      next(error);
    }
  }

  async createSection(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const section = await academicsService.createSection(req.body);
      sendCreated(res, section, 'Section created');
    } catch (error) {
      next(error);
    }
  }

  async updateSection(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const section = await academicsService.updateSection(req.params.id, req.body);
      sendResponse(res, 200, section, 'Section updated');
    } catch (error) {
      next(error);
    }
  }

  async deleteSection(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await academicsService.deleteSection(req.params.id);
      sendResponse(res, 200, result, 'Section deleted');
    } catch (error) {
      next(error);
    }
  }

  // Subjects
  async listSubjects(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const subjects = await academicsService.listSubjects(req.query.classId as string);
      sendResponse(res, 200, subjects, 'Subjects fetched');
    } catch (error) {
      next(error);
    }
  }

  async createSubject(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const subject = await academicsService.createSubject(req.body);
      sendCreated(res, subject, 'Subject created');
    } catch (error) {
      next(error);
    }
  }

  async updateSubject(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const subject = await academicsService.updateSubject(req.params.id, req.body);
      sendResponse(res, 200, subject, 'Subject updated');
    } catch (error) {
      next(error);
    }
  }

  async deleteSubject(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await academicsService.deleteSubject(req.params.id);
      sendResponse(res, 200, result, 'Subject deleted');
    } catch (error) {
      next(error);
    }
  }
}

export const academicsController = new AcademicsController();

