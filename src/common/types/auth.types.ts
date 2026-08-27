import { Request } from 'express';

export interface AuthenticatedUser {
  userId: string;
  email: string;
  role: string;
  permissions: string[];
  entityId?: string; // studentId, teacherId, parentId if applicable
}

export interface AuthRequest extends Request {
  user?: AuthenticatedUser;
}

