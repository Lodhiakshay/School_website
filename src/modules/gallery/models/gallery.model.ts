import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
  title: string;
  description?: string;
  category: 'sports' | 'academic' | 'cultural' | 'campus' | 'celebrations' | 'primary' | 'science_fair' | 'other';
  type: 'image' | 'video';
  imageUrl: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  eventDate?: Date;
  academicYear?: string;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
  tags: string[];
  uploadedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const gallerySchema = new Schema<IGallery>(
  {
    title: {
      type: String,
      required: [true, 'Gallery item title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    category: {
      type: String,
      enum: ['sports', 'academic', 'cultural', 'campus', 'celebrations', 'primary', 'science_fair', 'other'],
      default: 'campus',
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['image', 'video'],
      default: 'image',
      index: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL or thumbnail is required'],
      trim: true,
    },
    thumbnailUrl: {
      type: String,
      trim: true,
    },
    videoUrl: {
      type: String,
      trim: true,
    },
    eventDate: {
      type: Date,
      default: Date.now,
      index: true,
    },
    academicYear: {
      type: String,
      default: '2026-2027',
      trim: true,
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
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
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

gallerySchema.index({ category: 1, isActive: 1, displayOrder: 1, eventDate: -1 });

export const GalleryModel = mongoose.model<IGallery>('Gallery', gallerySchema);

