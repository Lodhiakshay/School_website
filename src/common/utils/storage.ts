import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';
import { BadRequestError } from '../errors/app-error.js';
import { env } from '../../config/env.js';

import { v2 as cloudinary } from 'cloudinary';

// Ensure upload directory exists
const uploadDir = path.resolve(process.cwd(), env.UPLOAD_DIR);
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage Configuration
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml',
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-matroska',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new BadRequestError(`Unsupported file format (${file.mimetype}). Allowed: Images, Videos (MP4/WebM/MOV), PDF, DOC, XLS, CSV`));
  }
};

export const upload = multer({
  storage: diskStorage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB maximum (supports short videos and high-res media)
  },
  fileFilter,
});

export interface FileStorageProvider {
  upload(file: Express.Multer.File): Promise<string>;
  delete(fileUrl: string): Promise<boolean>;
}

export class LocalStorageProvider implements FileStorageProvider {
  async upload(file: Express.Multer.File): Promise<string> {
    return `/uploads/${file.filename}`;
  }

  async delete(fileUrl: string): Promise<boolean> {
    try {
      const filename = path.basename(fileUrl);
      const filePath = path.join(uploadDir, filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return true;
    } catch {
      return false;
    }
  }
}

export class CloudinaryStorageProvider implements FileStorageProvider {
  constructor() {
    if (process.env.CLOUDINARY_URL) {
      cloudinary.config({
        cloudinary_url: process.env.CLOUDINARY_URL,
      });
    }
  }

  async upload(file: Express.Multer.File): Promise<string> {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'sarswati_erp',
        resource_type: 'auto',
      });
      // Clean up local temp file after upload
      if (fs.existsSync(file.path)) {
        try {
          fs.unlinkSync(file.path);
        } catch {
          // Ignore
        }
      }
      return result.secure_url;
    } catch (err: any) {
      console.warn('Cloudinary upload fallback to local storage:', err?.message || err);
      return `/uploads/${file.filename}`;
    }
  }

  async delete(fileUrl: string): Promise<boolean> {
    try {
      const parts = fileUrl.split('/');
      const filename = parts[parts.length - 1].split('.')[0];
      await cloudinary.uploader.destroy(`sarswati_erp/${filename}`);
      return true;
    } catch {
      return false;
    }
  }
}

export const storageProvider: FileStorageProvider =
  process.env.CLOUDINARY_URL || env.STORAGE_PROVIDER === 'cloudinary'
    ? new CloudinaryStorageProvider()
    : new LocalStorageProvider();

