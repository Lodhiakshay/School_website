import { Response, NextFunction } from 'express';
import { transportService } from './transport.service.js';
import { sendResponse, sendCreated } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/types/auth.types.js';

export class TransportController {
  async listVehicles(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const vehicles = await transportService.listVehicles();
      sendResponse(res, 200, vehicles, 'Vehicles fetched');
    } catch (error) {
      next(error);
    }
  }

  async createVehicle(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const vehicle = await transportService.createVehicle(req.body);
      sendCreated(res, vehicle, 'Vehicle created');
    } catch (error) {
      next(error);
    }
  }

  async listRoutes(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const routes = await transportService.listRoutes();
      sendResponse(res, 200, routes, 'Routes fetched');
    } catch (error) {
      next(error);
    }
  }

  async createRoute(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const route = await transportService.createRoute(req.body);
      sendCreated(res, route, 'Route created');
    } catch (error) {
      next(error);
    }
  }

  async assignStudent(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const assignment = await transportService.assignStudent(req.params.studentId, req.body);
      sendResponse(res, 200, assignment, 'Transport assigned to student');
    } catch (error) {
      next(error);
    }
  }

  async listAssignments(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const assignments = await transportService.listAssignments();
      sendResponse(res, 200, assignments, 'Assignments fetched');
    } catch (error) {
      next(error);
    }
  }
}

export const transportController = new TransportController();

