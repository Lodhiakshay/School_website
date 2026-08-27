# 🏫 Sarswati Gyan Mandir & SSSD Public School — ERP Backend API

Production-grade RESTful API built with **Node.js, Express, TypeScript, MongoDB Atlas, and Cloudinary CDN**.

---

## 🚀 Features & Modules

- **Authentication & RBAC**: JWT Access & Refresh Tokens, 9 User Roles (SuperAdmin, Admin, Principal, Teacher, Student, Parent, Accountant, Librarian, Receptionist).
- **Public School Portal API**: Public homepage CMS, Hero, Stats, Academic Wings, Facilities, Leadership Desk, SSSD English Wing, 360° Infinite Carousel, and Video Testimonials.
- **Dynamic Multi-Source Video Stories**: YouTube, Vimeo, and direct MP4/WebM/Cloudinary video streams with live hover playback and HD modal streaming.
- **Production-Grade CORS**: Fully permissive and dynamic for `http://localhost:3000`, `http://127.0.0.1:3000`, `https://school-website-ecru-pi.vercel.app`, and all Vercel deployment domains (`*.vercel.app`).
- **Cloudinary Storage Provider**: Automatic handling for photos, documents (PDFs), and short videos up to 100MB.
- **Academics & ERP Operations**: Student Admissions, Fee Collection & Invoicing, Attendance Tracking, Exam Schedules & Report Cards, Timetables, ID Badges, and Audit Logs.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Language**: TypeScript 5
- **Database**: MongoDB / MongoDB Atlas (via Mongoose 8)
- **File & Video Storage**: Cloudinary CDN (`resource_type: auto`)
- **API Documentation**: Swagger UI at `/api/docs`

---

## ⚙️ Environment Variables (`.env`)

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/sarswati_erp?retryWrites=true&w=majority
JWT_SECRET=super_secret_jwt_access_key_sarswati_gyan_mandir_2026
JWT_REFRESH_SECRET=super_secret_jwt_refresh_key_sarswati_gyan_mandir_2026
JWT_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000,https://school-website-ecru-pi.vercel.app
UPLOAD_DIR=uploads
STORAGE_PROVIDER=cloudinary
CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
```

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Development Mode
```bash
npm run dev
```

### 3. Production Build
```bash
npm run build
npm start
```

### 4. Database Seeding
```bash
npm run seed
```

---

## 🌐 Production Deployments

- **Frontend Website**: [https://school-website-ecru-pi.vercel.app](https://school-website-ecru-pi.vercel.app)
- **API Health Check**: `GET /health`
- **Swagger Documentation**: `GET /api/docs`
