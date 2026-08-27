import mongoose, { Schema, Document } from 'mongoose';

export interface IHomework extends Document {
  title: string;
  description: string;
  subjectId: mongoose.Types.ObjectId;
  classId: mongoose.Types.ObjectId;
  sectionId: mongoose.Types.ObjectId;
  academicYearId: mongoose.Types.ObjectId;
  teacherId: mongoose.Types.ObjectId;
  dueDate: Date;
  attachmentUrls: string[];
  maxPoints?: number;
  createdAt: Date;
  updatedAt: Date;
}

const HomeworkSchema = new Schema<IHomework>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true, index: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    sectionId: { type: Schema.Types.ObjectId, ref: 'Section', required: true, index: true },
    academicYearId: { type: Schema.Types.ObjectId, ref: 'AcademicYear', required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true, index: true },
    dueDate: { type: Date, required: true },
    attachmentUrls: [{ type: String }],
    maxPoints: { type: Number, default: 10 },
  },
  { timestamps: true }
);

export const HomeworkModel = mongoose.model<IHomework>('Homework', HomeworkSchema);

