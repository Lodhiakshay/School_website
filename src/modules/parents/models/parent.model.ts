import mongoose, { Schema, Document } from 'mongoose';

export interface IParent extends Document {
  userId?: mongoose.Types.ObjectId;
  fatherName: string;
  fatherPhone: string;
  fatherOccupation?: string;
  motherName: string;
  motherPhone?: string;
  motherOccupation?: string;
  guardianName?: string;
  guardianPhone?: string;
  guardianRelation?: string;
  residentialAddress: string;
  permanentAddress?: string;
  students: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ParentSchema = new Schema<IParent>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    fatherName: { type: String, required: true, trim: true },
    fatherPhone: { type: String, required: true, trim: true, index: true },
    fatherOccupation: { type: String, default: '' },
    motherName: { type: String, required: true, trim: true },
    motherPhone: { type: String, default: '' },
    motherOccupation: { type: String, default: '' },
    guardianName: { type: String, default: '' },
    guardianPhone: { type: String, default: '' },
    guardianRelation: { type: String, default: '' },
    residentialAddress: { type: String, required: true },
    permanentAddress: { type: String, default: '' },
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  },
  { timestamps: true }
);

export const ParentModel = mongoose.model<IParent>('Parent', ParentSchema);

