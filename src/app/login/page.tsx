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
} from 'lucide-react';
import { useAuth } from '../../lib/auth-context';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function LoginPage() {
  const { login, quickLoginAs } = useAuth();
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
      await login(identifier, password);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Invalid credentials');
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
      await quickLoginAs(email, pass);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Quick login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100">
      <div className="p-6 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500/60 bg-white shadow-lg flex-shrink-0">
            <img src="/logo.png" alt="SGM Logo" className="w-full h-full object-contain p-0.5" />
          </div>
          <div>
            <h1 className="text-sm font-black text-white tracking-wide uppercase font-serif">सरस्वती ज्ञान मन्दिर</h1>
            <p className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Shamsabad, Farrukhabad (UP)</p>
          </div>
        </Link>
        <Link href="/" className="text-xs text-slate-400 hover:text-white transition font-bold">
          &larr; Back to Public Website
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-md space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Single Sign-On Portal • Sarswati ERP
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-serif">ERP Portal Sign In</h2>
            <p className="text-xs text-slate-400">
              Enter your credentials or click any demo role on the right.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleStandardLogin} className="space-y-4">
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
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 font-extrabold shadow-lg shadow-blue-600/30"
              isLoading={isLoading}
              leftIcon={<LogIn className="w-4 h-4" />}
            >
              Sign In to ERP Portal
            </Button>
          </form>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-white">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-black tracking-wide uppercase">1-Click Instant Demo Login</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {demoAccounts.map((acc) => (
              <button
                key={acc.role}
                type="button"
                onClick={() => handleQuickLogin(acc.email, acc.pass)}
                disabled={isLoading}
                className="text-left p-3.5 rounded-2xl bg-slate-900 hover:bg-blue-900/30 border border-slate-800 hover:border-blue-500/50 transition group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white group-hover:text-blue-300 transition">
                      {acc.role}
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-blue-400 transition" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{acc.desc}</p>
                </div>
                <div className="mt-2 text-[10px] font-mono text-amber-400/80 truncate">
                  {acc.email}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
