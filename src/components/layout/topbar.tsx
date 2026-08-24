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
    { role: 'Super Admin (Full Access)', name: 'SuperAdmin', email: 'superadmin@sarswati.edu', pass: 'Admin@123' },
    { role: 'School Admin', name: 'Admin', email: 'admin@sarswati.edu', pass: 'Admin@123' },
    { role: 'Principal (Dr. Ramesh Sharma)', name: 'Principal', email: 'principal@sarswati.edu', pass: 'Principal@123' },
    { role: 'Teacher (Dinesh Gupta)', name: 'Teacher', email: 'teacher@sarswati.edu', pass: 'Teacher@123' },
    { role: 'Student (Aarav Sharma)', name: 'Student', email: 'student@sarswati.edu', pass: 'Student@123' },
    { role: 'Parent (Rajesh Sharma)', name: 'Parent', email: 'parent@sarswati.edu', pass: 'Parent@123' },
    { role: 'Accountant (Manoj Mishra)', name: 'Accountant', email: 'accountant@sarswati.edu', pass: 'Account@123' },
    { role: 'Librarian (Geeta Dixit)', name: 'Librarian', email: 'librarian@sarswati.edu', pass: 'Library@123' },
    { role: 'Admission Staff (Pooja Verma)', name: 'Admission', email: 'admission@sarswati.edu', pass: 'Admission@123' },
  ];

  return (
    <header className="h-14 sm:h-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-3 sm:px-8 flex items-center justify-between flex-shrink-0 z-20 shadow-sm sticky top-0">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            aria-label="Toggle Menu"
            className="lg:hidden p-1.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition flex-shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Session Indicator Badge (Clean single-line on all screens) */}
        <div className="flex items-center gap-1.5 bg-blue-50/90 text-blue-900 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold border border-blue-200/60 shadow-sm flex-shrink-0 whitespace-nowrap">
          <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600 flex-shrink-0" />
          <span>
            <span className="hidden sm:inline">Session: </span>2026-27
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>

        <Link
          href="/"
          target="_blank"
          className="hidden md:flex items-center gap-1.5 text-xs text-slate-600 hover:text-blue-600 font-semibold px-3 py-1.5 rounded-lg hover:bg-slate-100 transition"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Website</span>
        </Link>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
        {/* Dynamic Role Switcher Button */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl transition shadow-sm whitespace-nowrap border border-slate-700"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="truncate max-w-[110px] sm:max-w-none">{user?.role || 'SuperAdmin'}</span>
            <ChevronDown className="w-3 h-3 text-slate-400 flex-shrink-0" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 py-2 border-b border-slate-100 text-[10px] sm:text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
                Switch Active Role
              </div>
              <div className="max-h-72 overflow-y-auto py-1 divide-y divide-slate-50">
                {demoRoles.map((r) => (
                  <button
                    key={r.role}
                    onClick={async () => {
                      setShowRoleMenu(false);
                      await quickLoginAs(r.email, r.pass);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs flex items-center justify-between text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition"
                  >
                    <span className="font-semibold truncate">{r.role}</span>
                    {user?.email === r.email && (
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 ml-1" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={logout}
          title="Sign out of ERP"
          className="p-1.5 sm:p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
