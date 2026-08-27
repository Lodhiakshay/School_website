import mongoose, { Schema, Document } from 'mongoose';

export interface IFeeCategory extends Document {
  name: string; // e.g. "Tuition Fee", "Admission Fee", "Examination Fee", "Transport Fee", "Computer Lab Fee", "Sports & Activity Fee"
  description?: string;
  isRefundable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FeeCategorySchema = new Schema<IFeeCategory>(
  {
    name: { type: String, required: true, unique: true, trim: true, index: true },
    description: { type: String, default: '' },
    isRefundable: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const FeeCategoryModel = mongoose.model<IFeeCategory>('FeeCategory', FeeCategorySchema);

