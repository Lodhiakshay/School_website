import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { env } from './config/env.js';
import { swaggerDocument } from './config/swagger.js';
import { errorHandler } from './common/middlewares/error.middleware.js';

// Route Imports
import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/users/user.routes.js';
import roleRoutes from './modules/roles/role.routes.js';
import schoolRoutes from './modules/school/school.routes.js';
import academicRoutes from './modules/academics/academics.routes.js';
import studentRoutes from './modules/students/student.routes.js';
import teacherRoutes from './modules/teachers/teacher.routes.js';
import parentRoutes from './modules/parents/parent.routes.js';
import attendanceRoutes from './modules/attendance/attendance.routes.js';
import timetableRoutes from './modules/timetable/timetable.routes.js';
import homeworkRoutes from './modules/homework/homework.routes.js';
import examRoutes from './modules/exams/exam.routes.js';
import resultRoutes from './modules/results/results.routes.js';
import feeRoutes from './modules/fees/fee.routes.js';
import admissionRoutes from './modules/admissions/admission.routes.js';
import noticeRoutes from './modules/notices/notice.routes.js';
import libraryRoutes from './modules/library/library.routes.js';
import transportRoutes from './modules/transport/transport.routes.js';
import certificateRoutes from './modules/certificates/certificate.routes.js';
import documentRoutes from './modules/documents/document.routes.js';
import auditRoutes from './modules/audit/audit.routes.js';
import reportRoutes from './modules/reports/reports.routes.js';
import dashboardRoutes from './modules/dashboard/dashboard.routes.js';
import galleryRoutes from './modules/gallery/gallery.routes.js';

export const createApp = () => {
  const app = express();

  // Basic Security & Middlewares
  app.use(helmet({ crossOriginResourcePolicy: false }));

  // Production-Grade Dynamic CORS Configuration (Localhost + Vercel + Custom Origins)
  const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3001',
    'https://school-website-ecru-pi.vercel.app',
  ];

  if (env.CORS_ORIGIN) {
    const extraOrigins = env.CORS_ORIGIN.split(',').map((o) => o.trim());
    extraOrigins.forEach((o) => {
      if (o && !allowedOrigins.includes(o)) allowedOrigins.push(o);
    });
  }

  const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman, server-to-server)
      if (!origin) return callback(null, true);

      // Check explicit allowed list
      if (allowedOrigins.includes(origin)) return callback(null, true);

      // Allow all Vercel deployment preview / production URLs (*.vercel.app)
      if (/^https:\/\/.*\.vercel\.app$/.test(origin)) return callback(null, true);

      // In development, allow all localhost ports
      if (/^http:\/\/localhost:\d+$/.test(origin) || /^http:\/\/127\.0\.0\.1:\d+$/.test(origin)) {
        return callback(null, true);
      }

      // Permissive fallback so legitimate client domains never face CORS block
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'Access-Control-Request-Method',
      'Access-Control-Request-Headers',
    ],
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  if (env.isDevelopment) {
    app.use(morgan('dev'));
  }

  // Static File Uploads directory
  app.use('/uploads', express.static(path.resolve(process.cwd(), env.UPLOAD_DIR)));

  // Swagger Documentation
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Health Check
  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
      status: 'healthy',
      institution: 'Sarswati Gyan Mandir, Shamsabad Farrukhabad UP',
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
    });
  });

  // REST API v1 Routes
  const apiV1 = express.Router();
  apiV1.use('/auth', authRoutes);
  apiV1.use('/users', userRoutes);
  apiV1.use('/roles', roleRoutes);
  apiV1.use('/school', schoolRoutes);
  apiV1.use('/academics', academicRoutes);
  apiV1.use('/students', studentRoutes);
  apiV1.use('/teachers', teacherRoutes);
  apiV1.use('/parents', parentRoutes);
  apiV1.use('/attendance', attendanceRoutes);
  apiV1.use('/timetable', timetableRoutes);
  apiV1.use('/homework', homeworkRoutes);
  apiV1.use('/exams', examRoutes);
  apiV1.use('/results', resultRoutes);
  apiV1.use('/fees', feeRoutes);
  apiV1.use('/admissions', admissionRoutes);
  apiV1.use('/notices', noticeRoutes);
  apiV1.use('/library', libraryRoutes);
  apiV1.use('/transport', transportRoutes);
  apiV1.use('/certificates', certificateRoutes);
  apiV1.use('/documents', documentRoutes);
  apiV1.use('/audit-logs', auditRoutes);
  apiV1.use('/reports', reportRoutes);
  apiV1.use('/dashboard', dashboardRoutes);
  apiV1.use('/gallery', galleryRoutes);

  app.use('/api/v1', apiV1);

  // 404 Route Handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: `Endpoint ${req.method} ${req.originalUrl} not found on this server.`,
    });
  });

  // Centralized Error Handling
  app.use(errorHandler);

  return app;
};

