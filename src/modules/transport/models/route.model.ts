import mongoose, { Document, Schema } from 'mongoose';

export interface IRoute extends Document {
  routeName: string;
  vehicleId: mongoose.Types.ObjectId;
  startPoint: string;
  endPoint: string;
  stops: Array<{
    stopName: string;
    pickupTime: string;
    dropTime: string;
    monthlyFee: number;
  }>;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

const RouteSchema: Schema = new Schema(
  {
    routeName: { type: String, required: true },
    vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    startPoint: { type: String, required: true },
    endPoint: { type: String, required: true },
    stops: [
      {
        stopName: { type: String, required: true },
        pickupTime: { type: String, required: true },
        dropTime: { type: String, required: true },
        monthlyFee: { type: Number, required: true, default: 500 },
      },
    ],
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true }
);

export const RouteModel = mongoose.model<IRoute>('Route', RouteSchema);
