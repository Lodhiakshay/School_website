import mongoose, { Schema, Document } from 'mongoose';

export interface IAttendance extends Document {
  studentId: mongoose.Types.ObjectId;
  classId: mongoose.Types.ObjectId;
  sectionId: mongoose.Types.ObjectId;
  academicYearId: mongoose.Types.ObjectId;
  date: string; // "YYYY-MM-DD"
  status: 'present' | 'absent' | 'late' | 'half_day' | 'excused';
  remarks?: string;
  markedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    sectionId: { type: Schema.Types.ObjectId, ref: 'Section', required: true, index: true },
    academicYearId: { type: Schema.Types.ObjectId, ref: 'AcademicYear', required: true, index: true },
    date: { type: String, required: true, index: true }, // YYYY-MM-DD
    status: {
      type: String,
      enum: ['present', 'absent', 'late', 'half_day', 'excused'],
      default: 'present',
    },
    remarks: { type: String, default: '' },
    markedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

// Compound index to strictly prevent duplicate attendance records for a student on the same date
AttendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });
AttendanceSchema.index({ classId: 1, sectionId: 1, date: 1 });

export const AttendanceModel = mongoose.model<IAttendance>('Attendance', AttendanceSchema);

