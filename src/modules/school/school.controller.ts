import { Request, Response, NextFunction } from 'express';
import { schoolService } from './school.service.js';
import { sendResponse } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/types/auth.types.js';

export class SchoolController {
  // Public endpoint so landing page can show school details
  async getPublicProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profile = await schoolService.getSchoolProfile();
      sendResponse(res, 200, profile, 'School profile fetched');
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const updated = await schoolService.updateSchoolProfile(req.body);
      sendResponse(res, 200, updated, 'School profile updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async toggleSection(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { sectionKey, isActive } = req.body;
      const updated = await schoolService.toggleSection(sectionKey, isActive);
      sendResponse(res, 200, updated, `Section ${sectionKey} updated`);
    } catch (error) {
      next(error);
    }
  }

  async uploadMedia(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ success: false, message: 'No file provided for upload' });
        return;
      }
      const { storageProvider } = await import('../../common/utils/storage.js');
      const fileUrl = await storageProvider.upload(req.file);
      sendResponse(res, 200, { url: fileUrl, filename: req.file.originalname, size: req.file.size, mimetype: req.file.mimetype }, 'Media uploaded successfully');
    } catch (error) {
      next(error);
    }
  }

  // Public Campus Inquiry Submission
  async submitInquiry(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress;
      const inquiry = await schoolService.submitInquiry(req.body, ipAddress);
      sendResponse(res, 201, inquiry, 'Campus inquiry submitted successfully');
    } catch (error) {
      next(error);
    }
  }

  // Admin Inquiry Listing
  async listInquiries(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await schoolService.listInquiries({
        status: req.query.status as string,
        search: req.query.search as string,
        limit: req.query.limit ? parseInt(req.query.limit as string, 10) : undefined,
        page: req.query.page ? parseInt(req.query.page as string, 10) : undefined,
      });
      res.status(200).json({
        success: true,
        data: result.items,
        meta: {
          pagination: result.pagination,
          stats: result.stats,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // Admin Update Inquiry Status
  async updateInquiryStatus(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { status, adminNotes } = req.body;
      const inquiry = await schoolService.updateInquiryStatus(req.params.id, status, adminNotes);
      sendResponse(res, 200, inquiry, 'Inquiry status updated');
    } catch (error) {
      next(error);
    }
  }
}

export const schoolController = new SchoolController();
