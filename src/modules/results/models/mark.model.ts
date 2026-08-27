import mongoose, { Schema, Document } from 'mongoose';

export interface IMark extends Document {
  examId: mongoose.Types.ObjectId;
  examScheduleId?: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  classId: mongoose.Types.ObjectId;
  sectionId: mongoose.Types.ObjectId;
  subjectId: mongoose.Types.ObjectId;
  theoryMarks: number;
  practicalMarks?: number;
  totalMarks: number;
  maxMarks: number;
  isAbsent: boolean;
  remarks?: string;
  enteredBy: mongoose.Types.ObjectId;
  status: 'draft' | 'submitted' | 'approved' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

const MarkSchema = new Schema<IMark>(
  {
    examId: { type: Schema.Types.ObjectId, ref: 'Exam', required: true, index: true },
    examScheduleId: { type: Schema.Types.ObjectId, ref: 'ExamSchedule' },
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    sectionId: { type: Schema.Types.ObjectId, ref: 'Section', required: true, index: true },
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true, index: true },
    theoryMarks: { type: Number, default: 0 },
    practicalMarks: { type: Number, default: 0 },
    totalMarks: { type: Number, required: true, default: 0 },
    maxMarks: { type: Number, default: 100 },
    isAbsent: { type: Boolean, default: false },
    remarks: { type: String, default: '' },
    enteredBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['draft', 'submitted', 'approved', 'published'],
      default: 'draft',
      index: true,
    },
  },
  { timestamps: true }
);

// Compound index to guarantee one mark record per student per subject per exam
MarkSchema.index({ examId: 1, studentId: 1, subjectId: 1 }, { unique: true });

export const MarkModel = mongoose.model<IMark>('Mark', MarkSchema);

