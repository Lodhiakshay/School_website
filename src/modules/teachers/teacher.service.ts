import bcrypt from 'bcryptjs';
import { TeacherModel } from './models/teacher.model.js';
import { UserModel } from '../auth/models/user.model.js';
import { NotFoundError, ConflictError } from '../../common/errors/app-error.js';

export class TeacherService {
  async listTeachers(query: { department?: string; status?: string; search?: string; page?: number; limit?: number }) {
    const page = Math.max(1, query.page || 1);
    const limit = Math.min(100, Math.max(1, query.limit || 20));
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (query.department) filter.department = query.department;
    if (query.status) filter.status = query.status;
    if (query.search) {
      const searchRegex = new RegExp(query.search, 'i');
      filter.$or = [
        { name: searchRegex },
        { employeeId: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
      ];
    }

    const [teachers, total] = await Promise.all([
      TeacherModel.find(filter)
        .populate('assignedSubjects', 'name code')
        .populate('assignedSections', 'name classId')
        .sort({ employeeId: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      TeacherModel.countDocuments(filter),
    ]);

    return {
      teachers,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getTeacherById(id: string) {
    const teacher = await TeacherModel.findById(id)
      .populate('assignedSubjects')
      .populate({
        path: 'assignedSections',
        populate: { path: 'classId', select: 'name code' },
      });
    if (!teacher) throw new NotFoundError('Teacher not found');
    return teacher;
  }

  async createTeacher(data: any) {
    const existing = await TeacherModel.findOne({
      $or: [{ employeeId: data.employeeId.toUpperCase() }, { email: data.email.toLowerCase() }],
    });
    if (existing) throw new ConflictError('Teacher with this Employee ID or Email already exists');

    // Create user login for teacher
    const username = `tch_${data.employeeId.toLowerCase()}`;
    const photo = data.photoUrl || data.avatar || '';
    const user = await UserModel.create({
      name: data.name,
      email: data.email.toLowerCase(),
      phone: data.phone,
      username,
      passwordHash: await bcrypt.hash('Teacher@123', 10),
      role: 'Teacher',
      status: 'active',
      avatar: photo,
    });

    const teacher = new TeacherModel({
      ...data,
      photoUrl: photo,
      employeeId: data.employeeId.toUpperCase(),
      email: data.email.toLowerCase(),
      userId: user._id,
    });
    await teacher.save();

    return this.getTeacherById(teacher._id.toString());
  }

  async updateTeacher(id: string, data: any) {
    const teacher = await TeacherModel.findById(id);
    if (!teacher) throw new NotFoundError('Teacher not found');

    if (data.email && data.email.toLowerCase() !== teacher.email) {
      const existing = await TeacherModel.findOne({ email: data.email.toLowerCase(), _id: { $ne: id } });
      if (existing) throw new ConflictError('Email already in use');
      teacher.email = data.email.toLowerCase();
    }

    if (data.photoUrl || data.avatar) {
      const photo = data.photoUrl || data.avatar;
      teacher.photoUrl = photo;
      data.photoUrl = photo;
    }

    Object.assign(teacher, data);
    await teacher.save();

    // Update corresponding user record if name, phone, or photo changed
    if (teacher.userId) {
      await UserModel.findByIdAndUpdate(teacher.userId, {
        name: teacher.name,
        email: teacher.email,
        phone: teacher.phone,
        avatar: teacher.photoUrl || '',
      });
    }

    return this.getTeacherById(id);
  }

  async deleteTeacher(id: string) {
    const teacher = await TeacherModel.findById(id);
    if (!teacher) throw new NotFoundError('Teacher not found');
    teacher.status = 'retired';
    await teacher.save();
    return { message: 'Teacher status updated to retired' };
  }
}

export const teacherService = new TeacherService();

