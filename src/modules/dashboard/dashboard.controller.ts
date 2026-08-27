import { Response, NextFunction } from 'express';
import { dashboardService } from './dashboard.service.js';
import { sendResponse } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/types/auth.types.js';

export class DashboardController {
  async getAdminStats(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const stats = await dashboardService.getAdminStats();
      sendResponse(res, 200, stats, 'Admin dashboard stats fetched');
    } catch (error) {
      next(error);
    }
  }

  async getPrincipalStats(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const stats = await dashboardService.getPrincipalStats();
      sendResponse(res, 200, stats, 'Principal dashboard stats fetched');
    } catch (error) {
      next(error);
    }
  }

  async getTeacherDashboard(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const teacherId = req.user?.entityId;
      const data = await dashboardService.getTeacherDashboard(teacherId!);
      sendResponse(res, 200, data, 'Teacher dashboard data fetched');
    } catch (error) {
      next(error);
    }
  }
}

export const dashboardController = new DashboardController();

