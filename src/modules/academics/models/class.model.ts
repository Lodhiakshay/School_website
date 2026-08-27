import mongoose, { Schema, Document } from 'mongoose';

export interface IClass extends Document {
  name: string; // e.g. "Class 10"
  code: string; // e.g. "C10"
  orderIndex: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ClassSchema = new Schema<IClass>(
  {
    name: { type: String, required: true, unique: true, trim: true, index: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    orderIndex: { type: Number, required: true, default: 0 },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

export const ClassModel = mongoose.model<IClass>('Class', ClassSchema);

