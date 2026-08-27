import mongoose, { Schema, Document } from 'mongoose';

export interface ISubject extends Document {
  name: string; // e.g., "Mathematics", "Science", "Hindi"
  code: string; // e.g., "MATH10"
  classId: mongoose.Types.ObjectId;
  type: 'theory' | 'practical' | 'both';
  maxMarks: number;
  passingMarks: number;
  creditHours?: number;
  assignedTeachers: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const SubjectSchema = new Schema<ISubject>(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, uppercase: true, trim: true, index: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    type: { type: String, enum: ['theory', 'practical', 'both'], default: 'theory' },
    maxMarks: { type: Number, default: 100 },
    passingMarks: { type: Number, default: 33 },
    creditHours: { type: Number, default: 4 },
    assignedTeachers: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }],
  },
  { timestamps: true }
);

SubjectSchema.index({ classId: 1, code: 1 }, { unique: true });

export const SubjectModel = mongoose.model<ISubject>('Subject', SubjectSchema);

