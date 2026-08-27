import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service.js';
import { loginSchema, changePasswordSchema, refreshTokenSchema } from './auth.validation.js';
import { sendResponse } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/types/auth.types.js';

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validated = loginSchema.parse(req.body);
      const ip = req.ip || req.socket.remoteAddress || '127.0.0.1';
      const userAgent = req.headers['user-agent'] || 'Unknown Device';
      const result = await authService.login(validated.identifier, validated.password, ip, userAgent);
      sendResponse(res, 200, result, 'Login successful');
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validated = refreshTokenSchema.parse(req.body);
      const result = await authService.refreshToken(validated.refreshToken);
      sendResponse(res, 200, result, 'Token refreshed successfully');
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const validated = changePasswordSchema.parse(req.body);
      const result = await authService.changePassword(
        req.user!.userId,
        validated.currentPassword,
        validated.newPassword
      );
      sendResponse(res, 200, result, 'Password changed successfully');
    } catch (error) {
      next(error);
    }
  }

  async getMe(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.getMe(req.user!.userId);
      sendResponse(res, 200, result, 'Current user profile fetched');
    } catch (error) {
      next(error);
    }
  }

  async logout(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.logout(req.user!.userId);
      sendResponse(res, 200, result, 'Logged out successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();

