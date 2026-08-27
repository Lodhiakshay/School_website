import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface ILoginHistory {
  ip: string;
  userAgent: string;
  timestamp: Date;
}

export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
  username: string;
  passwordHash: string;
  avatar?: string;
  role: string; // e.g. 'SuperAdmin', 'Admin', 'Principal', 'Teacher', 'Student', 'Parent', 'Accountant', 'Librarian', 'AdmissionStaff'
  status: 'active' | 'inactive' | 'suspended' | 'archived';
  lastLogin?: Date;
  loginHistory: ILoginHistory[];
  refreshToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    phone: { type: String, trim: true },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true },
    avatar: { type: String, default: '' },
    role: { type: String, required: true, trim: true, index: true },
    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended', 'archived'],
      default: 'active',
      index: true,
    },
    lastLogin: { type: Date },
    loginHistory: [
      {
        ip: { type: String },
        userAgent: { type: String },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    refreshToken: { type: String, select: false },
    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },
  },
  { timestamps: true }
);

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

export const UserModel = mongoose.model<IUser>('User', UserSchema);

