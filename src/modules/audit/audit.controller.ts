import { Response, NextFunction } from 'express';
import { auditService } from './audit.service.js';
import { sendResponse } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/types/auth.types.js';

export class AuditController {
  async list(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { action, entity, search, page, limit } = req.query;
      const result = await auditService.listLogs({
        action: action as string,
        entity: entity as string,
        search: search as string,
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
      });
      sendResponse(res, 200, result.logs, 'Audit logs fetched', result.meta);
    } catch (error) {
      next(error);
    }
  }
}

export const auditController = new AuditController();

