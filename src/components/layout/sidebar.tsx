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
  Image as ImageIcon,
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
              { label: 'Campus Media Gallery', href: '/admin/gallery', icon: <ImageIcon className="w-4 h-4" /> },
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
        {/* Brand Header with School Logo */}
        <div className="h-20 px-4 flex items-center justify-between border-b border-slate-800/80 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500/50 bg-white flex-shrink-0 shadow-lg">
              <img src="/logo.png" alt="SGM Logo" className="w-full h-full object-contain p-0.5" />
            </div>
            <div>
              <h1 className="text-xs font-black text-white tracking-wide uppercase font-serif">
                सरस्वती ज्ञान मन्दिर
              </h1>
              <p className="text-[10px] text-amber-400 font-bold tracking-wider uppercase">
                Shamsabad, Farrukhabad
              </p>
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
