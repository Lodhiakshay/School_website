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
