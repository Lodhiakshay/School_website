import mongoose, { Schema, Document } from 'mongoose';

export interface IFeeStructure extends Document {
  academicYearId: mongoose.Types.ObjectId;
  classId: mongoose.Types.ObjectId;
  name: string; // e.g. "Class 10 Annual Fee Plan"
  feeCategoryId: mongoose.Types.ObjectId;
  amount: number;
  frequency: 'one_time' | 'monthly' | 'quarterly' | 'term_wise' | 'annual';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const FeeStructureSchema = new Schema<IFeeStructure>(
  {
    academicYearId: { type: Schema.Types.ObjectId, ref: 'AcademicYear', required: true, index: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    name: { type: String, required: true, trim: true },
    feeCategoryId: { type: Schema.Types.ObjectId, ref: 'FeeCategory', required: true },
    amount: { type: Number, required: true },
    frequency: {
      type: String,
      enum: ['one_time', 'monthly', 'quarterly', 'term_wise', 'annual'],
      default: 'monthly',
    },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export const FeeStructureModel = mongoose.model<IFeeStructure>('FeeStructure', FeeStructureSchema);

