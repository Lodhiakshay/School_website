import mongoose from 'mongoose';
import { env } from './env.js';
import { logger } from '../common/utils/logger.js';

export const connectDatabase = async (): Promise<void> => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(env.MONGODB_URI, {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
    });
    logger.info(`✅ MongoDB Connected successfully to database: ${mongoose.connection.name}`);
  } catch (error) {
    logger.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }

  mongoose.connection.on('disconnected', () => {
    logger.warn('⚠️ MongoDB disconnected. Attempting reconnection...');
  });

  mongoose.connection.on('error', (err) => {
    logger.error('❌ MongoDB event error:', err);
  });
};

