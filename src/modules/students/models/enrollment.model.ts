import mongoose, { Schema, Document } from 'mongoose';

export interface IEnrollment extends Document {
  studentId: mongoose.Types.ObjectId;
  academicYearId: mongoose.Types.ObjectId;
  classId: mongoose.Types.ObjectId;
  sectionId: mongoose.Types.ObjectId;
  rollNumber: number;
  status: 'enrolled' | 'promoted' | 'detained' | 'graduated' | 'left';
  promotionRemarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EnrollmentSchema = new Schema<IEnrollment>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
    academicYearId: { type: Schema.Types.ObjectId, ref: 'AcademicYear', required: true, index: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    sectionId: { type: Schema.Types.ObjectId, ref: 'Section', required: true, index: true },
    rollNumber: { type: Number, required: true },
    status: {
      type: String,
      enum: ['enrolled', 'promoted', 'detained', 'graduated', 'left'],
      default: 'enrolled',
    },
    promotionRemarks: { type: String, default: '' },
  },
  { timestamps: true }
);

// Compound index to guarantee one active enrollment per student per academic year
EnrollmentSchema.index({ studentId: 1, academicYearId: 1 }, { unique: true });
EnrollmentSchema.index({ academicYearId: 1, classId: 1, sectionId: 1, rollNumber: 1 });

export const EnrollmentModel = mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);

