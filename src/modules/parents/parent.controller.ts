import { Response, NextFunction } from 'express';
import { parentService } from './parent.service.js';
import { sendResponse } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/types/auth.types.js';

export class ParentController {
  async list(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { search, page, limit } = req.query;
      const result = await parentService.listParents({
        search: search as string,
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
      });
      sendResponse(res, 200, result.parents, 'Parents fetched', result.meta);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const parent = await parentService.getParentById(req.params.id);
      sendResponse(res, 200, parent, 'Parent profile fetched');
    } catch (error) {
      next(error);
    }
  }

  async getMyChildren(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const children = await parentService.getMyChildren(req.user!.userId);
      sendResponse(res, 200, children, 'Linked children fetched');
    } catch (error) {
      next(error);
    }
  }
}

export const parentController = new ParentController();

