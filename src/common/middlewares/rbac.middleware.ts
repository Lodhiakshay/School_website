import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types/auth.types.js';
import { UnauthorizedError, ForbiddenError } from '../errors/app-error.js';

export const requireRoles = (...allowedRoles: (string | string[])[]) => {
  const flattened = allowedRoles.flat();
  return (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthRequest;
    if (!authReq.user) {
      return next(new UnauthorizedError('Authentication required'));
    }

    if (authReq.user.role === 'SuperAdmin') {
      return next();
    }

    if (!flattened.includes(authReq.user.role)) {
      return next(new ForbiddenError('Forbidden: Insufficient role permissions'));
    }

    next();
  };
};

export const requirePermissions = (...permissions: (string | string[])[]) => {
  const flattened = permissions.flat();
  return (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthRequest;
    if (!authReq.user) {
      return next(new UnauthorizedError('Authentication required'));
    }

    if (authReq.user.role === 'SuperAdmin') {
      return next();
    }

    const userPerms = authReq.user.permissions || [];
    if (userPerms.includes('*')) {
      return next();
    }

    const hasAll = flattened.every((p) => userPerms.includes(p));
    if (!hasAll) {
      return next(new ForbiddenError('Forbidden: Missing required permission'));
    }

    next();
  };
};
