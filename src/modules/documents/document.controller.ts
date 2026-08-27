import { Request, Response, NextFunction } from 'express';
import { documentService } from './document.service.js';

export class DocumentController {
  async listPublic(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await documentService.listPublic({
        category: req.query.category as string,
        search: req.query.search as string,
        limit: req.query.limit ? parseInt(req.query.limit as string, 10) : undefined,
        page: req.query.page ? parseInt(req.query.page as string, 10) : undefined,
      });

      res.status(200).json({
        success: true,
        data: result.items,
        meta: {
          pagination: result.pagination,
          categories: result.categories,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async listAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await documentService.listAdmin({
        category: req.query.category as string,
        status: req.query.status as string,
        isPublic: req.query.isPublic as string,
        search: req.query.search as string,
      });

      res.status(200).json({
        success: true,
        data: result.items,
        meta: {
          stats: result.stats,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await documentService.getStats();
      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await documentService.getById(req.params.id);
      res.status(200).json({
        success: true,
        data: doc,
      });
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?._id || (req as any).user?.id;
      const doc = await documentService.create(req.body, userId);
      res.status(201).json({
        success: true,
        message: 'Document published successfully',
        data: doc,
      });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await documentService.update(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: 'Document updated successfully',
        data: doc,
      });
    } catch (err) {
      next(err);
    }
  }

  async toggleActive(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await documentService.toggleActive(req.params.id);
      res.status(200).json({
        success: true,
        message: `Document is now ${doc.isActive ? 'Active' : 'Inactive'}`,
        data: doc,
      });
    } catch (err) {
      next(err);
    }
  }

  async togglePublic(req: Request, res: Response, next: NextFunction) {
    try {
      const doc = await documentService.togglePublic(req.params.id);
      res.status(200).json({
        success: true,
        message: `Document is now ${doc.isPublic ? 'Publicly Visible' : 'Restricted (Internal)'}`,
        data: doc,
      });
    } catch (err) {
      next(err);
    }
  }

  async trackDownload(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await documentService.trackDownload(req.params.id);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await documentService.delete(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Document deleted successfully',
      });
    } catch (err) {
      next(err);
    }
  }
}

export const documentController = new DocumentController();
