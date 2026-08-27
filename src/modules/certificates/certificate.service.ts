import { CertificateModel } from './models/certificate.model.js';
import { StudentModel } from '../students/models/student.model.js';
import { SchoolModel } from '../school/models/school.model.js';
import { AcademicYearModel } from '../academics/models/academic-year.model.js';
import { NotFoundError } from '../../common/errors/app-error.js';

export class CertificateService {
  async listCertificates(query: { studentId?: string; certificateType?: string }) {
    const filter: any = {};
    if (query.studentId) filter.studentId = query.studentId;
    if (query.certificateType) filter.certificateType = query.certificateType;

    return CertificateModel.find(filter)
      .populate('studentId', 'firstName lastName admissionNumber currentRollNumber currentClassId currentSectionId')
      .populate('issuedBy', 'name')
      .sort({ issueDate: -1 });
  }

  async generateCertificate(data: {
    certificateType: 'bonafide' | 'character' | 'transfer_certificate' | 'study_certificate' | 'fee_certificate';
    studentId: string;
    reason?: string;
    issuedBy: string;
  }) {
    const student = await StudentModel.findById(data.studentId)
      .populate('currentClassId', 'name')
      .populate('currentSectionId', 'name')
      .populate('parentId');

    if (!student) throw new NotFoundError('Student not found');

    const school = await SchoolModel.findOne();
    const activeYear = await AcademicYearModel.findOne({ isCurrent: true });

    const count = await CertificateModel.countDocuments({ certificateType: data.certificateType });
    const prefix = data.certificateType === 'transfer_certificate' ? 'TC' : data.certificateType.substring(0, 3).toUpperCase();
    const certificateNumber = `${prefix}-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;

    const templateData = {
      schoolName: school?.name || 'Sarswati Gyan Mandir',
      schoolAddress: 'Shamsabad, Farrukhabad, UP',
      studentName: `${student.firstName} ${student.lastName}`,
      admissionNumber: student.admissionNumber,
      rollNumber: student.currentRollNumber,
      className: (student.currentClassId as any)?.name || 'Class',
      sectionName: (student.currentSectionId as any)?.name || 'A',
      fatherName: (student.parentId as any)?.fatherName || 'Parent',
      dob: student.dob,
      academicYear: activeYear?.name || '2026-2027',
      reason: data.reason || 'General Certificate Request',
      issueDate: new Date(),
    };

    const certificate = new CertificateModel({
      certificateNumber,
      certificateType: data.certificateType,
      studentId: data.studentId,
      academicYearId: activeYear?._id,
      issueDate: new Date(),
      reason: data.reason || '',
      templateData,
      issuedBy: data.issuedBy,
      status: 'issued',
    });

    await certificate.save();
    return { certificate, templateData, school };
  }

  async getCertificateById(id: string) {
    const cert = await CertificateModel.findById(id)
      .populate('studentId')
      .populate('issuedBy', 'name');
    if (!cert) throw new NotFoundError('Certificate not found');

    const school = await SchoolModel.findOne();
    return { cert, school };
  }
}

export const certificateService = new CertificateService();

