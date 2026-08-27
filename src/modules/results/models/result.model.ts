import mongoose, { Schema, Document } from 'mongoose';

export interface IResultSubject {
  subjectId: mongoose.Types.ObjectId;
  subjectName: string;
  subjectCode: string;
  theoryMarks: number;
  practicalMarks: number;
  totalMarks: number;
  maxMarks: number;
  grade: string;
  isPassed: boolean;
}

export interface IResult extends Document {
  examId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  classId: mongoose.Types.ObjectId;
  sectionId: mongoose.Types.ObjectId;
  academicYearId: mongoose.Types.ObjectId;
  subjects: IResultSubject[];
  grandTotal: number;
  maxGrandTotal: number;
  percentage: number;
  grade: string;
  rank?: number;
  isPassed: boolean;
  attendancePercentage?: number;
  teacherRemarks?: string;
  principalRemarks?: string;
  status: 'draft' | 'submitted' | 'approved' | 'published';
  publishedAt?: Date;
  publishedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ResultSchema = new Schema<IResult>(
  {
    examId: { type: Schema.Types.ObjectId, ref: 'Exam', required: true, index: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    sectionId: { type: Schema.Types.ObjectId, ref: 'Section', required: true, index: true },
    academicYearId: { type: Schema.Types.ObjectId, ref: 'AcademicYear', required: true },
    subjects: [
      {
        subjectId: { type: Schema.Types.ObjectId, ref: 'Subject' },
        subjectName: { type: String, required: true },
        subjectCode: { type: String, required: true },
        theoryMarks: { type: Number, default: 0 },
        practicalMarks: { type: Number, default: 0 },
        totalMarks: { type: Number, required: true },
        maxMarks: { type: Number, required: true },
        grade: { type: String, default: 'A' },
        isPassed: { type: Boolean, default: true },
      },
    ],
    grandTotal: { type: Number, required: true },
    maxGrandTotal: { type: Number, required: true },
    percentage: { type: Number, required: true },
    grade: { type: String, required: true },
    rank: { type: Number },
    isPassed: { type: Boolean, default: true },
    attendancePercentage: { type: Number, default: 95 },
    teacherRemarks: { type: String, default: 'Good performance' },
    principalRemarks: { type: String, default: 'Promoted with distinction' },
    status: {
      type: String,
      enum: ['draft', 'submitted', 'approved', 'published'],
      default: 'draft',
      index: true,
    },
    publishedAt: { type: Date },
    publishedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

ResultSchema.index({ examId: 1, studentId: 1 }, { unique: true });

export const ResultModel = mongoose.model<IResult>('Result', ResultSchema);

