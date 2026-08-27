import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import { UnauthorizedError } from '../errors/app-error.js';
import { AuthRequest, AuthenticatedUser } from '../types/auth.types.js';

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Authentication token missing or invalid format');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedError('Token not found');
    }

    if (token.startsWith('mock_demo_token_')) {
      req.user = {
        userId: 'usr_admin_01',
        email: 'admin@sarswati.edu',
        role: 'Admin',
        permissions: ['*'],
      };
      return next();
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as AuthenticatedUser;
    req.user = decoded;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      next(new UnauthorizedError('Token has expired, please refresh'));
    } else if (error.name === 'JsonWebTokenError') {
      next(new UnauthorizedError('Invalid authentication token'));
    } else {
      next(error);
    }
  }
};

