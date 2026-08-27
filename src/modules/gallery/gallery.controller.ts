import { Request, Response, NextFunction } from 'express';
import { galleryService } from './gallery.service.js';

export class GalleryController {
  async listPublic(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await galleryService.listPublic({
        category: req.query.category as string,
        isFeatured: req.query.featured !== undefined ? req.query.featured === 'true' : undefined,
        search: req.query.search as string,
        type: req.query.type as string,
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
      const result = await galleryService.listAdmin({
        category: req.query.category as string,
        status: req.query.status as string,
        type: req.query.type as string,
        search: req.query.search as string,
        page: req.query.page ? parseInt(req.query.page as string, 10) : undefined,
        limit: req.query.limit ? parseInt(req.query.limit as string, 10) : undefined,
      });

      res.status(200).json({
        success: true,
        data: result.items,
        meta: {
          stats: result.stats,
          pagination: result.pagination,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await galleryService.getStats();
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
      const item = await galleryService.getById(req.params.id);
      res.status(200).json({
        success: true,
        data: item,
      });
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user?._id || (req as any).user?.id;
      const item = await galleryService.create(req.body, userId);
      res.status(201).json({
        success: true,
        message: 'Gallery media item published successfully',
        data: item,
      });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await galleryService.update(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: 'Gallery media item updated successfully',
        data: item,
      });
    } catch (err) {
      next(err);
    }
  }

  async toggleActive(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await galleryService.toggleActive(req.params.id);
      res.status(200).json({
        success: true,
        message: `Gallery item is now ${item.isActive ? 'Active (Visible)' : 'Inactive (Hidden)'}`,
        data: item,
      });
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await galleryService.delete(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Gallery media item removed successfully',
      });
    } catch (err) {
      next(err);
    }
  }
}

export const galleryController = new GalleryController();

