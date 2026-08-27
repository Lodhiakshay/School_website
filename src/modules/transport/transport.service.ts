import { VehicleModel } from './models/vehicle.model.js';
import { RouteModel } from './models/route.model.js';
import { TransportAssignmentModel } from './models/transport-assignment.model.js';
import { NotFoundError } from '../../common/errors/app-error.js';

export class TransportService {
  // Vehicles
  async listVehicles() {
    return VehicleModel.find().sort({ registrationNumber: 1 });
  }

  async createVehicle(data: any) {
    const vehicle = new VehicleModel(data);
    await vehicle.save();
    return vehicle;
  }

  // Routes
  async listRoutes() {
    return RouteModel.find().populate('vehicleId').sort({ routeName: 1 });
  }

  async createRoute(data: any) {
    const route = new RouteModel(data);
    await route.save();
    return route.populate('vehicleId');
  }

  // Allocations
  async assignStudent(studentId: string, data: { routeId: string; stopName: string; monthlyFee?: number }) {
    const assignment = await TransportAssignmentModel.findOneAndUpdate(
      { studentId },
      {
        studentId,
        routeId: data.routeId,
        stopName: data.stopName,
        monthlyFee: data.monthlyFee || 500,
        status: 'active',
      },
      { upsert: true, new: true }
    ).populate('routeId');

    return assignment;
  }

  async listAssignments() {
    return TransportAssignmentModel.find({ status: 'active' })
      .populate('studentId', 'firstName lastName admissionNumber currentClassId currentSectionId')
      .populate('routeId', 'routeName vehicleId');
  }
}

export const transportService = new TransportService();

