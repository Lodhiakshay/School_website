import { Request, Response, NextFunction } from 'express';
import { admissionService } from './admission.service.js';
import { sendResponse, sendCreated } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/types/auth.types.js';

export class AdmissionController {
  // Public Endpoint for online application submission
  async submitPublic(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const application = await admissionService.submitPublicApplication(req.body);
      sendCreated(res, application, 'Admission application submitted successfully');
    } catch (error) {
      next(error);
    }
  }

  // Public Endpoint for tracking status by Application Number or Phone
  async trackStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const identifier = (req.params.identifier || req.query.q || req.body.identifier) as string;
      if (!identifier) {
        res.status(400).json({ success: false, message: 'Application number or registered mobile number is required' });
        return;
      }
      const record = await admissionService.getPublicStatus(identifier);
      sendResponse(res, 200, record, 'Application status retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  // Admin Analytics & Counts
  async getStats(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const stats = await admissionService.getStats();
      sendResponse(res, 200, stats, 'Admission telemetry stats fetched');
    } catch (error) {
      next(error);
    }
  }

  // Admin List Applications
  async list(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { status, classId, medium, search, page, limit } = req.query;
      const result = await admissionService.listApplications({
        status: status as string,
        classId: classId as string,
        medium: medium as string,
        search: search as string,
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
      });
      sendResponse(res, 200, result.applications, 'Applications fetched', {
        ...result.meta,
        stats: result.stats,
      });
    } catch (error) {
      next(error);
    }
  }

  // Admin Get Single Application Details
  async getById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const application = await admissionService.getApplicationById(req.params.id);
      sendResponse(res, 200, application, 'Application details fetched');
    } catch (error) {
      next(error);
    }
  }

  // Admin Update Application Status (Interview / Approved / Rejected)
  async updateStatus(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await admissionService.updateStatus(req.params.id, req.body);
      sendResponse(res, 200, updated, 'Application status updated successfully');
    } catch (error) {
      next(error);
    }
  }

  // Admin 1-Click Convert to ERP Student
  async convertToStudent(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await admissionService.convertToStudent(req.params.id, req.body);
      sendResponse(res, 200, result, 'Student successfully enrolled');
    } catch (error) {
      next(error);
    }
  }

  // Admin Delete Application
  async deleteApplication(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await admissionService.deleteApplication(req.params.id);
      sendResponse(res, 200, result, 'Application removed');
    } catch (error) {
      next(error);
    }
  }
}

export const admissionController = new AdmissionController();


