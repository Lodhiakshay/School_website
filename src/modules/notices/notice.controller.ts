import { Response, NextFunction } from 'express';
import { noticeService } from './notice.service.js';
import { sendResponse, sendCreated } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/types/auth.types.js';

export class NoticeController {
  async listPublic(req: any, res: Response, next: NextFunction): Promise<void> {
    try {
      const notices = await noticeService.listNotices('all');
      sendResponse(res, 200, notices, 'Public notices and alerts fetched');
    } catch (error) {
      next(error);
    }
  }

  async list(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const audience = req.user?.role?.toLowerCase();
      const notices = await noticeService.listNotices(audience, req.query.classId as string);
      sendResponse(res, 200, notices, 'Notices fetched');
    } catch (error) {
      next(error);
    }
  }

  async create(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const notice = await noticeService.createNotice({
        ...req.body,
        publishedBy: req.user!.userId,
      });
      sendCreated(res, notice, 'Notice published successfully');
    } catch (error) {
      next(error);
    }
  }

  async delete(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await noticeService.deleteNotice(req.params.id);
      sendResponse(res, 200, result, 'Notice deleted');
    } catch (error) {
      next(error);
    }
  }

  async getNotifications(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const notifs = await noticeService.getUserNotifications(req.user!.userId);
      sendResponse(res, 200, notifs, 'Notifications fetched');
    } catch (error) {
      next(error);
    }
  }

  async markAsRead(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await noticeService.markNotificationAsRead(req.params.id, req.user!.userId);
      sendResponse(res, 200, result, 'Notification marked as read');
    } catch (error) {
      next(error);
    }
  }

  async markAllRead(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await noticeService.markAllAsRead(req.user!.userId);
      sendResponse(res, 200, result, 'All notifications marked as read');
    } catch (error) {
      next(error);
    }
  }
}

export const noticeController = new NoticeController();

