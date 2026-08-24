const fs = require('fs');
const path = require('path');

function ensureDir(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

function writeFile(relPath, content) {
  const fullPath = path.join(__dirname, '..', relPath);
  ensureDir(fullPath);
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');
  console.log('Wrote:', relPath);
}

// 1. Sidebar & Topbar & PortalLayout
writeFile('src/components/layout/sidebar.tsx', `
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  UserCheck,
  BookOpen,
  CalendarCheck,
  Clock,
  FileSpreadsheet,
  Award,
  CreditCard,
  UserPlus,
  Bell,
  Library,
  Bus,
  FileCheck2,
  BarChart3,
  ShieldAlert,
  Settings,
  FolderLock,
  Layers,
  BookMarked,
  Receipt,
  UserCircle,
} from 'lucide-react';
import { useAuth } from '../../lib/auth-context';
import { cn } from '../../lib/utils';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const role = user?.role || 'Admin';

  const getNavGroups = () => {
    switch (role) {
      case 'SuperAdmin':
      case 'Admin':
        return [
          {
            groupTitle: 'Core Operations',
            items: [
              { label: 'Admin Dashboard', href: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
              { label: 'School Settings', href: '/admin/school-settings', icon: <Settings className="w-4 h-4" /> },
              { label: 'Academic Years', href: '/admin/academic-years', icon: <CalendarCheck className="w-4 h-4" /> },
              { label: 'Classes & Sections', href: '/admin/classes', icon: <Layers className="w-4 h-4" /> },
              { label: 'Subjects Catalog', href: '/admin/subjects', icon: <BookMarked className="w-4 h-4" /> },
            ],
          },
          {
            groupTitle: 'People & Students',
            items: [
              { label: 'Student Directory', href: '/admin/students', icon: <GraduationCap className="w-4 h-4" /> },
              { label: 'Parents & Guardians', href: '/admin/parents', icon: <Users className="w-4 h-4" /> },
              { label: 'Faculty & Teachers', href: '/admin/teachers', icon: <UserCheck className="w-4 h-4" /> },
              { label: 'User Accounts & RBAC', href: '/admin/users', icon: <UserCircle className="w-4 h-4" /> },
            ],
          },
          {
            groupTitle: 'Daily Operations',
            items: [
              { label: 'Daily Attendance', href: '/admin/attendance', icon: <CalendarCheck className="w-4 h-4" /> },
              { label: 'Class Timetables', href: '/admin/timetable', icon: <Clock className="w-4 h-4" /> },
              { label: 'Homework & LMS', href: '/admin/homework', icon: <BookOpen className="w-4 h-4" /> },
              { label: 'Noticeboard & Alerts', href: '/admin/notices', icon: <Bell className="w-4 h-4" /> },
            ],
          },
          {
            groupTitle: 'Exams & Performance',
            items: [
              { label: 'Examinations', href: '/admin/exams', icon: <FileSpreadsheet className="w-4 h-4" /> },
              { label: 'Results & Report Cards', href: '/admin/results', icon: <Award className="w-4 h-4" /> },
            ],
          },
          {
            groupTitle: 'Finance & Administration',
            items: [
              { label: 'Fees & Invoicing', href: '/admin/fees', icon: <CreditCard className="w-4 h-4" /> },
              { label: 'Admissions Desk', href: '/admin/admissions', icon: <UserPlus className="w-4 h-4" /> },
              { label: 'Library Management', href: '/admin/library', icon: <Library className="w-4 h-4" /> },
              { label: 'Transport & Buses', href: '/admin/transport', icon: <Bus className="w-4 h-4" /> },
              { label: 'Certificates (TC/Bonafide)', href: '/admin/certificates', icon: <FileCheck2 className="w-4 h-4" /> },
              { label: 'Document Vault', href: '/admin/documents', icon: <FolderLock className="w-4 h-4" /> },
              { label: 'Central Reports', href: '/admin/reports', icon: <BarChart3 className="w-4 h-4" /> },
              { label: 'Audit Security Logs', href: '/admin/audit-logs', icon: <ShieldAlert className="w-4 h-4" /> },
            ],
          },
        ];

      case 'Principal':
        return [
          {
            groupTitle: 'Academic Supervision',
            items: [
              { label: 'Principal Overview', href: '/principal', icon: <LayoutDashboard className="w-4 h-4" /> },
              { label: 'Academic Classes', href: '/admin/classes', icon: <Layers className="w-4 h-4" /> },
              { label: 'Students Roster', href: '/admin/students', icon: <GraduationCap className="w-4 h-4" /> },
              { label: 'Teachers Faculty', href: '/admin/teachers', icon: <UserCheck className="w-4 h-4" /> },
              { label: 'Attendance Audit', href: '/admin/attendance', icon: <CalendarCheck className="w-4 h-4" /> },
              { label: 'Exam Result Approvals', href: '/admin/results', icon: <Award className="w-4 h-4" /> },
              { label: 'School Notices', href: '/admin/notices', icon: <Bell className="w-4 h-4" /> },
              { label: 'Academic Reports', href: '/admin/reports', icon: <BarChart3 className="w-4 h-4" /> },
            ],
          },
        ];

      case 'Teacher':
        return [
          {
            groupTitle: 'Teacher Workspace',
            items: [
              { label: 'Teacher Dashboard', href: '/teacher', icon: <LayoutDashboard className="w-4 h-4" /> },
              { label: 'Class Attendance Marker', href: '/teacher/attendance', icon: <CalendarCheck className="w-4 h-4" /> },
              { label: 'Weekly Timetable', href: '/teacher/timetable', icon: <Clock className="w-4 h-4" /> },
              { label: 'Homework & Material', href: '/teacher/homework', icon: <BookOpen className="w-4 h-4" /> },
              { label: 'Enter Exam Marks', href: '/teacher/marks', icon: <Award className="w-4 h-4" /> },
              { label: 'Noticeboard', href: '/teacher/notices', icon: <Bell className="w-4 h-4" /> },
            ],
          },
        ];

      case 'Student':
        return [
          {
            groupTitle: 'Student Portal',
            items: [
              { label: 'My Dashboard', href: '/student', icon: <LayoutDashboard className="w-4 h-4" /> },
              { label: 'Class Timetable', href: '/student/timetable', icon: <Clock className="w-4 h-4" /> },
              { label: 'My Attendance', href: '/student/attendance', icon: <CalendarCheck className="w-4 h-4" /> },
              { label: 'Homework & Tasks', href: '/student/homework', icon: <BookOpen className="w-4 h-4" /> },
              { label: 'Report Cards & Marks', href: '/student/results', icon: <Award className="w-4 h-4" /> },
              { label: 'Fee Dues & Receipts', href: '/student/fees', icon: <Receipt className="w-4 h-4" /> },
              { label: 'Notices & Circulars', href: '/student/notices', icon: <Bell className="w-4 h-4" /> },
            ],
          },
        ];

      case 'Parent':
        return [
          {
            groupTitle: 'Parent Portal',
            items: [
              { label: 'Children Overview', href: '/parent', icon: <LayoutDashboard className="w-4 h-4" /> },
              { label: 'Child Attendance', href: '/parent/attendance', icon: <CalendarCheck className="w-4 h-4" /> },
              { label: 'Weekly Timetable', href: '/parent/timetable', icon: <Clock className="w-4 h-4" /> },
              { label: 'Homework Tracker', href: '/parent/homework', icon: <BookOpen className="w-4 h-4" /> },
              { label: 'Exam Report Cards', href: '/parent/results', icon: <Award className="w-4 h-4" /> },
              { label: 'Pay Fees & Receipts', href: '/parent/fees', icon: <CreditCard className="w-4 h-4" /> },
              { label: 'School Notices', href: '/parent/notices', icon: <Bell className="w-4 h-4" /> },
            ],
          },
        ];

      case 'Accountant':
        return [
          {
            groupTitle: 'Accountant Desk',
            items: [
              { label: 'Financial Dashboard', href: '/accountant', icon: <LayoutDashboard className="w-4 h-4" /> },
              { label: 'Fee Collection POS', href: '/accountant/collect', icon: <CreditCard className="w-4 h-4" /> },
              { label: 'Fee Invoices', href: '/admin/fees', icon: <Receipt className="w-4 h-4" /> },
              { label: 'Student Directory', href: '/admin/students', icon: <GraduationCap className="w-4 h-4" /> },
              { label: 'Financial Ledgers', href: '/admin/reports', icon: <BarChart3 className="w-4 h-4" /> },
            ],
          },
        ];

      case 'Librarian':
        return [
          {
            groupTitle: 'Library Desk',
            items: [
              { label: 'Library Dashboard', href: '/librarian', icon: <LayoutDashboard className="w-4 h-4" /> },
              { label: 'Book Inventory', href: '/admin/library', icon: <Library className="w-4 h-4" /> },
              { label: 'Students Search', href: '/admin/students', icon: <GraduationCap className="w-4 h-4" /> },
            ],
          },
        ];

      case 'AdmissionStaff':
        return [
          {
            groupTitle: 'Admission Desk',
            items: [
              { label: 'Admissions Pipeline', href: '/admission', icon: <LayoutDashboard className="w-4 h-4" /> },
              { label: 'All Inquiries', href: '/admin/admissions', icon: <UserPlus className="w-4 h-4" /> },
              { label: 'Enrolled Students', href: '/admin/students', icon: <GraduationCap className="w-4 h-4" /> },
            ],
          },
        ];

      default:
        return [
          {
            groupTitle: 'Navigation',
            items: [{ label: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> }],
          },
        ];
    }
  };

  const navGroups = getNavGroups();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col flex-shrink-0 border-r border-slate-800 select-none">
      <div className="h-16 px-5 flex items-center gap-3 border-b border-slate-800/80 bg-slate-950/50">
        <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
          SGM
        </div>
        <div className="overflow-hidden">
          <h1 className="text-xs font-bold text-white tracking-wide truncate">SARSWATI GYAN MANDIR</h1>
          <p className="text-[10px] text-blue-400 font-medium tracking-wider uppercase">Shamsabad, Farrukhabad</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {group.groupTitle && (
              <h4 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                {group.groupTitle}
              </h4>
            )}
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors',
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  )}
                >
                  <span className={cn(isActive ? 'text-white' : 'text-slate-400')}>{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-blue-400">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-white truncate max-w-[120px]">{user?.name || 'User'}</p>
            <span className="inline-block text-[10px] text-blue-400 font-medium uppercase">{user?.role || 'Staff'}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
`);

writeFile('src/components/layout/topbar.tsx', `
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  LogOut,
  ChevronDown,
  Globe,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../lib/auth-context';
import { Badge } from '../ui/badge';

export const Topbar: React.FC = () => {
  const { user, logout, quickLoginAs } = useAuth();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const demoRoles = [
    { role: 'Super Admin', email: 'superadmin@sarswati.edu', pass: 'Admin@123' },
    { role: 'School Admin', email: 'admin@sarswati.edu', pass: 'Admin@123' },
    { role: 'Principal', email: 'principal@sarswati.edu', pass: 'Principal@123' },
    { role: 'Teacher', email: 'teacher@sarswati.edu', pass: 'Teacher@123' },
    { role: 'Student (Aarav)', email: 'student@sarswati.edu', pass: 'Student@123' },
    { role: 'Parent (Rajesh)', email: 'parent@sarswati.edu', pass: 'Parent@123' },
    { role: 'Accountant', email: 'accountant@sarswati.edu', pass: 'Account@123' },
    { role: 'Librarian', email: 'librarian@sarswati.edu', pass: 'Library@123' },
    { role: 'Admission Staff', email: 'admission@sarswati.edu', pass: 'Admission@123' },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between flex-shrink-0 z-10 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-blue-50/80 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold border border-blue-100">
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
          <span>Session: 2026-2027</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>

        <Link
          href="/"
          target="_blank"
          className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 font-medium px-2.5 py-1 rounded-lg hover:bg-slate-50 transition"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Public Website</span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-1.5 text-xs font-medium bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Switch Portal</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Instant Role Switcher
              </div>
              <div className="max-h-64 overflow-y-auto py-1">
                {demoRoles.map((r) => (
                  <button
                    key={r.role}
                    onClick={async () => {
                      setShowRoleMenu(false);
                      await quickLoginAs(r.email, r.pass);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs flex items-center justify-between text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition"
                  >
                    <span className="font-medium">{r.role}</span>
                    {user?.email === r.email && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition cursor-pointer">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full"></span>
        </div>

        <Badge variant="info" size="sm">
          {user?.role || 'Staff'}
        </Badge>

        <button
          onClick={logout}
          title="Sign out of ERP"
          className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
`);

writeFile('src/components/layout/portal-layout.tsx', `
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';
import { useAuth } from '../../lib/auth-context';
import { LoadingSpinner } from '../ui/loading-spinner';

export interface PortalLayoutProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export const PortalLayout: React.FC<PortalLayoutProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <LoadingSpinner label="Authenticating your ERP portal session..." />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
};
`);

console.log('Layout written.');

