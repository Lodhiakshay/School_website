import mongoose, { Schema, Document } from 'mongoose';

export interface IAcademicYear extends Document {
  name: string; // e.g., "2026-2027"
  startDate: Date;
  endDate: Date;
  isCurrent: boolean;
  status: 'upcoming' | 'active' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

const AcademicYearSchema = new Schema<IAcademicYear>(
  {
    name: { type: String, required: true, unique: true, trim: true, index: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isCurrent: { type: Boolean, default: false, index: true },
    status: {
      type: String,
      enum: ['upcoming', 'active', 'closed'],
      default: 'active',
      index: true,
    },
  },
  { timestamps: true }
);

export const AcademicYearModel = mongoose.model<IAcademicYear>('AcademicYear', AcademicYearSchema);

