'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LogIn,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Lock,
} from 'lucide-react';
import { useAuth } from '../../lib/auth-context';
import { useToast } from '../../components/ui/toast';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function LoginPage() {
  const { login, quickLoginAs } = useAuth();
  const { toast } = useToast();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const demoAccounts = [
    { role: 'Super Admin', email: 'superadmin@sarswati.edu', pass: 'Admin@123', desc: 'Full System Control & Configuration' },
    { role: 'School Admin', email: 'admin@sarswati.edu', pass: 'Admin@123', desc: 'Master Management Hub' },
    { role: 'Principal', email: 'principal@sarswati.edu', pass: 'Principal@123', desc: 'Academic & Exam Approvals' },
    { role: 'Teacher', email: 'teacher@sarswati.edu', pass: 'Teacher@123', desc: 'Attendance, Homework & Marks' },
    { role: 'Student (Aarav)', email: 'student@sarswati.edu', pass: 'Student@123', desc: 'Results, Timetable, Dues' },
    { role: 'Parent (Rajesh)', email: 'parent@sarswati.edu', pass: 'Parent@123', desc: 'Multi-Child Monitor & Fee POS' },
    { role: 'Accountant', email: 'accountant@sarswati.edu', pass: 'Account@123', desc: 'POS Collection & Ledgers' },
    { role: 'Librarian', email: 'librarian@sarswati.edu', pass: 'Library@123', desc: 'Books Catalog & Circulation' },
    { role: 'Admission Staff', email: 'admission@sarswati.edu', pass: 'Admission@123', desc: 'Inquiries & Student Enrollment' },
  ];

  const handleStandardLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const user = await login(identifier, password);
      const displayName = (user as any).firstName || user.name || 'User';
      toast.success(`Welcome back, ${displayName}! Redirecting to your dashboard...`, 'Sign In Successful');
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Invalid email or password. Please try again.';
      setErrorMsg(msg);
      toast.error(msg, 'Authentication Notice');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (email: string, pass: string) => {
    setIsLoading(true);
    setErrorMsg(null);
    setIdentifier(email);
    setPassword(pass);
    try {
      const user = await quickLoginAs(email, pass);
      const displayName = (user as any).firstName ? `${(user as any).firstName} ${(user as any).lastName || ''}` : user.name || user.role;
      toast.success(`Logged in as ${user.role} (${displayName})`, 'Demo Access Granted');
    } catch (err: any) {
      toast.error('Could not authenticate demo session.', 'Login Notice');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100 font-sans">
      {/* Top Header with Curved Screen Safe Padding */}
      <div className="p-3.5 sm:p-6 max-w-7xl mx-auto w-full flex items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-amber-400 bg-white p-0.5 shadow-lg flex-shrink-0">
            <img src="/logo.png" alt="SGM Logo" className="w-full h-full object-contain" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xs sm:text-sm font-black text-white tracking-wide uppercase font-serif truncate">
              सरस्वती ज्ञान मन्दिर
            </h1>
            <p className="text-[8px] sm:text-[10px] text-amber-300 font-bold uppercase tracking-wider truncate">
              शमसाबाद • फर्रुखाबाद
            </p>
          </div>
        </Link>
        <Link
          href="/"
          className="text-[11px] sm:text-xs text-slate-300 hover:text-white transition font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full border border-white/15 whitespace-nowrap flex-shrink-0"
        >
          &larr; Back
        </Link>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 py-4 sm:py-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start sm:items-center">
        {/* Left Login Form Card */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl backdrop-blur-xl space-y-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-300 bg-amber-500/10 px-3 py-0.5 rounded-full border border-amber-500/20 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Single Sign-On • Sarswati ERP
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight font-serif">
              ERP Portal Sign In
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-400">
              Enter credentials or choose an instant 1-click role.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 font-medium flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleStandardLogin} className="space-y-3.5">
            <Input
              label="Email or Username"
              required
              placeholder="admin@sarswati.edu"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              size="lg"
              className="w-full mt-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-extrabold shadow-lg shadow-blue-600/30 text-xs sm:text-sm"
              isLoading={isLoading}
              leftIcon={<LogIn className="w-4 h-4" />}
            >
              Sign In to ERP Portal
            </Button>
          </form>
        </div>

        {/* Right 1-Click Instant Demo Login Grid */}
        <div className="lg:col-span-6 space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-white">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <h3 className="text-xs sm:text-sm font-black tracking-wide uppercase">
                1-Click Instant Demo Roles
              </h3>
            </div>
            <span className="text-[9px] text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
              Live Testing
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {demoAccounts.map((acc) => (
              <button
                key={acc.role}
                type="button"
                onClick={() => handleQuickLogin(acc.email, acc.pass)}
                disabled={isLoading}
                className="text-left p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-900/80 hover:bg-blue-900/30 border border-slate-800 hover:border-blue-500/50 transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white group-hover:text-blue-300 transition">
                      {acc.role}
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1 font-medium">{acc.desc}</p>
                </div>
                <div className="mt-1.5 text-[9px] sm:text-[10px] font-mono text-amber-300/80 truncate">
                  {acc.email}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3.5 text-center text-[10px] text-slate-500 border-t border-slate-900">
        &copy; {new Date().getFullYear()} Sarswati Gyan Mandir Intermediate College • Shamsabad, Farrukhabad
      </div>
    </div>
  );
}
