import mongoose, { Schema, Document } from 'mongoose';

export interface IExamSchedule extends Document {
  examId: mongoose.Types.ObjectId;
  classId: mongoose.Types.ObjectId;
  subjectId: mongoose.Types.ObjectId;
  examDate: Date;
  startTime: string; // e.g. "09:00 AM"
  endTime: string; // e.g. "12:00 PM"
  roomNumber?: string;
  maxMarks: number;
  passingMarks: number;
  weightage?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ExamScheduleSchema = new Schema<IExamSchedule>(
  {
    examId: { type: Schema.Types.ObjectId, ref: 'Exam', required: true, index: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    examDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    roomNumber: { type: String, default: '' },
    maxMarks: { type: Number, default: 100 },
    passingMarks: { type: Number, default: 33 },
    weightage: { type: Number, default: 100 },
  },
  { timestamps: true }
);

ExamScheduleSchema.index({ examId: 1, classId: 1, subjectId: 1 }, { unique: true });

export const ExamScheduleModel = mongoose.model<IExamSchedule>('ExamSchedule', ExamScheduleSchema);

