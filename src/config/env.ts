import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const env = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sarswati_erp',
  JWT_SECRET: process.env.JWT_SECRET || 'super_secret_jwt_access_key_sarswati_gyan_mandir_2026',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'super_secret_jwt_refresh_key_sarswati_gyan_mandir_2026',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  UPLOAD_DIR: process.env.UPLOAD_DIR || 'uploads',
  STORAGE_PROVIDER: process.env.STORAGE_PROVIDER || 'local',
  CLOUDINARY_URL: process.env.CLOUDINARY_URL || '',
  EMAIL_PROVIDER: process.env.EMAIL_PROVIDER || 'smtp',
  SMS_PROVIDER: process.env.SMS_PROVIDER || 'mock',
  PAYMENT_PROVIDER: process.env.PAYMENT_PROVIDER || 'mock',
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
};

