import mongoose, { Document, Schema } from 'mongoose';

export interface IVehicle extends Document {
  registrationNumber: string;
  vehicleModel: string;
  capacity: number;
  driverName: string;
  driverPhone: string;
  driverLicenseNumber?: string;
  helperName?: string;
  helperPhone?: string;
  insuranceExpiryDate?: Date;
  fitnessExpiryDate?: Date;
  status: 'active' | 'under_maintenance' | 'out_of_service';
  createdAt: Date;
  updatedAt: Date;
}

const VehicleSchema: Schema = new Schema(
  {
    registrationNumber: { type: String, required: true, unique: true, uppercase: true },
    vehicleModel: { type: String, required: true },
    capacity: { type: Number, required: true },
    driverName: { type: String, required: true },
    driverPhone: { type: String, required: true },
    driverLicenseNumber: { type: String },
    helperName: { type: String },
    helperPhone: { type: String },
    insuranceExpiryDate: { type: Date },
    fitnessExpiryDate: { type: Date },
    status: { type: String, enum: ['active', 'under_maintenance', 'out_of_service'], default: 'active' },
  },
  { timestamps: true }
);

export const VehicleModel = mongoose.model<IVehicle>('Vehicle', VehicleSchema);
