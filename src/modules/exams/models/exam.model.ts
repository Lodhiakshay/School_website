import mongoose, { Schema, Document } from 'mongoose';

export interface IExam extends Document {
  name: string; // e.g. "Quarterly Assessment 2026", "Half Yearly Examination", "Annual Board Exam"
  academicYearId: mongoose.Types.ObjectId;
  examType: 'unit_test' | 'half_yearly' | 'annual' | 'pre_board' | 'practical';
  startDate: Date;
  endDate: Date;
  classes: mongoose.Types.ObjectId[];
  status: 'draft' | 'scheduled' | 'ongoing' | 'completed' | 'published';
  createdAt: Date;
  updatedAt: Date;
}

const ExamSchema = new Schema<IExam>(
  {
    name: { type: String, required: true, trim: true },
    academicYearId: { type: Schema.Types.ObjectId, ref: 'AcademicYear', required: true, index: true },
    examType: {
      type: String,
      enum: ['unit_test', 'half_yearly', 'annual', 'pre_board', 'practical'],
      default: 'unit_test',
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
    status: {
      type: String,
      enum: ['draft', 'scheduled', 'ongoing', 'completed', 'published'],
      default: 'scheduled',
      index: true,
    },
  },
  { timestamps: true }
);

export const ExamModel = mongoose.model<IExam>('Exam', ExamSchema);

