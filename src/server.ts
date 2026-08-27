import { createApp } from './app.js';
import { env } from './config/env.js';
import { connectDatabase } from './config/database.js';
import { logger } from './common/utils/logger.js';

const startServer = async () => {
  try {
    // 1. Connect to MongoDB
    await connectDatabase();

    // 2. Initialize App
    const app = createApp();

    // 3. Start listening
    const server = app.listen(env.PORT, () => {
      logger.info(`🚀 Sarswati Gyan Mandir ERP Backend running at http://localhost:${env.PORT}`);
      logger.info(`📚 Swagger API Documentation available at http://localhost:${env.PORT}/api/docs`);
      logger.info(`🩺 Health Check endpoint available at http://localhost:${env.PORT}/health`);
    });

    // Graceful Shutdown Handlers
    const shutdown = () => {
      logger.info('Shutting down server gracefully...');
      server.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    logger.error('Fatal Server Initialization Error:', error);
    process.exit(1);
  }
};

startServer();

