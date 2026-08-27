import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
    [key: string]: any;
  };
  errors?: any[];
}

export const sendResponse = <T>(
  res: Response,
  statusCode = 200,
  data: T | null = null,
  message = 'Operation successful',
  meta?: ApiResponse['meta']
): Response => {
  const payload: ApiResponse<T> = {
    success: statusCode >= 200 && statusCode < 300,
    message,
    ...(data !== null && { data }),
    ...(meta && { meta }),
  };
  return res.status(statusCode).json(payload);
};

export const sendCreated = <T>(
  res: Response,
  data: T,
  message = 'Resource created successfully'
): Response => {
  return sendResponse(res, 201, data, message);
};

