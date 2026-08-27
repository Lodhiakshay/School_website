import bcrypt from 'bcryptjs';
import { UserModel, IUser } from '../auth/models/user.model.js';
import { NotFoundError, ConflictError } from '../../common/errors/app-error.js';

class UserService {
  async listUsers(params: any = {}): Promise<{ users: IUser[]; meta: any }> {
    const query: any = {};
    if (params.role) query.role = params.role;
    if (params.status) query.status = params.status;
    if (params.search) {
      query.$or = [
        { name: { $regex: params.search, $options: 'i' } },
        { email: { $regex: params.search, $options: 'i' } },
        { username: { $regex: params.search, $options: 'i' } },
      ];
    }

    const page = params.page || 1;
    const limit = params.limit || 50;
    const skip = (page - 1) * limit;

    const total = await UserModel.countDocuments(query);
    const users = await UserModel.find(query)
      .select('-passwordHash')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return {
      users,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async getUserById(id: string): Promise<IUser> {
    const user = await UserModel.findById(id).select('-passwordHash');
    if (!user) throw new NotFoundError('User not found');
    return user;
  }

  async createUser(data: any): Promise<IUser> {
    const existing = await UserModel.findOne({
      $or: [{ email: data.email }, { username: data.username }],
    });
    if (existing) throw new ConflictError('User with this email or username already exists');

    const passwordHash = await bcrypt.hash(data.password || 'School@123', 10);
    return UserModel.create({
      ...data,
      passwordHash,
    });
  }

  async updateUser(id: string, data: any): Promise<IUser> {
    const updateData = { ...data };
    if (data.password) {
      updateData.passwordHash = await bcrypt.hash(data.password, 10);
      delete updateData.password;
    }
    const user = await UserModel.findByIdAndUpdate(id, updateData, { new: true }).select('-passwordHash');
    if (!user) throw new NotFoundError('User not found');
    return user;
  }

  async deleteUser(id: string): Promise<any> {
    const user = await UserModel.findByIdAndUpdate(id, { status: 'archived' }, { new: true });
    if (!user) throw new NotFoundError('User not found');
    return { success: true, message: 'User archived' };
  }

  async resetUserPassword(id: string, newPass: string): Promise<any> {
    const passwordHash = await bcrypt.hash(newPass, 10);
    const user = await UserModel.findByIdAndUpdate(id, { passwordHash }, { new: true });
    if (!user) throw new NotFoundError('User not found');
    return { success: true, message: 'Password reset' };
  }
}

export const userService = new UserService();
