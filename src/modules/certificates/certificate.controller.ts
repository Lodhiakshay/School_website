import { Response, NextFunction } from 'express';
import { certificateService } from './certificate.service.js';
import { sendResponse, sendCreated } from '../../common/utils/response.js';
import { AuthRequest } from '../../common/types/auth.types.js';

export class CertificateController {
  async list(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { studentId, certificateType } = req.query;
      const certs = await certificateService.listCertificates({
        studentId: studentId as string,
        certificateType: certificateType as string,
      });
      sendResponse(res, 200, certs, 'Certificates fetched');
    } catch (error) {
      next(error);
    }
  }

  async generate(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await certificateService.generateCertificate({
        ...req.body,
        issuedBy: req.user!.userId,
      });
      sendCreated(res, result, 'Certificate generated successfully');
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await certificateService.getCertificateById(req.params.id);
      sendResponse(res, 200, result, 'Certificate details fetched');
    } catch (error) {
      next(error);
    }
  }
}

export const certificateController = new CertificateController();

