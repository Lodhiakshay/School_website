import mongoose from 'mongoose';
import { StudentModel, IStudent } from './models/student.model.js';
import { EnrollmentModel } from './models/enrollment.model.js';
import { AcademicYearModel } from '../academics/models/academic-year.model.js';
import { UserModel } from '../auth/models/user.model.js';
import { NotFoundError } from '../../common/errors/app-error.js';

class StudentService {
  async generateAdmissionNumber(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await StudentModel.countDocuments();
    const seq = (count + 1).toString().padStart(4, '0');
    return `SGM-${year}-${seq}`;
  }

  async listStudents(params: any = {}): Promise<{ students: any[]; meta: any }> {
    const query: any = {};
    if (params.classId) query.currentClassId = params.classId;
    if (params.sectionId) query.currentSectionId = params.sectionId;
    if (params.status) query.status = params.status;

    if (params.search) {
      query.$or = [
        { firstName: { $regex: params.search, $options: 'i' } },
        { lastName: { $regex: params.search, $options: 'i' } },
        { admissionNumber: { $regex: params.search, $options: 'i' } },
      ];
    }

    const page = params.page || 1;
    const limit = params.limit || 50;
    const skip = (page - 1) * limit;

    const total = await StudentModel.countDocuments(query);
    const students = await StudentModel.find(query)
      .populate('currentClassId')
      .populate('currentSectionId')
      .populate('parentId')
      .sort({ currentRollNumber: 1 })
      .skip(skip)
      .limit(limit);

    return {
      students,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async getStudentById(id: string): Promise<any> {
    const student = await StudentModel.findById(id)
      .populate('currentClassId')
      .populate('currentSectionId')
      .populate('parentId');
    if (!student) throw new NotFoundError('Student not found');
    const enrollments = await EnrollmentModel.find({ studentId: id })
      .populate('academicYearId')
      .populate('classId')
      .populate('sectionId')
      .sort({ createdAt: -1 });

    return { student, enrollments };
  }

  async createStudent(data: any): Promise<IStudent> {
    const admissionNumber = data.admissionNumber || (await this.generateAdmissionNumber());
    const studentId = `STU-${Date.now().toString().slice(-6)}`;

    let userId = data.userId;
    if (!userId && data.email) {
      const user = await UserModel.create({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        username: admissionNumber.toLowerCase(),
        password: data.password || 'Student@123',
        role: 'Student',
        status: 'active',
      });
      userId = user._id;
    }

    const student = await StudentModel.create({
      ...data,
      admissionNumber,
      studentId,
      userId,
    });

    const currentYear = await AcademicYearModel.findOne({ isCurrent: true });
    if (currentYear && data.classId) {
      await EnrollmentModel.create({
        studentId: student._id,
        academicYearId: currentYear._id,
        classId: data.classId,
        sectionId: data.sectionId,
        rollNumber: data.currentRollNumber || 1,
        status: 'enrolled',
      });
    }

    return student;
  }

  async updateStudent(id: string, data: Partial<IStudent>): Promise<IStudent | any> {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const student = await StudentModel.findByIdAndUpdate(id, data, { new: true });
      if (student) {
        if (student.userId && (data.firstName || data.lastName || (data as any).avatar || (data as any).photoUrl)) {
          await UserModel.findByIdAndUpdate(student.userId, {
            name: `${data.firstName || student.firstName} ${data.lastName || student.lastName}`,
            avatar: (data as any).avatar || (data as any).photoUrl || '',
          });
        }
        return student;
      }
    }
    return { _id: id, ...data };
  }

  async promoteStudent(id: string, data: any): Promise<any> {
    const student = await StudentModel.findById(id);
    if (!student) throw new NotFoundError('Student not found');

    student.currentClassId = data.targetClassId;
    student.currentSectionId = data.targetSectionId;
    student.currentRollNumber = data.rollNumber;
    await student.save();

    await EnrollmentModel.create({
      studentId: id,
      academicYearId: data.targetAcademicYearId,
      classId: data.targetClassId,
      sectionId: data.targetSectionId,
      rollNumber: data.rollNumber,
      status: 'promoted',
    });

    return student;
  }

  async uploadDocument(id: string, title: string, fileUrl: string): Promise<IStudent> {
    const student = await StudentModel.findById(id);
    if (!student) throw new NotFoundError('Student not found');
    student.documents = student.documents || [];
    student.documents.push({
      title,
      fileUrl,
      documentType: 'other',
      uploadedAt: new Date(),
    } as any);
    await student.save();
    return student;
  }

  async deleteStudent(id: string): Promise<any> {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const student = await StudentModel.findById(id);
      if (student) {
        if (student.userId) {
          await UserModel.findByIdAndDelete(student.userId);
        }
        await StudentModel.findByIdAndDelete(id);
      }
    }
    return { message: 'Student record deleted successfully' };
  }
}

export const studentService = new StudentService();
