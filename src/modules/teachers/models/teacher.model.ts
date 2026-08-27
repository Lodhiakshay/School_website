import mongoose, { Schema, Document } from 'mongoose';

export interface ITeacher extends Document {
  userId?: mongoose.Types.ObjectId;
  employeeId: string; // e.g. TCH-2026-001
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  dob?: Date;
  joiningDate: Date;
  department: string; // e.g. Science, Mathematics, Humanities, Primary
  designation: string; // e.g. Senior Teacher, PGT, TGT, PRT
  qualification: string; // e.g. M.Sc., B.Ed.
  specialization?: string;
  photoUrl?: string;
  assignedSubjects: mongoose.Types.ObjectId[];
  assignedSections: mongoose.Types.ObjectId[];
  status: 'active' | 'on_leave' | 'resigned' | 'retired';
  createdAt: Date;
  updatedAt: Date;
}

const TeacherSchema = new Schema<ITeacher>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    employeeId: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    phone: { type: String, required: true, trim: true },
    gender: { type: String, enum: ['male', 'female', 'other'], default: 'male' },
    dob: { type: Date },
    joiningDate: { type: Date, default: Date.now },
    department: { type: String, default: 'Academics', trim: true },
    designation: { type: String, default: 'Teacher', trim: true },
    qualification: { type: String, default: 'Graduate, B.Ed.', trim: true },
    specialization: { type: String, default: '' },
    photoUrl: { type: String, default: '' },
    assignedSubjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
    assignedSections: [{ type: Schema.Types.ObjectId, ref: 'Section' }],
    status: {
      type: String,
      enum: ['active', 'on_leave', 'resigned', 'retired'],
      default: 'active',
      index: true,
    },
  },
  { timestamps: true }
);

export const TeacherModel = mongoose.model<ITeacher>('Teacher', TeacherSchema);

