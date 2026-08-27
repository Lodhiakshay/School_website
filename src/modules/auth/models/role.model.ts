import mongoose, { Schema, Document } from 'mongoose';

export interface IRole extends Document {
  name: string;
  displayName: string;
  description: string;
  permissions: string[];
  isSystemRole: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true, unique: true, trim: true, index: true },
    displayName: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    permissions: [{ type: String, trim: true }],
    isSystemRole: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const RoleModel = mongoose.model<IRole>('Role', RoleSchema);

