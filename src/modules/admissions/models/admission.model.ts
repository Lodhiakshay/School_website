import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmissionDocument {
  name: string;
  fileUrl: string;
  fileType?: string;
}

export interface IAdmission extends Document {
  applicationNumber: string; // e.g. "SGM-ADM-2026-1001"
  academicYearId?: mongoose.Types.ObjectId;
  targetClassId?: mongoose.Types.ObjectId;
  targetClass: string; // e.g. "Class 10 (High School)", "Nursery", "Class 11 (Science - PCM)"
  medium: 'hindi' | 'english_sssd';
  stream?: string; // e.g. "Science (PCM)", "Science (PCB)", "Commerce", "Arts / Humanities"
  applicantName: string;
  gender: 'male' | 'female' | 'other';
  dob: Date;
  bloodGroup?: string;
  category?: 'GEN' | 'OBC' | 'SC' | 'ST' | 'EWS';
  aadhaarNumber?: string;
  photoUrl?: string;
  fatherName: string;
  fatherPhone: string;
  fatherOccupation?: string;
  motherName: string;
  motherPhone?: string;
  motherOccupation?: string;
  annualIncome?: string;
  whatsappNumber?: string;
  email?: string;
  address: string;
  city?: string;
  district?: string;
  state?: string;
  pincode?: string;
  previousSchool?: string;
  previousMarksPercent?: number;
  previousClass?: string;
  birthCertificateUrl?: string;
  marksheetUrl?: string;
  transferCertificateUrl?: string;
  documents: IAdmissionDocument[];
  declarationAccepted: boolean;
  status:
    | 'submitted'
    | 'under_review'
    | 'document_verified'
    | 'interview_scheduled'
    | 'approved'
    | 'rejected'
    | 'admitted'
    | 'cancelled';
  interviewDate?: Date;
  interviewVenue?: string;
  reviewerRemarks?: string;
  convertedStudentId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AdmissionSchema = new Schema<IAdmission>(
  {
    applicationNumber: { type: String, required: true, unique: true, uppercase: true, index: true },
    academicYearId: { type: Schema.Types.ObjectId, ref: 'AcademicYear' },
    targetClassId: { type: Schema.Types.ObjectId, ref: 'Class' },
    targetClass: { type: String, required: true, trim: true, index: true },
    medium: { type: String, enum: ['hindi', 'english_sssd'], default: 'hindi', index: true },
    stream: { type: String, default: '' },
    applicantName: { type: String, required: true, trim: true, index: true },
    gender: { type: String, enum: ['male', 'female', 'other'], default: 'male' },
    dob: { type: Date, required: true },
    bloodGroup: { type: String, default: '' },
    category: { type: String, enum: ['GEN', 'OBC', 'SC', 'ST', 'EWS'], default: 'GEN' },
    aadhaarNumber: { type: String, default: '' },
    photoUrl: { type: String, default: '' },
    fatherName: { type: String, required: true, trim: true, index: true },
    fatherPhone: { type: String, required: true, trim: true, index: true },
    fatherOccupation: { type: String, default: '' },
    motherName: { type: String, required: true, trim: true },
    motherPhone: { type: String, default: '' },
    motherOccupation: { type: String, default: '' },
    annualIncome: { type: String, default: '' },
    whatsappNumber: { type: String, default: '' },
    email: { type: String, default: '' },
    address: { type: String, required: true },
    city: { type: String, default: 'Shamsabad' },
    district: { type: String, default: 'Farrukhabad' },
    state: { type: String, default: 'Uttar Pradesh' },
    pincode: { type: String, default: '209503' },
    previousSchool: { type: String, default: '' },
    previousMarksPercent: { type: Number },
    previousClass: { type: String, default: '' },
    birthCertificateUrl: { type: String, default: '' },
    marksheetUrl: { type: String, default: '' },
    transferCertificateUrl: { type: String, default: '' },
    documents: [
      {
        name: { type: String, required: true },
        fileUrl: { type: String, required: true },
        fileType: { type: String, default: 'image/jpeg' },
      },
    ],
    declarationAccepted: { type: Boolean, default: true },
    status: {
      type: String,
      enum: [
        'submitted',
        'under_review',
        'document_verified',
        'interview_scheduled',
        'approved',
        'rejected',
        'admitted',
        'cancelled',
      ],
      default: 'submitted',
      index: true,
    },
    interviewDate: { type: Date },
    interviewVenue: { type: String, default: 'School Administrative Office, Ground Floor' },
    reviewerRemarks: { type: String, default: '' },
    convertedStudentId: { type: Schema.Types.ObjectId, ref: 'Student' },
  },
  { timestamps: true }
);

export const AdmissionModel = mongoose.model<IAdmission>('Admission', AdmissionSchema);

