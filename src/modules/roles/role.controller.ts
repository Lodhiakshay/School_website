import { Request, Response, NextFunction } from 'express';
import { RoleModel } from '../auth/models/role.model.js';
import { sendResponse, sendCreated } from '../../common/utils/response.js';

class RoleController {
  async listPermissions(req: Request, res: Response, next: NextFunction) {
    try {
      const permissions = [
        'users:read', 'users:write', 'users:delete',
        'students:read', 'students:write', 'students:delete',
        'teachers:read', 'teachers:write', 'teachers:delete',
        'academics:read', 'academics:write',
        'attendance:read', 'attendance:write',
        'exams:read', 'exams:write',
        'results:read', 'results:write',
        'fees:read', 'fees:write',
        'notices:read', 'notices:write',
        'library:read', 'library:write',
        'transport:read', 'transport:write',
        'certificates:read', 'certificates:write',
        'reports:read',
        'audit:read',
      ];
      sendResponse(res, 200, permissions, 'Permissions listed');
    } catch (err) {
      next(err);
    }
  }

  async listRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await RoleModel.find().sort({ name: 1 });
      sendResponse(res, 200, roles, 'Roles listed');
    } catch (err) {
      next(err);
    }
  }

  async getRoleById(req: Request, res: Response, next: NextFunction) {
    try {
      const role = await RoleModel.findById(req.params.id);
      sendResponse(res, 200, role, 'Role fetched');
    } catch (err) {
      next(err);
    }
  }

  async createRole(req: Request, res: Response, next: NextFunction) {
    try {
      const role = await RoleModel.create(req.body);
      sendCreated(res, role, 'Role created');
    } catch (err) {
      next(err);
    }
  }

  async updateRole(req: Request, res: Response, next: NextFunction) {
    try {
      const role = await RoleModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      sendResponse(res, 200, role, 'Role updated');
    } catch (err) {
      next(err);
    }
  }

  async deleteRole(req: Request, res: Response, next: NextFunction) {
    try {
      await RoleModel.findByIdAndDelete(req.params.id);
      sendResponse(res, 200, null, 'Role deleted');
    } catch (err) {
      next(err);
    }
  }
}

export const roleController = new RoleController();
