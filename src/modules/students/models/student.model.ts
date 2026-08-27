import mongoose, { Schema, Document } from 'mongoose';

export interface IStudentDocument {
  title: string;
  fileUrl: string;
  uploadedAt: Date;
}

export interface IStudent extends Document {
  userId?: mongoose.Types.ObjectId;
  admissionNumber: string; // Unique permanent ID
  studentId: string; // Roll / Display ID
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: 'male' | 'female' | 'other';
  dob: Date;
  bloodGroup?: string;
  nationality: string;
  category?: string; // General, OBC, SC, ST
  religion?: string;
  aadharNumber?: string;
  photoUrl?: string;
  admissionDate: Date;
  previousSchool?: string;
  parentId?: mongoose.Types.ObjectId;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  currentClassId?: mongoose.Types.ObjectId;
  currentSectionId?: mongoose.Types.ObjectId;
  currentRollNumber?: number;
  documents: IStudentDocument[];
  status: 'active' | 'alumni' | 'transferred' | 'suspended' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new Schema<IStudent>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    admissionNumber: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    studentId: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    firstName: { type: String, required: true, trim: true },
    middleName: { type: String, default: '', trim: true },
    lastName: { type: String, required: true, trim: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    dob: { type: Date, required: true },
    bloodGroup: { type: String, default: '' },
    nationality: { type: String, default: 'Indian' },
    category: { type: String, default: 'General' },
    religion: { type: String, default: 'Hindu' },
    aadharNumber: { type: String, default: '' },
    photoUrl: { type: String, default: '' },
    admissionDate: { type: Date, default: Date.now },
    previousSchool: { type: String, default: '' },
    parentId: { type: Schema.Types.ObjectId, ref: 'Parent', index: true },
    emergencyContact: {
      name: { type: String, default: '' },
      relationship: { type: String, default: 'Parent' },
      phone: { type: String, default: '' },
    },
    currentClassId: { type: Schema.Types.ObjectId, ref: 'Class', index: true },
    currentSectionId: { type: Schema.Types.ObjectId, ref: 'Section', index: true },
    currentRollNumber: { type: Number, default: 1 },
    documents: [
      {
        title: { type: String, required: true },
        fileUrl: { type: String, required: true },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    status: {
      type: String,
      enum: ['active', 'alumni', 'transferred', 'suspended', 'archived'],
      default: 'active',
      index: true,
    },
  },
  { timestamps: true }
);

export const StudentModel = mongoose.model<IStudent>('Student', StudentSchema);

