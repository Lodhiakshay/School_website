import { StudentModel } from '../students/models/student.model.js';
import { FeePaymentModel } from '../fees/models/fee-payment.model.js';
import { AttendanceModel } from '../attendance/models/attendance.model.js';
import { ResultModel } from '../results/models/result.model.js';
import { AdmissionModel } from '../admissions/models/admission.model.js';

export class ReportsService {
  async getStudentReport(query: { classId?: string; sectionId?: string; status?: string }) {
    const filter: any = {};
    if (query.classId) filter.currentClassId = query.classId;
    if (query.sectionId) filter.currentSectionId = query.sectionId;
    if (query.status) filter.status = query.status;

    return StudentModel.find(filter)
      .populate('currentClassId', 'name code')
      .populate('currentSectionId', 'name')
      .populate('parentId', 'fatherName fatherPhone motherName')
      .sort({ admissionNumber: 1 });
  }

  async getFeeCollectionReport(query: { startDate?: string; endDate?: string; paymentMethod?: string }) {
    const filter: any = { status: 'success' };
    if (query.startDate && query.endDate) {
      filter.paymentDate = {
        $gte: new Date(query.startDate),
        $lte: new Date(new Date(query.endDate).setHours(23, 59, 59, 999)),
      };
    }
    if (query.paymentMethod) filter.paymentMethod = query.paymentMethod;

    return FeePaymentModel.find(filter)
      .populate('studentId', 'firstName lastName admissionNumber currentClassId currentSectionId')
      .populate('invoiceId', 'invoiceNumber title totalAmount')
      .populate('collectedBy', 'name')
      .sort({ paymentDate: -1 });
  }

  async getAttendanceReport(query: { classId: string; sectionId: string; month: string }) {
    // month: "YYYY-MM"
    const dateRegex = new RegExp(`^${query.month}`);
    return AttendanceModel.find({
      classId: query.classId,
      sectionId: query.sectionId,
      date: dateRegex,
    })
      .populate('studentId', 'firstName lastName admissionNumber currentRollNumber')
      .sort({ date: 1, studentId: 1 });
  }

  async getExamPerformanceReport(examId: string, classId?: string) {
    const filter: any = { examId, status: 'published' };
    if (classId) filter.classId = classId;

    return ResultModel.find(filter)
      .populate('studentId', 'firstName lastName admissionNumber currentRollNumber')
      .populate('classId', 'name code')
      .populate('sectionId', 'name')
      .sort({ grandTotal: -1 });
  }
}

export const reportsService = new ReportsService();

