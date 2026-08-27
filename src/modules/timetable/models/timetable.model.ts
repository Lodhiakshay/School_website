import mongoose, { Schema, Document } from 'mongoose';

export interface ITimetableSlot extends Document {
  academicYearId: mongoose.Types.ObjectId;
  classId: mongoose.Types.ObjectId;
  sectionId: mongoose.Types.ObjectId;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  periodNumber: number;
  startTime: string; // e.g. "08:00 AM"
  endTime: string; // e.g. "08:40 AM"
  subjectId: mongoose.Types.ObjectId;
  teacherId: mongoose.Types.ObjectId;
  roomNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TimetableSchema = new Schema<ITimetableSlot>(
  {
    academicYearId: { type: Schema.Types.ObjectId, ref: 'AcademicYear', required: true, index: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true, index: true },
    sectionId: { type: Schema.Types.ObjectId, ref: 'Section', required: true, index: true },
    dayOfWeek: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      required: true,
      index: true,
    },
    periodNumber: { type: Number, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true, index: true },
    roomNumber: { type: String, default: '' },
  },
  { timestamps: true }
);

// Compound index to guarantee no duplicate slot for the same section at the same period
TimetableSchema.index({ academicYearId: 1, sectionId: 1, dayOfWeek: 1, periodNumber: 1 }, { unique: true });

export const TimetableModel = mongoose.model<ITimetableSlot>('Timetable', TimetableSchema);

