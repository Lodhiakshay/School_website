import mongoose, { Schema, Document } from 'mongoose';

export interface IInquiry extends Document {
  referenceNumber: string;
  fullName: string;
  phone: string;
  email?: string;
  subject: string;
  targetClass?: string;
  message: string;
  source: string;
  status: 'new' | 'contacted' | 'counseling_scheduled' | 'converted' | 'closed';
  adminNotes?: string;
  ipAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    referenceNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Contact phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      default: 'General Campus Inquiry',
      trim: true,
    },
    targetClass: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Inquiry message details are required'],
      trim: true,
    },
    source: {
      type: String,
      default: 'Website Contact Desk',
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'counseling_scheduled', 'converted', 'closed'],
      default: 'new',
      index: true,
    },
    adminNotes: {
      type: String,
      trim: true,
    },
    ipAddress: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

InquirySchema.index({ status: 1, createdAt: -1 });

export const InquiryModel = mongoose.model<IInquiry>('Inquiry', InquirySchema);

