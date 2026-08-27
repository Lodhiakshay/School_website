import mongoose, { Schema, Document } from 'mongoose';

export interface IDocument extends Document {
  title: string;
  description?: string;
  category: 'disclosure' | 'syllabus' | 'calendar' | 'forms' | 'date_sheet' | 'circular' | 'general';
  entityType?: 'Student' | 'Teacher' | 'Staff' | 'Admission' | 'School';
  entityId?: mongoose.Types.ObjectId;
  fileUrl: string;
  fileName: string;
  fileSize?: string;
  format: string;
  mimeType?: string;
  authority?: string;
  docCode?: string;
  academicYear?: string;
  isPublic: boolean;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
  downloadCount: number;
  uploadedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema = new Schema<IDocument>(
  {
    title: {
      type: String,
      required: [true, 'Document title is required'],
      trim: true,
      maxlength: [250, 'Title cannot exceed 250 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    category: {
      type: String,
      enum: ['disclosure', 'syllabus', 'calendar', 'forms', 'date_sheet', 'circular', 'general'],
      default: 'general',
      required: true,
      index: true,
    },
    entityType: {
      type: String,
      enum: ['Student', 'Teacher', 'Staff', 'Admission', 'School'],
      default: 'School',
    },
    entityId: {
      type: Schema.Types.ObjectId,
      index: true,
    },
    fileUrl: {
      type: String,
      required: [true, 'File URL or PDF download link is required'],
      trim: true,
    },
    fileName: {
      type: String,
      required: [true, 'File name is required'],
      trim: true,
    },
    fileSize: {
      type: String,
      default: '1.5 MB',
      trim: true,
    },
    format: {
      type: String,
      default: 'PDF',
      trim: true,
    },
    mimeType: {
      type: String,
      default: 'application/pdf',
    },
    authority: {
      type: String,
      trim: true,
    },
    docCode: {
      type: String,
      trim: true,
      index: true,
    },
    academicYear: {
      type: String,
      default: '2026-2027',
      trim: true,
      index: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
      index: true,
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

DocumentSchema.index({ category: 1, isPublic: 1, isActive: 1, displayOrder: 1, createdAt: -1 });

export const DocumentModel = mongoose.model<IDocument>('Document', DocumentSchema);
