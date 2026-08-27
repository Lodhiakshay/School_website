import { Response, NextFunction } from 'express';
import { userService } from './user.service.js';
import { createUserSchema, updateUserSchema } from './user.validation.js';
import { sendResponse, sendCreated } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/types/auth.types.js';

export class UserController {
  async list(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { role, status, search, page, limit } = req.query;
      const result = await userService.listUsers({
        role: role as string,
        status: status as string,
        search: search as string,
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
      });
      sendResponse(res, 200, result.users, 'Users fetched', result.meta);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await userService.getUserById(req.params.id);
      sendResponse(res, 200, user, 'User details fetched');
    } catch (error) {
      next(error);
    }
  }

  async create(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const validated = createUserSchema.parse(req.body);
      const user = await userService.createUser(validated);
      sendCreated(res, user, 'User created successfully');
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const validated = updateUserSchema.parse(req.body);
      const user = await userService.updateUser(req.params.id, validated);
      sendResponse(res, 200, user, 'User updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async remove(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await userService.deleteUser(req.params.id);
      sendResponse(res, 200, result, 'User deleted/archived successfully');
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { password } = req.body;
      const result = await userService.resetUserPassword(req.params.id, password || 'School@123');
      sendResponse(res, 200, result, 'Password reset successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();

