import mongoose, { Schema, Document } from 'mongoose';

export interface IHomeworkSubmission extends Document {
  homeworkId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  submissionDate: Date;
  attachmentUrls: string[];
  notes?: string;
  pointsObtained?: number;
  feedback?: string;
  status: 'submitted' | 'reviewed' | 'late';
  createdAt: Date;
  updatedAt: Date;
}

const HomeworkSubmissionSchema = new Schema<IHomeworkSubmission>(
  {
    homeworkId: { type: Schema.Types.ObjectId, ref: 'Homework', required: true, index: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
    submissionDate: { type: Date, default: Date.now },
    attachmentUrls: [{ type: String }],
    notes: { type: String, default: '' },
    pointsObtained: { type: Number },
    feedback: { type: String, default: '' },
    status: {
      type: String,
      enum: ['submitted', 'reviewed', 'late'],
      default: 'submitted',
    },
  },
  { timestamps: true }
);

HomeworkSubmissionSchema.index({ homeworkId: 1, studentId: 1 }, { unique: true });

export const HomeworkSubmissionModel = mongoose.model<IHomeworkSubmission>(
  'HomeworkSubmission',
  HomeworkSubmissionSchema
);

