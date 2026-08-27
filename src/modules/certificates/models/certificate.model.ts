import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificate extends Document {
  certificateNumber: string; // e.g. "TC-2026-0001", "BON-2026-0001"
  certificateType:
    | 'bonafide'
    | 'character'
    | 'transfer_certificate'
    | 'study_certificate'
    | 'fee_certificate';
  studentId: mongoose.Types.ObjectId;
  academicYearId: mongoose.Types.ObjectId;
  issueDate: Date;
  reason?: string;
  templateData: Record<string, any>;
  pdfUrl?: string;
  issuedBy: mongoose.Types.ObjectId;
  status: 'issued' | 'revoked';
  createdAt: Date;
  updatedAt: Date;
}

const CertificateSchema = new Schema<ICertificate>(
  {
    certificateNumber: { type: String, required: true, unique: true, uppercase: true, index: true },
    certificateType: {
      type: String,
      enum: [
        'bonafide',
        'character',
        'transfer_certificate',
        'study_certificate',
        'fee_certificate',
      ],
      required: true,
      index: true,
    },
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
    academicYearId: { type: Schema.Types.ObjectId, ref: 'AcademicYear', required: true },
    issueDate: { type: Date, default: Date.now },
    reason: { type: String, default: '' },
    templateData: { type: Schema.Types.Mixed, default: {} },
    pdfUrl: { type: String, default: '' },
    issuedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['issued', 'revoked'], default: 'issued' },
  },
  { timestamps: true }
);

export const CertificateModel = mongoose.model<ICertificate>('Certificate', CertificateSchema);

