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

// 1. Root Layout
writeFile('src/app/layout.tsx', `
import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '../lib/auth-context';
import { QueryProvider } from '../lib/query-provider';

export const metadata: Metadata = {
  title: 'Sarswati Gyan Mandir | Intermediate College & School ERP',
  description:
    'Sarswati Gyan Mandir, Shamsabad Farrukhabad UP - A premier intermediate school providing holistic education and centralized school information portal.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased text-slate-900 bg-slate-50 min-h-screen">
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
`);

// 2. Public Components
writeFile('src/components/public/public-navbar.tsx', `
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Mail, MapPin, Menu, X, GraduationCap, LogIn, Send } from 'lucide-react';
import { Button } from '../ui/button';

export const PublicNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Principal Message', href: '/principal-message' },
    { label: 'Academics', href: '/academics' },
    { label: 'Faculty', href: '/faculty' },
    { label: 'Facilities', href: '/facilities' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'News & Events', href: '/news' },
    { label: 'Admissions', href: '/admissions' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="bg-slate-900 text-slate-300 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              Main Road, Shamsabad, Farrukhabad, UP (209503)
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              +91 9876543210
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="bg-emerald-600/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
              Admissions Open 2026-2027
            </span>
            <Link href="/admissions" className="text-blue-300 hover:text-white font-medium underline">
              Apply Online
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
              SARSWATI GYAN MANDIR
            </h1>
            <p className="text-[11px] text-slate-500 font-medium tracking-wide">
              Intermediate College, Shamsabad, Farrukhabad (UP)
            </p>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={\`text-xs font-semibold tracking-wide transition-colors \${
                  isActive ? 'text-blue-600 font-bold border-b-2 border-blue-600 pb-0.5' : 'text-slate-600 hover:text-blue-600'
                }\`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          <Link href="/login">
            <Button size="sm" variant="outline" leftIcon={<LogIn className="w-3.5 h-3.5" />}>
              ERP Portal
            </Button>
          </Link>
          <Link href="/admissions">
            <Button size="sm" variant="primary" leftIcon={<Send className="w-3.5 h-3.5" />}>
              Online Admission
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-2">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full" variant="outline" leftIcon={<LogIn className="w-4 h-4" />}>
                ERP Portal Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
`);

writeFile('src/components/public/public-footer.tsx', `
import React from 'react';
import Link from 'next/link';
import { GraduationCap, Phone, Mail, MapPin, Clock, ShieldCheck, BookOpen } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">SARSWATI GYAN MANDIR</h3>
              <p className="text-[11px] text-blue-400 font-medium">Intermediate College</p>
            </div>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Established with a commitment to nurturing intellectual brilliance, moral values, and cultural pride in Shamsabad, Farrukhabad, Uttar Pradesh.
          </p>
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px]">Affiliation Code: UP-FBD-2026-SGM-089</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Quick Links
          </h4>
          <ul className="space-y-2.5">
            <li><Link href="/about" className="hover:text-blue-400 transition">About Our Heritage</Link></li>
            <li><Link href="/principal-message" className="hover:text-blue-400 transition">Principal Message</Link></li>
            <li><Link href="/academics" className="hover:text-blue-400 transition">Academic Curriculum</Link></li>
            <li><Link href="/faculty" className="hover:text-blue-400 transition">Our Faculty & Staff</Link></li>
            <li><Link href="/facilities" className="hover:text-blue-400 transition">Campus Facilities</Link></li>
            <li><Link href="/admissions" className="hover:text-blue-400 transition">Admissions 2026-27</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            ERP & Legal
          </h4>
          <ul className="space-y-2.5">
            <li><Link href="/login" className="text-blue-400 hover:underline font-semibold flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> Central ERP Login</Link></li>
            <li><Link href="/news" className="hover:text-blue-400 transition">Latest Circulars</Link></li>
            <li><Link href="/gallery" className="hover:text-blue-400 transition">Photo Gallery</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-blue-400 transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-blue-400 transition">Terms & Regulations</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Contact Institution
          </h4>
          <div className="space-y-3">
            <p className="flex items-start gap-2.5 text-slate-300">
              <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <span>Main Road, Near Bus Stand, Shamsabad, Farrukhabad, Uttar Pradesh, PIN: 209503</span>
            </p>
            <p className="flex items-center gap-2.5 text-slate-300">
              <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span>+91 9876543210</span>
            </p>
            <p className="flex items-center gap-2.5 text-slate-300">
              <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span>info@sarswatigyanmandir.edu.in</span>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-900 bg-slate-950 py-5 px-4 text-center text-[11px] text-slate-500">
        © 2026 Sarswati Gyan Mandir Intermediate College, Shamsabad, Farrukhabad (UP). All Rights Reserved.
      </div>
    </footer>
  );
};
`);

// 3. Homepage
writeFile('src/app/page.tsx', `
import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  BookOpen,
  Award,
  ShieldCheck,
  Building2,
  Calendar,
  ArrowRight,
  CheckCircle,
  Clock,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { PublicNavbar } from '../components/public/public-navbar';
import { PublicFooter } from '../components/public/public-footer';
import { Button } from '../components/ui/button';

export default function HomePage() {
  const academicWings = [
    {
      title: 'Pre-Primary & Primary Wing',
      grades: 'Nursery to Class 5',
      desc: 'Foundational literacy, playful learning, conceptual numeracy, and moral character nurturing in a joyful environment.',
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
    },
    {
      title: 'Middle School Wing',
      grades: 'Class 6 to Class 8',
      desc: 'Developing critical inquiry, laboratory science, languages (Hindi, English, Sanskrit), and mathematics foundation.',
      icon: <GraduationCap className="w-6 h-6 text-indigo-600" />,
    },
    {
      title: 'High School (UP Board)',
      grades: 'Class 9 & Class 10',
      desc: 'Rigorous board exam preparation, practical lab experiments, holistic continuous assessment and career guidance.',
      icon: <Award className="w-6 h-6 text-amber-600" />,
    },
    {
      title: 'Intermediate College Wing',
      grades: 'Class 11 & Class 12',
      desc: 'Specialized Science (Physics, Chemistry, Math/Bio) & Humanities streams with competitive examination mentoring.',
      icon: <Building2 className="w-6 h-6 text-emerald-600" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNavbar />

      <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Premier Intermediate College in Shamsabad, Farrukhabad</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Nurturing Wisdom, Character &amp; Academic Excellence
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Welcome to <strong className="text-white font-semibold">Sarswati Gyan Mandir</strong>. We empower young minds from Nursery to Class 12 with quality education, traditional Indian values, modern scientific temper, and digital readiness.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/admissions">
                  <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Admissions 2026-27
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="bg-slate-800/80 border-slate-700 text-white hover:bg-slate-800">
                    School ERP Portal Login
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-800/60 backdrop-blur-md rounded-2xl border border-slate-700/80 p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Admission Desk 2026-27</h3>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                  OPEN NOW
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Online registration for Nursery to Class 11 (Science &amp; Arts) is currently active.
              </p>

              <Link href="/admissions" className="block w-full">
                <Button className="w-full" variant="primary" size="md">
                  Submit Online Inquiry Form
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Holistic Curriculum
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Academic Wings &amp; Programs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {academicWings.map((w, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                    {w.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{w.title}</h3>
                    <span className="text-[11px] font-semibold text-blue-600">{w.grades}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{w.desc}</p>
                </div>
                <Link href="/academics" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                  Learn Details <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
`);

// 4. Login Page
writeFile('src/app/login/page.tsx', `
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  LogIn,
  ShieldCheck,
  User,
  Lock,
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
    <div className="min-h-screen flex flex-col justify-between bg-slate-900 text-slate-100">
      <div className="p-6 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide">SARSWATI GYAN MANDIR</h1>
            <p className="text-[10px] text-blue-400 font-medium">Shamsabad, Farrukhabad (UP)</p>
          </div>
        </Link>
        <Link href="/" className="text-xs text-slate-400 hover:text-white transition font-medium">
          ← Back to Public Website
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 bg-slate-800/90 border border-slate-700/80 rounded-2xl p-8 sm:p-10 shadow-2xl backdrop-blur-md space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Single Sign-On Portal
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">ERP Portal Sign In</h2>
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
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 font-bold"
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
              <h3 className="text-sm font-bold tracking-wide">1-Click Instant Demo Login</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {demoAccounts.map((acc) => (
              <button
                key={acc.role}
                type="button"
                onClick={() => handleQuickLogin(acc.email, acc.pass)}
                disabled={isLoading}
                className="text-left p-3 rounded-xl bg-slate-800/60 hover:bg-blue-600/20 border border-slate-700/70 hover:border-blue-500/50 transition group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white group-hover:text-blue-300 transition">
                      {acc.role}
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-blue-400 transition" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{acc.desc}</p>
                </div>
                <div className="mt-2 text-[10px] font-mono text-slate-500 truncate">
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
`);

// 5. Public Sub-pages
writeFile('src/app/about/page.tsx', `
import React from 'react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';
import { Target, Heart, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNavbar />
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Our Heritage &amp; Vision</h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Discover the legacy, values, and academic milestones of Sarswati Gyan Mandir in Shamsabad, Farrukhabad.
          </p>
        </div>
      </section>
      <section className="py-16 max-w-5xl mx-auto px-4 space-y-8 text-xs sm:text-sm text-slate-700">
        <p>Sarswati Gyan Mandir was founded with the singular vision of providing high-quality intermediate education in Farrukhabad, Uttar Pradesh.</p>
      </section>
      <PublicFooter />
    </div>
  );
}
`);

writeFile('src/app/principal-message/page.tsx', `
import React from 'react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';
import { Quote } from 'lucide-react';

export default function PrincipalMessagePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNavbar />
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Principal&apos;s Message</h1>
        </div>
      </section>
      <section className="py-16 max-w-4xl mx-auto px-4 space-y-6 text-xs sm:text-sm text-slate-700">
        <h2 className="text-lg font-bold text-slate-900">Dr. Ramesh Kumar Sharma</h2>
        <p>Welcome to Sarswati Gyan Mandir. We believe true education empowers character, intellect, and civic duty.</p>
      </section>
      <PublicFooter />
    </div>
  );
}
`);

writeFile('src/app/academics/page.tsx', `
import React from 'react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';

export default function AcademicsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNavbar />
      <section className="py-16 max-w-5xl mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Academic Curriculum</h1>
        <p className="text-xs sm:text-sm text-slate-600">Comprehensive UP State Board curriculum from Nursery to Class 12 (Science & Arts).</p>
      </section>
      <PublicFooter />
    </div>
  );
}
`);

writeFile('src/app/faculty/page.tsx', `
import React from 'react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';

export default function FacultyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNavbar />
      <section className="py-16 max-w-5xl mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Teaching Faculty</h1>
        <p className="text-xs sm:text-sm text-slate-600">Dedicated PGT & TGT educators with decades of mentoring excellence.</p>
      </section>
      <PublicFooter />
    </div>
  );
}
`);

writeFile('src/app/facilities/page.tsx', `
import React from 'react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNavbar />
      <section className="py-16 max-w-5xl mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Campus Facilities</h1>
        <p className="text-xs sm:text-sm text-slate-600">Physics, Chemistry, Biology & Computer Labs, Central Library, Sports grounds, and School Bus Fleet.</p>
      </section>
      <PublicFooter />
    </div>
  );
}
`);

writeFile('src/app/gallery/page.tsx', `
import React from 'react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';

export default function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNavbar />
      <section className="py-16 max-w-5xl mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Photo &amp; Event Gallery</h1>
        <p className="text-xs sm:text-sm text-slate-600">Annual Sports, Cultural Fest, Independence Day celebrations, and Science Exhibitions.</p>
      </section>
      <PublicFooter />
    </div>
  );
}
`);

writeFile('src/app/news/page.tsx', `
import React from 'react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';

export default function NewsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNavbar />
      <section className="py-16 max-w-5xl mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">News &amp; Official Circulars</h1>
        <p className="text-xs sm:text-sm text-slate-600">Examination date sheets, holiday notices, and admissions announcements.</p>
      </section>
      <PublicFooter />
    </div>
  );
}
`);

writeFile('src/app/events/page.tsx', `
import React from 'react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';

export default function EventsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNavbar />
      <section className="py-16 max-w-5xl mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Upcoming Events</h1>
        <p className="text-xs sm:text-sm text-slate-600">Academic calendars and inter-school championship schedules.</p>
      </section>
      <PublicFooter />
    </div>
  );
}
`);

writeFile('src/app/admissions/page.tsx', `
'use client';

import React, { useState } from 'react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';
import { apiClient } from '../../lib/api-client';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select } from '../../components/ui/select';
import { Send, CheckCircle2 } from 'lucide-react';

export default function AdmissionsPage() {
  const [formData, setFormData] = useState({
    applicantName: '',
    gender: 'male',
    dob: '2010-01-01',
    targetClassId: '6a8c23b4696177c803396123',
    fatherName: '',
    fatherPhone: '',
    motherName: 'Parent',
    address: 'Shamsabad, Farrukhabad',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await apiClient.post('/admissions/public/apply', formData);
      setSubmittedApp(res.data.data);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to submit application');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <PublicNavbar />
      <section className="py-16 max-w-3xl mx-auto px-4 w-full">
        {submittedApp ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-4 shadow-sm">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h2 className="text-xl font-bold text-slate-900">Application Submitted!</h2>
            <p className="text-xs text-slate-600">Application Number: <strong className="text-blue-600 font-mono">{submittedApp.applicationNumber}</strong></p>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h1 className="text-xl font-bold text-slate-900">Online Admission Application Form (2026-2027)</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Applicant Full Name"
                required
                value={formData.applicantName}
                onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
              />
              <Input
                label="Father's Full Name"
                required
                value={formData.fatherName}
                onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
              />
              <Input
                label="Father's Mobile Number"
                required
                value={formData.fatherPhone}
                onChange={(e) => setFormData({ ...formData, fatherPhone: e.target.value })}
              />
              <Button type="submit" size="lg" className="w-full" isLoading={isLoading} leftIcon={<Send className="w-4 h-4" />}>
                Submit Application
              </Button>
            </form>
          </div>
        )}
      </section>
      <PublicFooter />
    </div>
  );
}
`);

writeFile('src/app/contact/page.tsx', `
import React from 'react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNavbar />
      <section className="py-16 max-w-5xl mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Contact Institution</h1>
        <p className="text-xs sm:text-sm text-slate-600">Main Road, Near Bus Stand, Shamsabad, Farrukhabad, UP (209503). Phone: +91 9876543210.</p>
      </section>
      <PublicFooter />
    </div>
  );
}
`);

writeFile('src/app/privacy-policy/page.tsx', `
import React from 'react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNavbar />
      <section className="py-16 max-w-4xl mx-auto px-4 space-y-4">
        <h1 className="text-2xl font-bold">Privacy Policy</h1>
        <p className="text-xs text-slate-600">Sarswati Gyan Mandir adheres to strict data protection standards for student records.</p>
      </section>
      <PublicFooter />
    </div>
  );
}
`);

writeFile('src/app/terms/page.tsx', `
import React from 'react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNavbar />
      <section className="py-16 max-w-4xl mx-auto px-4 space-y-4">
        <h1 className="text-2xl font-bold">Terms &amp; Regulations</h1>
        <p className="text-xs text-slate-600">Code of conduct and academic regulations for session 2026-2027.</p>
      </section>
      <PublicFooter />
    </div>
  );
}
`);

console.log('Public and auth pages written.');

