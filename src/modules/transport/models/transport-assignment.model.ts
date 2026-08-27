import mongoose, { Schema, Document } from 'mongoose';

export interface ITransportAssignment extends Document {
  studentId: mongoose.Types.ObjectId;
  routeId: mongoose.Types.ObjectId;
  stopName: string;
  monthlyFee: number;
  status: 'active' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const TransportAssignmentSchema = new Schema<ITransportAssignment>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true, unique: true, index: true },
    routeId: { type: Schema.Types.ObjectId, ref: 'Route', required: true, index: true },
    stopName: { type: String, required: true },
    monthlyFee: { type: Number, default: 500 },
    status: { type: String, enum: ['active', 'cancelled'], default: 'active' },
  },
  { timestamps: true }
);

export const TransportAssignmentModel = mongoose.model<ITransportAssignment>(
  'TransportAssignment',
  TransportAssignmentSchema
);

