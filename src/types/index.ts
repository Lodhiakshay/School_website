export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: 'SuperAdmin' | 'Admin' | 'Principal' | 'Teacher' | 'Student' | 'Parent' | 'Accountant' | 'Librarian' | 'AdmissionStaff';
  avatar?: string;
  status: 'active' | 'inactive' | 'suspended' | 'archived';
  permissions: string[];
  entityId?: string;
}

export interface AcademicYear {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  status: 'upcoming' | 'active' | 'closed';
}

export interface ClassItem {
  _id: string;
  name: string;
  code: string;
  orderIndex: number;
  description?: string;
  sections?: SectionItem[];
}

export interface SectionItem {
  _id: string;
  name: string;
  classId: string | ClassItem;
  academicYearId?: string;
  classTeacherId?: any;
  roomNumber?: string;
  capacity: number;
}

export interface SubjectItem {
  _id: string;
  name: string;
  code: string;
  classId: string | ClassItem;
  type: 'theory' | 'practical' | 'both';
  maxMarks: number;
  passingMarks: number;
  creditHours?: number;
}

export interface Student {
  _id: string;
  userId?: string;
  admissionNumber: string;
  studentId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: 'male' | 'female' | 'other';
  dob: string;
  bloodGroup?: string;
  nationality: string;
  category?: string;
  religion?: string;
  admissionDate: string;
  previousSchool?: string;
  parentId?: any;
  currentClassId?: any;
  currentSectionId?: any;
  currentRollNumber?: number;
  status: 'active' | 'alumni' | 'transferred' | 'suspended' | 'archived';
}

export interface Teacher {
  _id: string;
  userId?: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  department: string;
  designation: string;
  qualification: string;
  assignedSubjects: SubjectItem[];
  assignedSections: SectionItem[];
  status: 'active' | 'on_leave' | 'resigned' | 'retired';
}

export interface FeeInvoice {
  _id: string;
  invoiceNumber: string;
  studentId: any;
  classId: any;
  sectionId: any;
  title: string;
  items: Array<{
    categoryName: string;
    amount: number;
    discount: number;
    finalAmount: number;
  }>;
  subtotal: number;
  totalDiscount: number;
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  dueDate: string;
  status: 'unpaid' | 'partially_paid' | 'paid' | 'overdue' | 'cancelled';
  createdAt: string;
}
