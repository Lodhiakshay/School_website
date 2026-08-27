export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Sarswati Gyan Mandir School ERP API',
    version: '1.0.0',
    description:
      'Production-Grade School Information System (SIS) / ERP REST API for Sarswati Gyan Mandir, Shamsabad Farrukhabad UP',
    contact: {
      name: 'School Administration Support',
      email: 'admin@sarswatigyanmandir.edu.in',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000/api/v1',
      description: 'Local Development Server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    '/auth/login': {
      post: {
        summary: 'Authenticate user and return JWT access and refresh tokens',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  identifier: { type: 'string', example: 'admin@sarswati.edu' },
                  password: { type: 'string', example: 'Admin@123' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Login successful' },
          401: { description: 'Invalid credentials' },
        },
      },
    },
    '/school/public': {
      get: {
        summary: 'Get public school profile details for website',
        responses: {
          200: { description: 'School profile details' },
        },
      },
    },
    '/admissions/public/apply': {
      post: {
        summary: 'Submit online public admission inquiry',
        responses: {
          201: { description: 'Application submitted successfully' },
        },
      },
    },
  },
};

