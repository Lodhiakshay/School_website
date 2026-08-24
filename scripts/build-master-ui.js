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
  console.log('Generated:', relPath);
}

// ==========================================
// 1. RESPONSIVE SIDEBAR & TOPBAR & LAYOUT
// ==========================================
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
  X,
} from 'lucide-react';
import { useAuth } from '../../lib/auth-context';
import { cn } from '../../lib/utils';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen = false, onCloseMobile }) => {
  const pathname = usePathname();
  const { user } = useAuth();
  const role = user?.role || 'Admin';

  const getNavGroups = () => {
    switch (role) {
      case 'SuperAdmin':
      case 'Admin':
        return [
          {
            groupTitle: 'Operations & Management',
            items: [
              { label: 'Admin Dashboard', href: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
              { label: 'School Profile & CMS', href: '/admin/school-settings', icon: <Settings className="w-4 h-4" /> },
              { label: 'Academic Sessions', href: '/admin/academic-years', icon: <CalendarCheck className="w-4 h-4" /> },
              { label: 'Classes & Sections', href: '/admin/classes', icon: <Layers className="w-4 h-4" /> },
              { label: 'Subjects Catalog', href: '/admin/subjects', icon: <BookMarked className="w-4 h-4" /> },
            ],
          },
          {
            groupTitle: 'People & Rosters',
            items: [
              { label: 'Student SIS Directory', href: '/admin/students', icon: <GraduationCap className="w-4 h-4" /> },
              { label: 'Parents & Guardians', href: '/admin/parents', icon: <Users className="w-4 h-4" /> },
              { label: 'Faculty & Teachers', href: '/admin/teachers', icon: <UserCheck className="w-4 h-4" /> },
              { label: 'User Roles & Access', href: '/admin/users', icon: <UserCircle className="w-4 h-4" /> },
            ],
          },
          {
            groupTitle: 'Academics & Daily Routine',
            items: [
              { label: 'Attendance Telemetry', href: '/admin/attendance', icon: <CalendarCheck className="w-4 h-4" /> },
              { label: 'Timetable Schedules', href: '/admin/timetable', icon: <Clock className="w-4 h-4" /> },
              { label: 'Homework & LMS', href: '/admin/homework', icon: <BookOpen className="w-4 h-4" /> },
              { label: 'Noticeboard & Circulars', href: '/admin/notices', icon: <Bell className="w-4 h-4" /> },
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
            groupTitle: 'Finance & Infrastructure',
            items: [
              { label: 'Fees & POS Invoicing', href: '/admin/fees', icon: <CreditCard className="w-4 h-4" /> },
              { label: 'Admissions Pipeline', href: '/admin/admissions', icon: <UserPlus className="w-4 h-4" /> },
              { label: 'Central Library', href: '/admin/library', icon: <Library className="w-4 h-4" /> },
              { label: 'Transport & Fleet', href: '/admin/transport', icon: <Bus className="w-4 h-4" /> },
              { label: 'Certificates (TC/Bonafide)', href: '/admin/certificates', icon: <FileCheck2 className="w-4 h-4" /> },
              { label: 'Document Vault', href: '/admin/documents', icon: <FolderLock className="w-4 h-4" /> },
              { label: 'Master Reports & Ledgers', href: '/admin/reports', icon: <BarChart3 className="w-4 h-4" /> },
              { label: 'Security Audit Logs', href: '/admin/audit-logs', icon: <ShieldAlert className="w-4 h-4" /> },
            ],
          },
        ];

      case 'Principal':
        return [
          {
            groupTitle: 'Principal Governance',
            items: [
              { label: 'Principal Overview', href: '/principal', icon: <LayoutDashboard className="w-4 h-4" /> },
              { label: 'Classes & Sections', href: '/admin/classes', icon: <Layers className="w-4 h-4" /> },
              { label: 'Student Directory', href: '/admin/students', icon: <GraduationCap className="w-4 h-4" /> },
              { label: 'Faculty Roster', href: '/admin/teachers', icon: <UserCheck className="w-4 h-4" /> },
              { label: 'Daily Attendance Audit', href: '/admin/attendance', icon: <CalendarCheck className="w-4 h-4" /> },
              { label: 'Exam Results Approval', href: '/admin/results', icon: <Award className="w-4 h-4" /> },
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
              { label: 'Mark Class Attendance', href: '/teacher/attendance', icon: <CalendarCheck className="w-4 h-4" /> },
              { label: 'Weekly Timetable', href: '/teacher/timetable', icon: <Clock className="w-4 h-4" /> },
              { label: 'Homework & LMS', href: '/teacher/homework', icon: <BookOpen className="w-4 h-4" /> },
              { label: 'Enter Exam Marks', href: '/teacher/marks', icon: <Award className="w-4 h-4" /> },
              { label: 'Staff Notices', href: '/teacher/notices', icon: <Bell className="w-4 h-4" /> },
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
              { label: 'Attendance Record', href: '/student/attendance', icon: <CalendarCheck className="w-4 h-4" /> },
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
              { label: 'Exam Report Cards', href: '/parent/results', icon: <Award className="w-4 h-4" /> },
              { label: 'Fee Vouchers & Receipts', href: '/parent/fees', icon: <CreditCard className="w-4 h-4" /> },
            ],
          },
        ];

      case 'Accountant':
        return [
          {
            groupTitle: 'Accounts Desk',
            items: [
              { label: 'Financial Dashboard', href: '/accountant', icon: <LayoutDashboard className="w-4 h-4" /> },
              { label: 'Fee Collection POS', href: '/accountant/collect', icon: <CreditCard className="w-4 h-4" /> },
              { label: 'Fee Invoices Master', href: '/admin/fees', icon: <Receipt className="w-4 h-4" /> },
              { label: 'Student Directory', href: '/admin/students', icon: <GraduationCap className="w-4 h-4" /> },
              { label: 'Financial Reports', href: '/admin/reports', icon: <BarChart3 className="w-4 h-4" /> },
            ],
          },
        ];

      case 'Librarian':
        return [
          {
            groupTitle: 'Library Circulation',
            items: [
              { label: 'Library Overview', href: '/librarian', icon: <LayoutDashboard className="w-4 h-4" /> },
              { label: 'Book Catalog', href: '/admin/library', icon: <Library className="w-4 h-4" /> },
              { label: 'Students Search', href: '/admin/students', icon: <GraduationCap className="w-4 h-4" /> },
            ],
          },
        ];

      case 'AdmissionStaff':
        return [
          {
            groupTitle: 'Admissions Desk',
            items: [
              { label: 'Admissions Desk', href: '/admission', icon: <LayoutDashboard className="w-4 h-4" /> },
              { label: 'Inquiries Pipeline', href: '/admin/admissions', icon: <UserPlus className="w-4 h-4" /> },
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
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
        ></div>
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 bg-slate-950 text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-800/80 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold shadow-lg shadow-blue-500/30">
              SGM
            </div>
            <div>
              <h1 className="text-xs font-black text-white tracking-wider uppercase">SARSWATI GYAN MANDIR</h1>
              <p className="text-[10px] text-blue-400 font-semibold tracking-widest uppercase">Shamsabad, Farrukhabad</p>
            </div>
          </div>
          {onCloseMobile && (
            <button onClick={onCloseMobile} className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {group.groupTitle && (
                <h4 className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2.5">
                  {group.groupTitle}
                </h4>
              )}
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onCloseMobile}
                    className={cn(
                      'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all',
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
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

        {/* User Card */}
        <div className="p-4 border-t border-slate-900 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-xs font-black text-blue-400">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate max-w-[130px]">{user?.name || 'Admin'}</p>
              <span className="inline-block text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                {user?.role || 'SuperAdmin'}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
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
  Menu,
} from 'lucide-react';
import { useAuth } from '../../lib/auth-context';
import { Badge } from '../ui/badge';

interface TopbarProps {
  onToggleMobileMenu?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleMobileMenu }) => {
  const { user, logout, quickLoginAs } = useAuth();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const demoRoles = [
    { role: 'Super Admin (Full Access)', email: 'superadmin@sarswati.edu', pass: 'Admin@123' },
    { role: 'School Admin', email: 'admin@sarswati.edu', pass: 'Admin@123' },
    { role: 'Principal (Dr. Ramesh Sharma)', email: 'principal@sarswati.edu', pass: 'Principal@123' },
    { role: 'Teacher (Dinesh Gupta)', email: 'teacher@sarswati.edu', pass: 'Teacher@123' },
    { role: 'Student (Aarav Sharma)', email: 'student@sarswati.edu', pass: 'Student@123' },
    { role: 'Parent (Rajesh Sharma)', email: 'parent@sarswati.edu', pass: 'Parent@123' },
    { role: 'Accountant (Manoj Mishra)', email: 'accountant@sarswati.edu', pass: 'Account@123' },
    { role: 'Librarian (Geeta Dixit)', email: 'librarian@sarswati.edu', pass: 'Library@123' },
    { role: 'Admission Staff (Pooja Verma)', email: 'admission@sarswati.edu', pass: 'Admission@123' },
  ];

  return (
    <header className="h-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between flex-shrink-0 z-20 shadow-sm sticky top-0">
      <div className="flex items-center gap-3">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-2 bg-blue-50/90 text-blue-900 px-3.5 py-1.5 rounded-full text-xs font-bold border border-blue-200/60 shadow-sm">
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
          <span>Session: 2026-2027</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>

        <Link
          href="/"
          target="_blank"
          className="hidden md:flex items-center gap-1.5 text-xs text-slate-600 hover:text-blue-600 font-semibold px-3 py-1.5 rounded-lg hover:bg-slate-100 transition"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>View Public Website</span>
        </Link>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Instant Role Switcher Modal Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl transition shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">1-Click Role Switcher</span>
            <span className="sm:hidden">Roles</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 py-2 border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
                Switch Portal Role
              </div>
              <div className="max-h-72 overflow-y-auto py-1">
                {demoRoles.map((r) => (
                  <button
                    key={r.role}
                    onClick={async () => {
                      setShowRoleMenu(false);
                      await quickLoginAs(r.email, r.pass);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs flex items-center justify-between text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition"
                  >
                    <span className="font-semibold">{r.role}</span>
                    {user?.email === r.email && <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <Badge variant="purple" size="md" className="hidden sm:inline-flex font-extrabold">
          {user?.role || 'Staff'}
        </Badge>

        <button
          onClick={logout}
          title="Sign out of ERP"
          className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
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

import React, { useEffect, useState } from 'react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <LoadingSpinner label="Securing your ERP session..." />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50">
      <Sidebar mobileOpen={mobileMenuOpen} onCloseMobile={() => setMobileMenuOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
};
`);

console.log('Layout system generated.');

