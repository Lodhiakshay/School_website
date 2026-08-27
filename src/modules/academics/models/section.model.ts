import mongoose, { Schema, Document } from 'mongoose';

export interface ISection extends Document {
  name: string; // e.g. "A", "B"
  classId: mongoose.Types.ObjectId;
  academicYearId?: mongoose.Types.ObjectId;
  classTeacherId?: mongoose.Types.ObjectId;
  roomNumber?: string;
  capacity: number;
  createdAt: Date;
  updatedAt: Date;
}

const SectionSchema = new Schema<ISection>(
  {
    name: { type: String, required: true, uppercase: true, trim: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    academicYearId: { type: Schema.Types.ObjectId, ref: 'AcademicYear' },
    classTeacherId: { type: Schema.Types.ObjectId, ref: 'Teacher' },
    roomNumber: { type: String, default: '' },
    capacity: { type: Number, default: 45 },
  },
  { timestamps: true }
);

// Compound index to ensure uniqueness of section name within a class
SectionSchema.index({ classId: 1, name: 1 }, { unique: true });

export const SectionModel = mongoose.model<ISection>('Section', SectionSchema);

