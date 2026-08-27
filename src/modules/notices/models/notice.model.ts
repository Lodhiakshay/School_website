import mongoose, { Schema, Document } from 'mongoose';

export interface INotice extends Document {
  title: string;
  content: string;
  targetAudience: 'all' | 'teachers' | 'students' | 'parents' | 'class';
  targetClassId?: mongoose.Types.ObjectId;
  targetSectionId?: mongoose.Types.ObjectId;
  attachmentUrl?: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  publishDate: Date;
  expiryDate?: Date;
  publishedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const NoticeSchema = new Schema<INotice>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    targetAudience: {
      type: String,
      enum: ['all', 'teachers', 'students', 'parents', 'class'],
      default: 'all',
      index: true,
    },
    targetClassId: { type: Schema.Types.ObjectId, ref: 'Class' },
    targetSectionId: { type: Schema.Types.ObjectId, ref: 'Section' },
    attachmentUrl: { type: String, default: '' },
    priority: {
      type: String,
      enum: ['low', 'normal', 'high', 'urgent'],
      default: 'normal',
    },
    publishDate: { type: Date, default: Date.now },
    expiryDate: { type: Date },
    publishedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const NoticeModel = mongoose.model<INotice>('Notice', NoticeSchema);

