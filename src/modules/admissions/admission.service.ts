import { AdmissionModel } from './models/admission.model.js';
import { studentService } from '../students/student.service.js';
import { AcademicYearModel } from '../academics/models/academic-year.model.js';
import { ClassModel } from '../academics/models/class.model.js';
import { NotFoundError, BadRequestError } from '../../common/errors/app-error.js';

export class AdmissionService {
  async submitPublicApplication(data: any) {
    const year = new Date().getFullYear();
    const count = await AdmissionModel.countDocuments();
    const applicationNumber = `SGM-ADM-${year}-${String(count + 1001).padStart(4, '0')}`;

    let academicYearId = data.academicYearId;
    if (!academicYearId) {
      const activeYear = await AcademicYearModel.findOne({ isCurrent: true });
      academicYearId = activeYear?._id;
    }

    // Try to find matching ClassModel by targetClass name if class ID is not explicitly passed
    let targetClassId = data.targetClassId;
    if (!targetClassId && data.targetClass) {
      const matchedClass = await ClassModel.findOne({
        name: { $regex: new RegExp(`^${data.targetClass.replace(/[()]/g, '')}`, 'i') },
      });
      if (matchedClass) {
        targetClassId = matchedClass._id;
      }
    }

    const application = new AdmissionModel({
      ...data,
      applicationNumber,
      academicYearId,
      targetClassId,
      targetClass: data.targetClass || data.targetClassName || 'Class 10 (High School)',
      medium: data.medium || 'hindi',
      status: 'submitted',
    });

    await application.save();
    return application;
  }

  async getPublicStatus(identifier: string) {
    const trimmed = identifier.trim();
    const application = await AdmissionModel.findOne({
      $or: [
        { applicationNumber: trimmed.toUpperCase() },
        { fatherPhone: trimmed },
        { applicantName: { $regex: new RegExp(`^${trimmed}$`, 'i') } },
      ],
    })
      .select(
        'applicationNumber applicantName targetClass medium stream gender status interviewDate interviewVenue reviewerRemarks createdAt'
      )
      .lean();

    if (!application) {
      throw new NotFoundError(
        `No application record found for reference "${identifier}". Please verify the Application Number or Registered Mobile.`
      );
    }

    return application;
  }

  async getStats() {
    const [total, submitted, underReview, interviewScheduled, approved, admitted, rejected] =
      await Promise.all([
        AdmissionModel.countDocuments(),
        AdmissionModel.countDocuments({ status: 'submitted' }),
        AdmissionModel.countDocuments({ status: 'under_review' }),
        AdmissionModel.countDocuments({ status: 'interview_scheduled' }),
        AdmissionModel.countDocuments({ status: 'approved' }),
        AdmissionModel.countDocuments({ status: 'admitted' }),
        AdmissionModel.countDocuments({ status: 'rejected' }),
      ]);

    return {
      total,
      submitted,
      underReview,
      interviewScheduled,
      approved,
      admitted,
      rejected,
      pendingAction: submitted + underReview + interviewScheduled,
    };
  }

  async listApplications(query: {
    status?: string;
    classId?: string;
    medium?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const page = Math.max(1, query.page || 1);
    const limit = Math.min(100, Math.max(1, query.limit || 50));
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (query.status && query.status !== 'all') filter.status = query.status;
    if (query.medium && query.medium !== 'all') filter.medium = query.medium;
    if (query.classId) filter.targetClassId = query.classId;

    if (query.search) {
      const searchRegex = new RegExp(query.search.trim(), 'i');
      filter.$or = [
        { applicantName: searchRegex },
        { applicationNumber: searchRegex },
        { fatherName: searchRegex },
        { fatherPhone: searchRegex },
        { targetClass: searchRegex },
      ];
    }

    const [applications, total, stats] = await Promise.all([
      AdmissionModel.find(filter)
        .populate('targetClassId', 'name code')
        .populate('convertedStudentId', 'admissionNumber studentId')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      AdmissionModel.countDocuments(filter),
      this.getStats(),
    ]);

    return {
      applications,
      stats,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async getApplicationById(id: string) {
    const application = await AdmissionModel.findById(id)
      .populate('targetClassId')
      .populate('convertedStudentId');
    if (!application) throw new NotFoundError('Admission application not found');
    return application;
  }

  async updateStatus(
    id: string,
    data: {
      status: string;
      interviewDate?: Date;
      interviewVenue?: string;
      reviewerRemarks?: string;
    }
  ) {
    const application = await AdmissionModel.findByIdAndUpdate(
      id,
      {
        status: data.status,
        ...(data.interviewDate && { interviewDate: data.interviewDate }),
        ...(data.interviewVenue && { interviewVenue: data.interviewVenue }),
        ...(data.reviewerRemarks !== undefined && { reviewerRemarks: data.reviewerRemarks }),
      },
      { new: true }
    );
    if (!application) throw new NotFoundError('Application not found');
    return application;
  }

  async convertToStudent(
    id: string,
    data: { sectionId?: string; rollNumber?: number; admissionNumber?: string; classId?: string }
  ) {
    const application = await AdmissionModel.findById(id);
    if (!application) throw new NotFoundError('Application not found');
    if (application.convertedStudentId) {
      throw new BadRequestError('This applicant has already been enrolled into the student roster');
    }

    const nameParts = application.applicantName.trim().split(' ');
    const firstName = nameParts[0] || 'Student';
    const lastName = nameParts.slice(1).join(' ') || 'Kumar';

    const admNum =
      data.admissionNumber ||
      `SGM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const targetClassId = data.classId || application.targetClassId?.toString();

    const newStudent = await studentService.createStudent({
      admissionNumber: admNum,
      studentId: `STU-${Date.now().toString().slice(-6)}`,
      firstName,
      lastName,
      gender: application.gender,
      dob: application.dob,
      bloodGroup: application.bloodGroup,
      category: application.category,
      aadharNumber: application.aadhaarNumber,
      photoUrl: application.photoUrl,
      fatherName: application.fatherName,
      fatherPhone: application.fatherPhone,
      fatherOccupation: application.fatherOccupation,
      motherName: application.motherName,
      motherPhone: application.motherPhone,
      parentEmail: application.email,
      residentialAddress: application.address,
      classId: targetClassId,
      sectionId: data.sectionId,
      currentRollNumber: data.rollNumber || 1,
      admissionDate: new Date(),
      previousSchool: application.previousSchool,
    });

    application.status = 'admitted';
    application.convertedStudentId = newStudent._id as any;
    await application.save();

    return {
      message: 'Applicant successfully enrolled as an official student',
      student: newStudent,
      admission: application,
    };
  }

  async deleteApplication(id: string) {
    const application = await AdmissionModel.findByIdAndDelete(id);
    if (!application) throw new NotFoundError('Application not found');
    return { message: 'Application deleted successfully' };
  }
}

export const admissionService = new AdmissionService();


