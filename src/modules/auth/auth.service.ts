import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { UserModel, IUser } from './models/user.model.js';
import { RoleModel } from './models/role.model.js';
import { StudentModel } from '../students/models/student.model.js';
import { TeacherModel } from '../teachers/models/teacher.model.js';
import { ParentModel } from '../parents/models/parent.model.js';
import { UnauthorizedError, BadRequestError, NotFoundError } from '../../common/errors/app-error.js';
import { env } from '../../config/env.js';

export class AuthService {
  async login(identifier: string, password: string, ip: string, userAgent: string) {
    const user = await UserModel.findOne({
      $or: [{ email: identifier.toLowerCase() }, { username: identifier.toLowerCase() }],
    }).select('+passwordHash +refreshToken');

    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    if (user.status !== 'active') {
      throw new UnauthorizedError(`Account is ${user.status}. Please contact administration.`);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid credentials');
    }

    // Fetch Role permissions
    const roleDoc = await RoleModel.findOne({ name: user.role });
    const permissions = roleDoc ? roleDoc.permissions : [];

    // Find linked entity ID if applicable
    let entityId: string | undefined = undefined;
    if (user.role === 'Student') {
      const student = await StudentModel.findOne({ userId: user._id });
      if (student) entityId = student._id.toString();
    } else if (user.role === 'Teacher') {
      const teacher = await TeacherModel.findOne({ userId: user._id });
      if (teacher) entityId = teacher._id.toString();
    } else if (user.role === 'Parent') {
      const parent = await ParentModel.findOne({ userId: user._id });
      if (parent) entityId = parent._id.toString();
    }

    // Generate tokens
    const accessToken = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
        permissions,
        entityId,
      },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN as any }
    );

    const refreshToken = jwt.sign(
      { userId: user._id.toString() },
      env.JWT_REFRESH_SECRET,
      { expiresIn: env.JWT_REFRESH_EXPIRES_IN as any }
    );

    // Save refresh token & login history
    user.refreshToken = refreshToken;
    user.lastLogin = new Date();
    user.loginHistory.unshift({ ip, userAgent, timestamp: new Date() });
    if (user.loginHistory.length > 20) {
      user.loginHistory = user.loginHistory.slice(0, 20);
    }
    await user.save();

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role,
        avatar: user.avatar,
        status: user.status,
        permissions,
        entityId,
      },
    };
  }

  async refreshToken(token: string) {
    try {
      const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET) as { userId: string };
      const user = await UserModel.findById(decoded.userId).select('+refreshToken');

      if (!user || user.refreshToken !== token) {
        throw new UnauthorizedError('Invalid or expired refresh token');
      }

      if (user.status !== 'active') {
        throw new UnauthorizedError(`Account is ${user.status}`);
      }

      const roleDoc = await RoleModel.findOne({ name: user.role });
      const permissions = roleDoc ? roleDoc.permissions : [];

      const newAccessToken = jwt.sign(
        {
          userId: user._id.toString(),
          email: user.email,
          role: user.role,
          permissions,
        },
        env.JWT_SECRET,
        { expiresIn: env.JWT_EXPIRES_IN as any }
      );

      return { accessToken: newAccessToken };
    } catch {
      throw new UnauthorizedError('Invalid or expired refresh token');
    }
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await UserModel.findById(userId).select('+passwordHash');
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      throw new BadRequestError('Current password does not match');
    }

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();
    return { message: 'Password updated successfully' };
  }

  async getMe(userId: string) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const roleDoc = await RoleModel.findOne({ name: user.role });
    const permissions = roleDoc ? roleDoc.permissions : [];

    let entityData: any = null;
    if (user.role === 'Student') {
      entityData = await StudentModel.findOne({ userId: user._id })
        .populate('parentId');
    } else if (user.role === 'Teacher') {
      entityData = await TeacherModel.findOne({ userId: user._id })
        .populate('assignedSubjects assignedSections');
    } else if (user.role === 'Parent') {
      entityData = await ParentModel.findOne({ userId: user._id })
        .populate('students');
    }

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        username: user.username,
        role: user.role,
        avatar: user.avatar,
        status: user.status,
        permissions,
        lastLogin: user.lastLogin,
      },
      entity: entityData,
    };
  }

  async logout(userId: string) {
    await UserModel.findByIdAndUpdate(userId, { refreshToken: null });
    return { message: 'Logged out successfully' };
  }
}

export const authService = new AuthService();

