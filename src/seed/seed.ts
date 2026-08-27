import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { env } from '../config/env.js';
import { SchoolModel } from '../modules/school/models/school.model.js';
import { RoleModel } from '../modules/auth/models/role.model.js';
import { UserModel } from '../modules/auth/models/user.model.js';
import { AcademicYearModel } from '../modules/academics/models/academic-year.model.js';
import { ClassModel } from '../modules/academics/models/class.model.js';
import { SectionModel } from '../modules/academics/models/section.model.js';
import { SubjectModel } from '../modules/academics/models/subject.model.js';
import { TeacherModel } from '../modules/teachers/models/teacher.model.js';
import { ParentModel } from '../modules/parents/models/parent.model.js';
import { StudentModel } from '../modules/students/models/student.model.js';
import { FeeCategoryModel } from '../modules/fees/models/fee-category.model.js';
import { FeeInvoiceModel } from '../modules/fees/models/fee-invoice.model.js';
import { FeePaymentModel } from '../modules/fees/models/fee-payment.model.js';
import { AttendanceModel } from '../modules/attendance/models/attendance.model.js';
import { ExamModel } from '../modules/exams/models/exam.model.js';
import { ResultModel } from '../modules/results/models/result.model.js';
import { HomeworkModel } from '../modules/homework/models/homework.model.js';
import { TimetableModel } from '../modules/timetable/models/timetable.model.js';
import { NoticeModel } from '../modules/notices/models/notice.model.js';
import { BookModel } from '../modules/library/models/book.model.js';
import { RouteModel } from '../modules/transport/models/route.model.js';
import { VehicleModel } from '../modules/transport/models/vehicle.model.js';

export async function seedDatabase() {
  console.log('🚀 Connecting to MongoDB Atlas database...');
  await mongoose.connect(env.MONGODB_URI);
  console.log('✅ Connected to MongoDB Atlas:', mongoose.connection.name);

  // 1. Seed School Profile & Dynamic Content
  console.log('🏫 1. Seeding School Profile & CMS Content...');
  await SchoolModel.deleteMany({});
  const school = await SchoolModel.create({
    name: 'Sarswati Gyan Mandir Inter College & SSSD Public School',
    nameHindi: 'सरस्वती ज्ञान मन्दिर इण्टर कॉलेज',
    tagline: 'Excellence in Education, Culture & Character Building',
    affiliationCode: 'UP-FBD-2026-SGM-089',
    examinationCenterCode: 'FBD-CENT-1089',
    board: 'UP State Board of High School & Intermediate Education (Prayagraj)',
    establishedYear: '1999',
    address: {
      street: 'Main Road, Near Bus Stand',
      city: 'Shamsabad',
      district: 'Farrukhabad',
      state: 'Uttar Pradesh',
      pincode: '209503',
      country: 'India',
    },
    contact: {
      phone: '+91 9876543210',
      email: 'info@sarswatigyanmandir.edu.in',
      alternatePhone: '+91 9451234501',
    },
    principal: {
      name: 'Dr. Ramesh Kumar Sharma',
      email: 'principal@sarswati.edu',
      phone: '+91 9451234568',
      qualifications: 'M.Sc., M.Ed., Ph.D.',
      signatureUrl: '/images/stamps/principal-signature.png',
    },
    ticker: {
      text: 'Admissions Open for Session 2026-2027 (Nursery to Class 12 PCM/PCB/Arts) • UP Board High School Results 99.4% Pass Rate',
      url: '/admissions',
      badge: 'URGENT ANNOUNCEMENT',
      isActive: true,
      showContactInfo: true,
      mapsUrl: 'https://maps.google.com/?q=Shamsabad+Farrukhabad+Uttar+Pradesh',
    },
    hero: {
      badge: {
        text: 'Premier Intermediate College in Shamsabad, Farrukhabad (UP)',
        isActive: true,
      },
      titleHindi: 'सरस्वती ज्ञान मन्दिर',
      titleEnglish: 'Sarswati Gyan Mandir',
      subtitle: 'Nurturing Character, Culture & Academic Excellence',
      description:
        'Affiliated with the UP State Board of High School and Intermediate Education. We provide state-of-the-art laboratory infrastructure, holistic values, disciplined learning, and complete digital portal management for students from Nursery to Class 12.',
      bgImageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80',
      primaryBtn: {
        text: 'Apply Online 2026-27',
        url: '/admissions',
        isActive: true,
        isExternal: false,
      },
      secondaryBtn: {
        text: 'Central ERP Portal',
        url: '/login',
        isActive: true,
      },
      quickAdmissionWidget: {
        title: 'ONLINE ADMISSIONS 2026-27',
        subtitle: 'Nursery to Class 12 (Science / Arts)',
        description: 'Admissions open for academic session 2026-27. Submit an online inquiry for instant counseling.',
        buttonText: 'SUBMIT ADMISSION INQUIRY',
        buttonUrl: '/admissions',
        isActive: true,
        benefits: [
          { text: 'High School Board Batches', isActive: true },
          { text: 'Class 11 PCM / PCB / Arts', isActive: true },
          { text: 'Digital Lab Facilities', isActive: true },
          { text: 'School Bus Routes', isActive: true },
        ],
      },
    },
    stats: [
      { value: '1,250+', label: 'Enrolled Scholars', iconKey: 'Users', order: 1, isActive: true },
      { value: '42+', label: 'Expert Faculty', iconKey: 'GraduationCap', order: 2, isActive: true },
      { value: '99.4%', label: 'Board Pass Rate', iconKey: 'Award', order: 3, isActive: true },
      { value: '25+ Yrs', label: 'Academic Legacy', iconKey: 'Building2', order: 4, isActive: true },
    ],
    academicWings: [
      {
        title: 'Pre-Primary & Primary Wing',
        grades: 'Nursery to Class 5',
        image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80',
        desc: 'Foundational literacy, phonics, joyful arithmetic, creative arts, and moral grounding in a caring environment.',
        slug: 'primary',
        order: 1,
        isActive: true,
      },
      {
        title: 'Middle School Wing',
        grades: 'Class 6 to Class 8',
        image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80',
        desc: 'Scientific exploration, digital literacy, languages (Hindi, English, Sanskrit), and strong mathematics fundamentals.',
        slug: 'middle',
        order: 2,
        isActive: true,
      },
      {
        title: 'High School (UP Board)',
        grades: 'Class 9 & Class 10',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
        desc: 'Rigorous state board curriculum, NCERT mastery, comprehensive laboratory experiments, and board mock series.',
        slug: 'high-school',
        order: 3,
        isActive: true,
      },
      {
        title: 'Intermediate College Wing',
        grades: 'Class 11 & Class 12',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
        desc: 'Specialized Science (PCM/PCB) & Humanities streams with state board preparation and competitive examination guidance.',
        slug: 'intermediate',
        order: 4,
        isActive: true,
      },
    ],
    facilities: [
      {
        title: 'Physics & Chemistry Labs',
        desc: 'Equipped with modern apparatus, optical benches, reagents, and certified safety setups.',
        image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
        features: ['Optical Benches', 'Digital Balances', 'Safety Fume Stations'],
        order: 1,
        isActive: true,
      },
      {
        title: 'Digital Computer Center',
        desc: 'Air-conditioned lab with 40+ connected workstations and coding modules.',
        image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80',
        features: ['Gigabit LAN', 'Coding & Robotics', 'Full Power Backup'],
        order: 2,
        isActive: true,
      },
      {
        title: 'Central Knowledge Library',
        desc: 'Extensive repository of 5,000+ reference volumes, encyclopedias, and regional literature.',
        image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80',
        features: ['5,000+ Books', 'Daily Periodicals', 'Digital Catalog'],
        order: 3,
        isActive: true,
      },
      {
        title: 'Dedicated Transport Fleet',
        desc: 'GPS-tracked school buses covering Shamsabad, Farrukhabad, and surrounding rural routes.',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
        features: ['GPS Tracking', 'CCTV Security', 'Speed Governed'],
        order: 4,
        isActive: true,
      },
    ],
    principalDesk: {
      name: 'Dr. Ramesh Kumar Sharma',
      qualifications: 'Principal • M.Sc., M.Ed., Ph.D.',
      experience: '★ 25+ Years Academic Leadership',
      quote: 'Empowering Rural Youth with Modern Science, Moral Character & Board Excellence',
      message:
        'At Saraswati Gyan Mandir and our English-medium wing SSSD Public School, education is not merely the transmission of syllabus — it is the ignite of intellect, character building, cultural ethos, and competitive spirit. We are dedicated to providing students of Shamsabad and Farrukhabad with world-class facilities and nurturing mentorship.',
      photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=85',
      signatureUrl: '/images/stamps/principal-signature.png',
      roundSealUrl: '/images/stamps/principal-round-seal.png',
      isActive: true,
      pillars: [
        { title: 'Board Toppers', desc: 'Consistent Top State & District Ranks', iconKey: 'GraduationCap', isActive: true },
        { title: 'Modern Labs', desc: 'Physics, Chem, Bio & IT Practical Centers', iconKey: 'Sparkles', isActive: true },
        { title: 'Values & Sports', desc: 'Sanskar, Discipline & Physical Fitness', iconKey: 'Award', isActive: true },
      ],
    },
    headmistressDesk: {
      name: 'Mrs. Ananya Sen',
      qualifications: 'Headmistress & Spoken English Lead • M.A. (English), B.Ed.',
      experience: '★ 15+ Years English Pedagogy',
      quote: 'Fostering Eloquent Expression, Critical Thinking & Global English Confidence',
      message:
        'At SSSD Public School, our primary commitment is to create a dynamic, 100% English medium learning atmosphere where students speak fluent English with natural poise and confidence.',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85',
      signatureUrl: '/images/stamps/sssd-principal-signature.png',
      roundSealUrl: '/images/stamps/sssd-principal-round-seal.png',
      isActive: true,
    },
    managerDesk: {
      name: 'Shri Ram Swaroop Sharma',
      qualifications: 'Managing Director & Founder • M.A., LL.B.',
      experience: '★ 35+ Years Educational Administration',
      quote: 'Dedicated to the Upliftment and Enlightened Future of Farrukhabad',
      message:
        'Our mission from day one has been to ensure that no talented child in Shamsabad is deprived of quality modern education due to lack of facilities.',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85',
      signatureUrl: '/images/stamps/principal-signature.png',
      roundSealUrl: '/images/stamps/principal-round-seal.png',
      isActive: true,
    },
    directorDesk: {
      name: 'Er. Alok Sharma',
      qualifications: 'Academic Director • B.Tech (IIT), MBA',
      experience: '★ 12+ Years EdTech & Academic Strategy',
      quote: 'Integrating Smart Digital Labs, Robotics & Vedic Mathematics',
      message:
        'We blend traditional Indian value systems with 21st-century technological tools like Smart 3D Classrooms, Phonics Studios, and Computer Coding modules.',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=85',
      signatureUrl: '/images/stamps/principal-signature.png',
      roundSealUrl: '/images/stamps/principal-round-seal.png',
      isActive: true,
    },
    sssdShowcase: {
      title: 'SSSD Public School',
      subtitle: 'SHAMSABAD • FARRUKHABAD (100% ENGLISH MEDIUM)',
      description:
        'Seeking a dedicated 100% English Medium learning environment with CBSE pattern curriculum, digital smart boards, and phonics labs? Discover our premier English-medium campus located right here in Shamsabad, Farrukhabad.',
      badge: '100% English Medium Wing • CBSE Pattern',
      logoUrl: '/images/sssd-logo.png',
      imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
      admissionUrl: '/sssd',
      whatsappNumber: '+919451234567',
      isActive: true,
      highlights: [
        { title: 'Nursery to 10th', subtitle: 'Co-Ed Schooling', isActive: true },
        { title: '100% English', subtitle: 'Spoken & Phonics', isActive: true },
        { title: 'Smart STEM Labs', subtitle: 'GPS Bus Fleet', isActive: true },
      ],
    },
    footer: {
      aboutText:
        'Sarswati Gyan Mandir Intermediate College and SSSD Public School are premier educational institutions in Shamsabad, Farrukhabad (UP), dedicated to high academic standards, modern science, cultural sanskars, and disciplined character building.',
      copyrightText: '© 2026 Sarswati Gyan Mandir & SSSD Public School. All rights reserved.',
      helplinePhone: '+91 9876543210',
      supportEmail: 'info@sarswatigyanmandir.edu.in',
      address: 'Main Road, Near Bus Stand, Shamsabad, Farrukhabad, UP - 209503',
      socialLinks: {
        facebook: 'https://facebook.com',
        youtube: 'https://youtube.com',
        instagram: 'https://instagram.com',
        whatsapp: 'https://wa.me/919876543210',
      },
    },
    logoUrl: '/logo.png',
    websiteUrl: 'http://localhost:3000',
    isActive: true,
  });

  // 2. Seed Master Roles
  console.log('🛡️ 2. Seeding Master Roles...');
  await RoleModel.deleteMany({});
  const roles = [
    { name: 'SuperAdmin', displayName: 'Super Administrator', description: 'Full root control', permissions: ['*'], isSystemRole: true },
    { name: 'Admin', displayName: 'School Administrator', description: 'Campus management', permissions: ['*'], isSystemRole: true },
    { name: 'Principal', displayName: 'Principal & Academic Head', description: 'Academic approvals', permissions: ['*'], isSystemRole: true },
    { name: 'Teacher', displayName: 'Teacher / Faculty', description: 'Attendance, marks, homework', permissions: ['*'], isSystemRole: true },
    { name: 'Accountant', displayName: 'Accountant / Cashier', description: 'POS fee collection', permissions: ['*'], isSystemRole: true },
    { name: 'Librarian', displayName: 'Librarian', description: 'Book cataloging', permissions: ['*'], isSystemRole: true },
    { name: 'AdmissionStaff', displayName: 'Admission Officer', description: 'Admissions CRM', permissions: ['*'], isSystemRole: true },
    { name: 'Student', displayName: 'Student', description: 'Student self-service', permissions: ['*'], isSystemRole: true },
    { name: 'Parent', displayName: 'Parent / Guardian', description: 'Parent multi-child monitor', permissions: ['*'], isSystemRole: true },
  ];
  await RoleModel.insertMany(roles);

  // 3. Seed Users
  console.log('👤 3. Seeding Master Users...');
  await UserModel.deleteMany({});
  const defaultPasswordHash = await bcrypt.hash('Admin@123', 10);
  const teacherPasswordHash = await bcrypt.hash('Teacher@123', 10);
  const principalPasswordHash = await bcrypt.hash('Principal@123', 10);
  const accountantPasswordHash = await bcrypt.hash('Account@123', 10);
  const librarianPasswordHash = await bcrypt.hash('Library@123', 10);
  const admissionPasswordHash = await bcrypt.hash('Admission@123', 10);
  const studentPasswordHash = await bcrypt.hash('Student@123', 10);
  const parentPasswordHash = await bcrypt.hash('Parent@123', 10);

  const seededUsers = await UserModel.insertMany([
    { name: 'Super Administrator', email: 'superadmin@sarswati.edu', username: 'superadmin', passwordHash: defaultPasswordHash, role: 'SuperAdmin', phone: '+91 9876543210', status: 'active' },
    { name: 'School Administrator', email: 'admin@sarswati.edu', username: 'admin', passwordHash: defaultPasswordHash, role: 'Admin', phone: '+91 9876543211', status: 'active' },
    { name: 'Dr. Ramesh Kumar Sharma', email: 'principal@sarswati.edu', username: 'principal', passwordHash: principalPasswordHash, role: 'Principal', phone: '+91 9451234568', status: 'active' },
    { name: 'Dinesh Gupta', email: 'teacher@sarswati.edu', username: 'teacher', passwordHash: teacherPasswordHash, role: 'Teacher', phone: '+91 9451234502', status: 'active' },
    { name: 'Suresh Verma', email: 'accountant@sarswati.edu', username: 'accountant', passwordHash: accountantPasswordHash, role: 'Accountant', phone: '+91 9451234503', status: 'active' },
    { name: 'Pooja Pandey', email: 'librarian@sarswati.edu', username: 'librarian', passwordHash: librarianPasswordHash, role: 'Librarian', phone: '+91 9451234504', status: 'active' },
    { name: 'Amit Singh', email: 'admission@sarswati.edu', username: 'admission', passwordHash: admissionPasswordHash, role: 'AdmissionStaff', phone: '+91 9451234505', status: 'active' },
    { name: 'Aarav Sharma', email: 'student@sarswati.edu', username: 'student', passwordHash: studentPasswordHash, role: 'Student', phone: '+91 9451234506', status: 'active' },
    { name: 'Rajesh Sharma', email: 'parent@sarswati.edu', username: 'parent', passwordHash: parentPasswordHash, role: 'Parent', phone: '+91 9451234507', status: 'active' },
  ]);

  const teacherUser = seededUsers.find((u) => u.role === 'Teacher')!;
  const studentUser = seededUsers.find((u) => u.role === 'Student')!;
  const parentUser = seededUsers.find((u) => u.role === 'Parent')!;
  const principalUser = seededUsers.find((u) => u.role === 'Principal')!;

  // 4. Seed Academic Years
  console.log('📅 4. Seeding Academic Years...');
  await AcademicYearModel.deleteMany({});
  const currentAcademicYear = await AcademicYearModel.create({
    name: '2026-2027',
    startDate: new Date('2026-04-01'),
    endDate: new Date('2027-03-31'),
    isCurrent: true,
    status: 'active',
  });

  // 5. Seed Classes
  console.log('📚 5. Seeding Classes...');
  await ClassModel.deleteMany({});
  const classDocs = await ClassModel.insertMany([
    { name: 'Class 7', code: 'C7', orderIndex: 9, description: 'Middle School Wing' },
    { name: 'Class 8', code: 'C8', orderIndex: 10, description: 'Middle School Wing' },
    { name: 'Class 9', code: 'C9', orderIndex: 11, description: 'High School Prep' },
    { name: 'Class 10', code: 'C10', orderIndex: 12, description: 'UP State Board High School' },
    { name: 'Class 11 Science (PCM)', code: 'C11-PCM', orderIndex: 13, description: 'Intermediate PCM' },
    { name: 'Class 11 Science (PCB)', code: 'C11-PCB', orderIndex: 14, description: 'Intermediate PCB' },
    { name: 'Class 12 Science (PCM)', code: 'C12-PCM', orderIndex: 16, description: 'Intermediate PCM Board' },
    { name: 'Class 12 Science (PCB)', code: 'C12-PCB', orderIndex: 17, description: 'Intermediate PCB Board' },
  ]);

  const class10 = classDocs.find((c) => c.code === 'C10')!;
  const class7 = classDocs.find((c) => c.code === 'C7')!;
  const class12PCM = classDocs.find((c) => c.code === 'C12-PCM')!;
  const class12PCB = classDocs.find((c) => c.code === 'C12-PCB')!;

  // 6. Seed Sections
  console.log('🏷️ 6. Seeding Sections...');
  await SectionModel.deleteMany({});
  const section10A = await SectionModel.create({ name: 'A', classId: class10._id, academicYearId: currentAcademicYear._id, roomNumber: 'Room 101', capacity: 45 });
  const section10B = await SectionModel.create({ name: 'B', classId: class10._id, academicYearId: currentAcademicYear._id, roomNumber: 'Room 102', capacity: 45 });
  const section7B = await SectionModel.create({ name: 'B', classId: class7._id, academicYearId: currentAcademicYear._id, roomNumber: 'Room 204', capacity: 40 });
  const section12A = await SectionModel.create({ name: 'A', classId: class12PCM._id, academicYearId: currentAcademicYear._id, roomNumber: 'Room 301', capacity: 45 });
  const section12B = await SectionModel.create({ name: 'B', classId: class12PCB._id, academicYearId: currentAcademicYear._id, roomNumber: 'Room 302', capacity: 45 });

  // 7. Seed Teachers
  console.log('👨‍🏫 7. Seeding Faculty Directory...');
  await TeacherModel.deleteMany({});
  const teachers = await TeacherModel.insertMany([
    {
      userId: teacherUser._id,
      employeeId: 'EMP-2024-0012',
      name: 'Shri Dinesh Gupta',
      email: 'teacher@sarswati.edu',
      phone: '+91 9451234502',
      gender: 'male',
      department: 'Mathematics',
      designation: 'HOD Mathematics & Senior Lecturer',
      qualification: 'M.Sc. (Maths), B.Ed. (22 Yrs Exp)',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      assignedSections: [section10A._id],
      status: 'active',
    },
    {
      employeeId: 'EMP-2024-0014',
      name: 'Dr. Anita Srivastava',
      email: 'anita.srivastava@sarswati.edu',
      phone: '+91 9451234514',
      gender: 'female',
      department: 'Science',
      designation: 'Senior Physics Lecturer',
      qualification: 'M.Sc. (Physics), Ph.D.',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      assignedSections: [section10A._id, section12A._id],
      status: 'active',
    },
    {
      employeeId: 'EMP-2024-0018',
      name: 'Smt. Geeta Dixit',
      email: 'geeta.dixit@sarswati.edu',
      phone: '+91 9451234518',
      gender: 'female',
      department: 'Languages',
      designation: 'Senior Hindi Lecturer',
      qualification: 'M.A. (Hindi Sahitya), B.Ed.',
      photoUrl: 'https://images.unsplash.com/photo-1580894732473-b8adffea2d9f?auto=format&fit=crop&w=600&q=80',
      assignedSections: [section10A._id],
      status: 'active',
    },
    {
      employeeId: 'EMP-2024-0022',
      name: 'Shri Vikramaditya Singh',
      email: 'vikram.singh@sarswati.edu',
      phone: '+91 9451234522',
      gender: 'male',
      department: 'Languages',
      designation: 'English Core Lecturer',
      qualification: 'M.A. (English), B.Ed.',
      photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
      assignedSections: [section10A._id],
      status: 'active',
    },
    {
      employeeId: 'EMP-2024-0025',
      name: 'Smt. Sunita Verma',
      email: 'sunita.verma@sarswati.edu',
      phone: '+91 9451234525',
      gender: 'female',
      department: 'Primary & Science',
      designation: 'Primary Coordinator & Bio Lecturer',
      qualification: 'M.Sc. (Botany), B.Ed.',
      photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      assignedSections: [section7B._id],
      status: 'active',
    },
  ]);

  const teacherDinesh = teachers[0];

  // 8. Seed Subjects
  console.log('📖 8. Seeding Subjects...');
  await SubjectModel.deleteMany({});
  const subjects10 = await SubjectModel.insertMany([
    { name: 'Hindi (हिंदी साहित्य एवं व्याकरण)', code: 'HIN-101', classId: class10._id, type: 'theory', maxMarks: 100, passingMarks: 33, assignedTeachers: [teachers[2]._id] },
    { name: 'English (General & Literature)', code: 'ENG-102', classId: class10._id, type: 'theory', maxMarks: 100, passingMarks: 33, assignedTeachers: [teachers[3]._id] },
    { name: 'Mathematics (गणित)', code: 'MTH-103', classId: class10._id, type: 'theory', maxMarks: 100, passingMarks: 33, assignedTeachers: [teacherDinesh._id] },
    { name: 'Science (Physics, Chemistry & Biology)', code: 'SCI-104', classId: class10._id, type: 'both', maxMarks: 100, passingMarks: 33, assignedTeachers: [teachers[1]._id] },
    { name: 'Social Science (सामाजिक विज्ञान)', code: 'SST-105', classId: class10._id, type: 'theory', maxMarks: 100, passingMarks: 33, assignedTeachers: [] },
    { name: 'Sanskrit (संस्कृत)', code: 'SAN-106', classId: class10._id, type: 'theory', maxMarks: 100, passingMarks: 33, assignedTeachers: [] },
  ]);

  // 9. Seed Parents
  console.log('👨‍👩‍👧 9. Seeding Parents...');
  await ParentModel.deleteMany({});
  const rajeshParent = await ParentModel.create({
    userId: parentUser._id,
    fatherName: 'Shri Rajesh Sharma',
    fatherPhone: '+91 9451234507',
    fatherOccupation: 'Government Agriculture Officer',
    motherName: 'Smt. Kamla Sharma',
    motherOccupation: 'Homemaker',
    residentialAddress: 'Ward No. 4, Shamsabad, Farrukhabad (UP) - 209503',
    students: [],
  });

  const sunilParent = await ParentModel.create({
    fatherName: 'Shri Sunil Gupta',
    fatherPhone: '+91 9451234531',
    fatherOccupation: 'Merchant & Trader',
    motherName: 'Smt. Vandana Gupta',
    residentialAddress: 'Main Bazar, Shamsabad, Farrukhabad',
    students: [],
  });

  // 10. Seed Students
  console.log('🎓 10. Seeding Student SIS Roster...');
  await StudentModel.deleteMany({});
  const aaravStudent = await StudentModel.create({
    userId: studentUser._id,
    admissionNumber: 'SGM-2026-1001',
    studentId: '10-A-01',
    firstName: 'Aarav',
    lastName: 'Sharma',
    gender: 'male',
    dob: new Date('2010-08-15'),
    bloodGroup: 'B+',
    nationality: 'Indian',
    category: 'General',
    religion: 'Hindu',
    parentId: rajeshParent._id,
    currentClassId: class10._id,
    currentSectionId: section10A._id,
    currentRollNumber: 1,
    status: 'active',
  });

  const ananyaGupta = await StudentModel.create({
    admissionNumber: 'SGM-2026-1002',
    studentId: '10-A-02',
    firstName: 'Ananya',
    lastName: 'Gupta',
    gender: 'female',
    dob: new Date('2010-11-20'),
    bloodGroup: 'O+',
    parentId: sunilParent._id,
    currentClassId: class10._id,
    currentSectionId: section10A._id,
    currentRollNumber: 2,
    status: 'active',
  });

  const ananyaSharma = await StudentModel.create({
    admissionNumber: 'SGM-2026-0704',
    studentId: '07-B-04',
    firstName: 'Ananya',
    lastName: 'Sharma',
    gender: 'female',
    dob: new Date('2013-05-10'),
    bloodGroup: 'B+',
    parentId: rajeshParent._id,
    currentClassId: class7._id,
    currentSectionId: section7B._id,
    currentRollNumber: 4,
    status: 'active',
  });

  const divyanshuSingh = await StudentModel.create({
    admissionNumber: 'SGM-2026-1003',
    studentId: '10-A-03',
    firstName: 'Divyanshu',
    lastName: 'Singh',
    gender: 'male',
    dob: new Date('2010-04-12'),
    currentClassId: class10._id,
    currentSectionId: section10A._id,
    currentRollNumber: 3,
    status: 'active',
  });

  const rohanVerma = await StudentModel.create({
    admissionNumber: 'SGM-2026-1201',
    studentId: '12-A-01',
    firstName: 'Rohan',
    lastName: 'Verma',
    gender: 'male',
    dob: new Date('2008-03-25'),
    currentClassId: class12PCM._id,
    currentSectionId: section12A._id,
    currentRollNumber: 1,
    status: 'active',
  });

  const priyaSingh = await StudentModel.create({
    admissionNumber: 'SGM-2026-1202',
    studentId: '12-B-01',
    firstName: 'Priya',
    lastName: 'Singh',
    gender: 'female',
    dob: new Date('2008-09-18'),
    currentClassId: class12PCB._id,
    currentSectionId: section12B._id,
    currentRollNumber: 1,
    status: 'active',
  });

  // Link children back to parent
  rajeshParent.students = [aaravStudent._id as any, ananyaSharma._id as any];
  await rajeshParent.save();

  // 11. Seed Fee Categories & Invoices
  console.log('💳 11. Seeding Fee Categories & Invoices...');
  await FeeCategoryModel.deleteMany({});
  const catTuition = await FeeCategoryModel.create({ name: 'Tuition Fee', description: 'Core academic term fee', isRefundable: false });
  const catLab = await FeeCategoryModel.create({ name: 'Composite Science Lab Fee', description: 'Science lab apparatus & materials', isRefundable: false });
  const catDev = await FeeCategoryModel.create({ name: 'Annual Development & IT Charge', description: 'Smart boards & infrastructure', isRefundable: false });
  const catExam = await FeeCategoryModel.create({ name: 'Quarterly Examination & Stationery', description: 'Board test sheets & papers', isRefundable: false });
  const catLibrary = await FeeCategoryModel.create({ name: 'Library & Reading Room Maintenance', description: 'Library access', isRefundable: false });

  await FeeInvoiceModel.deleteMany({});
  await FeePaymentModel.deleteMany({});

  const invAaravQ1 = await FeeInvoiceModel.create({
    invoiceNumber: 'INV-2026-1001-Q1',
    studentId: aaravStudent._id,
    classId: class10._id,
    sectionId: section10A._id,
    academicYearId: currentAcademicYear._id,
    title: 'Quarter 1 Tuition & Annual Development (Apr - Jun)',
    items: [
      { feeCategoryId: catTuition._id, categoryName: 'Tuition Fee', amount: 4500, discount: 0, finalAmount: 4500 },
      { feeCategoryId: catDev._id, categoryName: 'Annual Development & IT Charge', amount: 1200, discount: 0, finalAmount: 1200 },
      { feeCategoryId: catLab._id, categoryName: 'Composite Science Lab Apparatus', amount: 800, discount: 0, finalAmount: 800 },
    ],
    subtotal: 6500,
    totalDiscount: 0,
    totalAmount: 6500,
    paidAmount: 6500,
    balanceAmount: 0,
    dueDate: new Date('2026-04-15'),
    status: 'paid',
  });

  await FeePaymentModel.create({
    receiptNumber: 'REC-2026-1001-Q1',
    invoiceId: invAaravQ1._id,
    studentId: aaravStudent._id,
    amount: 6500,
    paymentMethod: 'online_upi',
    transactionReference: 'UPI-2026-9812401',
    status: 'success',
    collectedBy: seededUsers.find((u) => u.role === 'Accountant')?._id,
    paymentDate: new Date('2026-04-10'),
  });

  const invAaravQ2 = await FeeInvoiceModel.create({
    invoiceNumber: 'INV-2026-1001-Q2',
    studentId: aaravStudent._id,
    classId: class10._id,
    sectionId: section10A._id,
    academicYearId: currentAcademicYear._id,
    title: 'Quarter 2 Tuition & Science Lab Fee (Jul - Sep)',
    items: [
      { feeCategoryId: catTuition._id, categoryName: 'Tuition Fee', amount: 4500, discount: 0, finalAmount: 4500 },
      { feeCategoryId: catExam._id, categoryName: 'Quarterly Examination & Stationery', amount: 700, discount: 0, finalAmount: 700 },
      { feeCategoryId: catLibrary._id, categoryName: 'Library & Reading Room Maintenance', amount: 600, discount: 0, finalAmount: 600 },
    ],
    subtotal: 5800,
    totalDiscount: 0,
    totalAmount: 5800,
    paidAmount: 5800,
    balanceAmount: 0,
    dueDate: new Date('2026-07-15'),
    status: 'paid',
  });

  await FeePaymentModel.create({
    receiptNumber: 'REC-2026-1001-Q2',
    invoiceId: invAaravQ2._id,
    studentId: aaravStudent._id,
    amount: 5800,
    paymentMethod: 'cash',
    transactionReference: 'POS-CASH-8910',
    status: 'success',
    collectedBy: seededUsers.find((u) => u.role === 'Accountant')?._id,
    paymentDate: new Date('2026-07-08'),
  });

  // 12. Seed Attendance
  console.log('📋 12. Seeding Daily Attendance...');
  await AttendanceModel.deleteMany({});
  const attendanceDates = [
    '2026-08-01', '2026-08-02', '2026-08-04', '2026-08-05', '2026-08-06',
    '2026-08-07', '2026-08-08', '2026-08-09', '2026-08-11', '2026-08-12',
    '2026-08-13', '2026-08-14', '2026-08-16', '2026-08-18', '2026-08-19',
    '2026-08-21', '2026-08-22', '2026-08-23', '2026-08-24'
  ];

  for (const d of attendanceDates) {
    await AttendanceModel.create({
      studentId: aaravStudent._id,
      classId: class10._id,
      sectionId: section10A._id,
      academicYearId: currentAcademicYear._id,
      date: d,
      status: d === '2026-08-12' ? 'late' : 'present',
      markedBy: teacherUser._id,
    });
  }

  // 13. Seed Exams & Results
  console.log('🏆 13. Seeding Exams & Marksheets...');
  await ExamModel.deleteMany({});
  const halfYearlyExam = await ExamModel.create({
    name: 'Half-Yearly Board Examination 2026',
    academicYearId: currentAcademicYear._id,
    examType: 'half_yearly',
    startDate: new Date('2026-08-10'),
    endDate: new Date('2026-08-20'),
    classes: [class10._id, class12PCM._id, class12PCB._id],
    status: 'published',
  });

  await ResultModel.deleteMany({});
  await ResultModel.create({
    examId: halfYearlyExam._id,
    studentId: aaravStudent._id,
    classId: class10._id,
    sectionId: section10A._id,
    academicYearId: currentAcademicYear._id,
    subjects: [
      { subjectId: subjects10[0]._id, subjectName: 'Hindi (हिंदी साहित्य एवं व्याकरण)', subjectCode: 'HIN-101', theoryMarks: 88, practicalMarks: 0, totalMarks: 88, maxMarks: 100, grade: 'A1', isPassed: true },
      { subjectId: subjects10[1]._id, subjectName: 'English (General & Literature)', subjectCode: 'ENG-102', theoryMarks: 84, practicalMarks: 0, totalMarks: 84, maxMarks: 100, grade: 'A2', isPassed: true },
      { subjectId: subjects10[2]._id, subjectName: 'Mathematics (गणित)', subjectCode: 'MTH-103', theoryMarks: 96, practicalMarks: 0, totalMarks: 96, maxMarks: 100, grade: 'A1', isPassed: true },
      { subjectId: subjects10[3]._id, subjectName: 'Science (Physics, Chemistry & Biology)', subjectCode: 'SCI-104', theoryMarks: 65, practicalMarks: 28, totalMarks: 93, maxMarks: 100, grade: 'A1', isPassed: true },
      { subjectId: subjects10[4]._id, subjectName: 'Social Science (सामाजिक विज्ञान)', subjectCode: 'SST-105', theoryMarks: 86, practicalMarks: 0, totalMarks: 86, maxMarks: 100, grade: 'A2', isPassed: true },
      { subjectId: subjects10[5]._id, subjectName: 'Sanskrit (संस्कृत)', subjectCode: 'SAN-106', theoryMarks: 89, practicalMarks: 0, totalMarks: 89, maxMarks: 100, grade: 'A1', isPassed: true },
    ],
    grandTotal: 536,
    maxGrandTotal: 600,
    percentage: 89.33,
    grade: 'A1',
    rank: 1,
    isPassed: true,
    attendancePercentage: 96.4,
    teacherRemarks: 'Exceptional conceptual clarity in Mathematics & Science. Sincere and disciplined.',
    principalRemarks: 'Promoted with First Division & Distinction. Keep up the high standard.',
    status: 'published',
    publishedAt: new Date(),
    publishedBy: principalUser._id,
  });

  // 14. Seed Homework
  console.log('📝 14. Seeding Homework Assignments...');
  await HomeworkModel.deleteMany({});
  await HomeworkModel.insertMany([
    {
      title: 'Quadratic Equations & Roots (Exercise 4.3)',
      description: 'Solve problems 1 through 10 from NCERT Textbook with complete step-by-step discriminant calculations.',
      subjectId: subjects10[2]._id,
      classId: class10._id,
      sectionId: section10A._id,
      academicYearId: currentAcademicYear._id,
      teacherId: teacherDinesh._id,
      dueDate: new Date('2026-08-30'),
      maxPoints: 20,
    },
    {
      title: 'सूरदास के पद — भावार्थ एवं व्याख्या',
      description: 'पद क्रमांक 1 से 4 का संदर्भ, प्रसंग सहित भावार्थ लिखें और महत्वपूर्ण अलंकारों का उल्लेख करें।',
      subjectId: subjects10[0]._id,
      classId: class10._id,
      sectionId: section10A._id,
      academicYearId: currentAcademicYear._id,
      teacherId: teachers[2]._id,
      dueDate: new Date('2026-09-02'),
      maxPoints: 20,
    },
    {
      title: 'Chemical Reactions & Balancing Redox Equations',
      description: 'Balance all 15 chemical equations and categorize them into Redox, Displacement, and Combination reactions.',
      subjectId: subjects10[3]._id,
      classId: class10._id,
      sectionId: section10A._id,
      academicYearId: currentAcademicYear._id,
      teacherId: teachers[1]._id,
      dueDate: new Date('2026-08-28'),
      maxPoints: 20,
    },
  ]);

  // 15. Seed Timetable Slots
  console.log('⏰ 15. Seeding Class 10-A Timetable...');
  await TimetableModel.deleteMany({});
  const timetableSlots = [
    { dayOfWeek: 'Monday', periodNumber: 1, startTime: '09:00 AM', endTime: '09:45 AM', subjectId: subjects10[2]._id, teacherId: teacherDinesh._id, roomNumber: 'Room 101' },
    { dayOfWeek: 'Monday', periodNumber: 2, startTime: '09:45 AM', endTime: '10:30 AM', subjectId: subjects10[3]._id, teacherId: teachers[1]._id, roomNumber: 'Physics Lab' },
    { dayOfWeek: 'Monday', periodNumber: 3, startTime: '10:30 AM', endTime: '11:15 AM', subjectId: subjects10[0]._id, teacherId: teachers[2]._id, roomNumber: 'Room 101' },
    { dayOfWeek: 'Monday', periodNumber: 4, startTime: '11:45 AM', endTime: '12:30 PM', subjectId: subjects10[1]._id, teacherId: teachers[3]._id, roomNumber: 'Room 101' },
    { dayOfWeek: 'Monday', periodNumber: 5, startTime: '12:30 PM', endTime: '01:15 PM', subjectId: subjects10[4]._id, teacherId: teacherDinesh._id, roomNumber: 'Room 101' },
    { dayOfWeek: 'Tuesday', periodNumber: 1, startTime: '09:00 AM', endTime: '09:45 AM', subjectId: subjects10[3]._id, teacherId: teachers[1]._id, roomNumber: 'Chem Lab' },
    { dayOfWeek: 'Tuesday', periodNumber: 2, startTime: '09:45 AM', endTime: '10:30 AM', subjectId: subjects10[2]._id, teacherId: teacherDinesh._id, roomNumber: 'Room 101' },
    { dayOfWeek: 'Tuesday', periodNumber: 3, startTime: '10:30 AM', endTime: '11:15 AM', subjectId: subjects10[5]._id, teacherId: teachers[2]._id, roomNumber: 'Room 101' },
    { dayOfWeek: 'Tuesday', periodNumber: 4, startTime: '11:45 AM', endTime: '12:30 PM', subjectId: subjects10[1]._id, teacherId: teachers[3]._id, roomNumber: 'Room 101' },
  ];

  for (const slot of timetableSlots) {
    await TimetableModel.create({
      academicYearId: currentAcademicYear._id,
      classId: class10._id,
      sectionId: section10A._id,
      ...slot,
    });
  }

  // 16. Seed Notices
  console.log('📢 16. Seeding Campus Notices & Ticker...');
  await NoticeModel.deleteMany({});
  await NoticeModel.insertMany([
    {
      title: 'UP Board High School & Intermediate Examination Form Submission 2026-27',
      content: 'All class 10 and 12 scholars must submit their examination fee receipt vouchers and verified Aadhaar cards at the principal office by 30 September 2026.',
      targetAudience: 'all',
      priority: 'urgent',
      publishedBy: principalUser._id,
      publishDate: new Date(),
    },
    {
      title: 'Independence Day Celebrations & Flag Hoisting Ceremony',
      content: 'Grand cultural assembly, patriotic poetry recitation, and sweets distribution at the main campus quadrangle.',
      targetAudience: 'all',
      priority: 'high',
      publishedBy: principalUser._id,
      publishDate: new Date('2026-08-14'),
    },
    {
      title: 'District Athletics & Sports Trials — Farrukhabad',
      content: 'Selected 24 student athletes to report at the sports ground for track & field coaching sessions.',
      targetAudience: 'students',
      priority: 'normal',
      publishedBy: teacherUser._id,
      publishDate: new Date('2026-08-20'),
    },
  ]);

  // 17. Seed Library Books
  console.log('📚 17. Seeding Central Library Books...');
  await BookModel.deleteMany({});
  await BookModel.insertMany([
    {
      title: 'NCERT Physics Class 12 (Part 1 & 2)',
      isbn: '978-8174506313',
      author: 'NCERT Editorial Board',
      publisher: 'NCERT Directorate',
      category: 'Science',
      totalCopies: 40,
      availableCopies: 32,
      shelfLocation: 'Rack A-01',
    },
    {
      title: 'Higher Algebra & Calculus Handbook',
      isbn: '978-9351760124',
      author: 'Hall & Knight',
      publisher: 'Arihant Publications',
      category: 'Mathematics',
      totalCopies: 25,
      availableCopies: 18,
      shelfLocation: 'Rack A-04',
    },
    {
      title: 'Comprehensive Organic Chemistry',
      isbn: '978-8188222441',
      author: 'Dr. O.P. Tandon',
      publisher: 'GRB Books',
      category: 'Science',
      totalCopies: 30,
      availableCopies: 24,
      shelfLocation: 'Rack B-02',
    },
    {
      title: 'Vedic Mathematics & Arithmetic Sutras',
      isbn: '978-8120801646',
      author: 'Swami Bharati Krishna Tirtha',
      publisher: 'Motilal Banarsidass',
      category: 'General',
      totalCopies: 20,
      availableCopies: 12,
      shelfLocation: 'Rack C-01',
    },
  ]);

  // 18. Seed Transport Fleet
  console.log('🚌 18. Seeding Transport Fleet & Routes...');
  await VehicleModel.deleteMany({});
  const bus1 = await VehicleModel.create({
    registrationNumber: 'UP-76-T-1201',
    vehicleModel: 'Tata Starbus 42-Seater',
    capacity: 42,
    driverName: 'Shri Ramakant Yadav',
    driverPhone: '+91 9451234701',
    driverLicenseNumber: 'UP76-2018-DL-0891',
    status: 'active',
  });

  const bus2 = await VehicleModel.create({
    registrationNumber: 'UP-76-T-1202',
    vehicleModel: 'Eicher Skyline 40-Seater',
    capacity: 40,
    driverName: 'Shri Surendra Kumar',
    driverPhone: '+91 9451234702',
    driverLicenseNumber: 'UP76-2019-DL-0452',
    status: 'active',
  });

  await RouteModel.deleteMany({});
  await RouteModel.create({
    routeName: 'Route 1 (Shamsabad Highway)',
    vehicleId: bus1._id,
    startPoint: 'Shamsabad Bus Stand',
    endPoint: 'SGM Campus Shamsabad',
    stops: [
      { stopName: 'Shamsabad Bus Stand', pickupTime: '07:30 AM', dropTime: '02:30 PM', monthlyFee: 600 },
      { stopName: 'Mandi Samiti Chauraha', pickupTime: '07:45 AM', dropTime: '02:45 PM', monthlyFee: 700 },
      { stopName: 'Highway Bypass Junction', pickupTime: '08:00 AM', dropTime: '03:00 PM', monthlyFee: 800 },
    ],
    status: 'active',
  });

  await RouteModel.create({
    routeName: 'Route 2 (Kaimganj Sector)',
    vehicleId: bus2._id,
    startPoint: 'Kaimganj Station',
    endPoint: 'SGM Campus Shamsabad',
    stops: [
      { stopName: 'Kaimganj Railway Station', pickupTime: '07:15 AM', dropTime: '02:45 PM', monthlyFee: 750 },
      { stopName: 'Subhash Chowk', pickupTime: '07:35 AM', dropTime: '03:05 PM', monthlyFee: 800 },
      { stopName: 'Toll Plaza', pickupTime: '07:55 AM', dropTime: '03:20 PM', monthlyFee: 850 },
    ],
    status: 'active',
  });

  console.log('🎉 100% Comprehensive Database Seed Complete for MongoDB Atlas!');
  await mongoose.disconnect();
}

if (process.argv[1]?.endsWith('seed.ts')) {
  seedDatabase().catch((err) => {
    console.error('❌ Seed error:', err);
    process.exit(1);
  });
}
