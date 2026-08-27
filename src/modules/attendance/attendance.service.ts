import mongoose from 'mongoose';
import { AttendanceModel } from './models/attendance.model.js';
import { StudentModel } from '../students/models/student.model.js';
import { AcademicYearModel } from '../academics/models/academic-year.model.js';
import { BadRequestError } from '../../common/errors/app-error.js';

export class AttendanceService {
  async markBatchAttendance(data: {
    classId: string;
    sectionId: string;
    date: string; // YYYY-MM-DD
    markedBy: string;
    records: Array<{
      studentId: string;
      status: 'present' | 'absent' | 'late' | 'half_day' | 'excused';
      remarks?: string;
    }>;
  }) {
    let academicYear = await AcademicYearModel.findOne({ isCurrent: true });
    if (!academicYear) throw new BadRequestError('Active academic year not found');

    const operations = data.records.map((rec) => ({
      updateOne: {
        filter: {
          studentId: rec.studentId,
          date: data.date,
        },
        update: {
          $set: {
            studentId: rec.studentId,
            classId: data.classId,
            sectionId: data.sectionId,
            academicYearId: academicYear._id,
            date: data.date,
            status: rec.status,
            remarks: rec.remarks || '',
            markedBy: data.markedBy,
          },
        },
        upsert: true,
      },
    }));

    await AttendanceModel.bulkWrite(operations as any);

    return {
      message: `Attendance marked successfully for ${data.records.length} students on ${data.date}`,
    };
  }

  async getClassAttendance(classId: string, sectionId: string, date: string) {
    // 1. Fetch all students in this class and section
    const students = await StudentModel.find({
      currentClassId: classId,
      currentSectionId: sectionId,
      status: 'active',
    })
      .sort({ currentRollNumber: 1 })
      .lean();

    // 2. Fetch existing attendance on this date
    const attendanceRecords = await AttendanceModel.find({
      classId,
      sectionId,
      date,
    }).lean();

    const attendanceMap = new Map(
      attendanceRecords.map((att) => [att.studentId.toString(), att])
    );

    const result = students.map((stu) => {
      const att = attendanceMap.get(stu._id.toString());
      return {
        studentId: stu._id,
        admissionNumber: stu.admissionNumber,
        rollNumber: stu.currentRollNumber,
        name: `${stu.firstName} ${stu.lastName}`,
        status: att ? att.status : 'present', // default to present
        remarks: att ? att.remarks : '',
        isMarked: !!att,
      };
    });

    return {
      date,
      classId,
      sectionId,
      totalStudents: students.length,
      markedCount: attendanceRecords.length,
      records: result,
    };
  }

  async getStudentAttendanceSummary(studentId: string, month?: string) {
    const filter: any = { studentId };
    if (month) {
      // Month format: "YYYY-MM"
      filter.date = new RegExp(`^${month}`);
    }

    const records = await AttendanceModel.find(filter).sort({ date: -1 }).lean();

    const totalDays = records.length;
    const presentCount = records.filter((r) => r.status === 'present').length;
    const absentCount = records.filter((r) => r.status === 'absent').length;
    const lateCount = records.filter((r) => r.status === 'late').length;
    const halfDayCount = records.filter((r) => r.status === 'half_day').length;

    const percentage =
      totalDays > 0
        ? Math.round(((presentCount + lateCount * 0.5 + halfDayCount * 0.5) / totalDays) * 100)
        : 100;

    return {
      totalDays,
      presentCount,
      absentCount,
      lateCount,
      halfDayCount,
      percentage,
      records,
    };
  }

  async getTodayOverview() {
    const today = new Date().toISOString().split('T')[0];
    const totalActiveStudents = await StudentModel.countDocuments({ status: 'active' });
    const todayAttendance = await AttendanceModel.find({ date: today }).lean();

    const present = todayAttendance.filter((r) => r.status === 'present').length;
    const absent = todayAttendance.filter((r) => r.status === 'absent').length;
    const late = todayAttendance.filter((r) => r.status === 'late').length;

    return {
      date: today,
      totalActiveStudents,
      markedTotal: todayAttendance.length,
      present,
      absent,
      late,
      attendancePercentage:
        todayAttendance.length > 0
          ? Math.round((present / todayAttendance.length) * 100)
          : 0,
    };
  }
}

export const attendanceService = new AttendanceService();
