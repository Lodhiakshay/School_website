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

// 1. Public Navbar
writeFile('src/components/public/public-navbar.tsx', `
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  GraduationCap,
  LogIn,
  Send,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '../ui/button';

export const PublicNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Principal Desk', href: '/principal-message' },
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
      {/* Top Notification Strip */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-slate-300 py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-medium">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              Main Road, Shamsabad, Farrukhabad, UP (209503)
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              +91 9876543210
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-bold">
              <Sparkles className="w-3 h-3 text-amber-400" /> Admissions Open 2026-2027
            </span>
            <Link href="/admissions" className="text-blue-300 hover:text-white font-bold underline">
              Apply Online →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-blue-500 flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight uppercase">
              SARSWATI GYAN MANDIR
            </h1>
            <p className="text-[11px] text-blue-700 font-bold tracking-wider uppercase">
              Intermediate College, Shamsabad, Farrukhabad (UP)
            </p>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-bold tracking-wide transition-colors ${
                  isActive
                    ? 'text-blue-600 font-extrabold border-b-2 border-blue-600 pb-1'
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link href="/login">
            <Button size="sm" variant="outline" className="font-bold" leftIcon={<LogIn className="w-3.5 h-3.5 text-blue-600" />}>
              ERP Portal
            </Button>
          </Link>
          <Link href="/admissions">
            <Button size="sm" variant="primary" className="font-bold shadow-md shadow-blue-600/30" leftIcon={<Send className="w-3.5 h-3.5" />}>
              Online Admission
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-5 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-150">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-2.5">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full font-bold" variant="outline" leftIcon={<LogIn className="w-4 h-4" />}>
                ERP Portal Login
              </Button>
            </Link>
            <Link href="/admissions" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full font-bold" variant="primary" leftIcon={<Send className="w-4 h-4" />}>
                Submit Admission Inquiry
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
`);

// 2. Public Homepage
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
  Users,
  FlaskConical,
  Bus,
  Laptop,
} from 'lucide-react';
import { PublicNavbar } from '../components/public/public-navbar';
import { PublicFooter } from '../components/public/public-footer';
import { Button } from '../components/ui/button';

export default function HomePage() {
  const stats = [
    { label: 'Active Students', value: '1,250+', icon: <Users className="w-5 h-5 text-blue-600" /> },
    { label: 'Expert Faculty', value: '42+ Teachers', icon: <GraduationCap className="w-5 h-5 text-emerald-600" /> },
    { label: 'UP Board Pass Ratio', value: '99.4%', icon: <Award className="w-5 h-5 text-amber-600" /> },
    { label: 'Years of Excellence', value: '25+ Years', icon: <Building2 className="w-5 h-5 text-indigo-600" /> },
  ];

  const academicWings = [
    {
      title: 'Pre-Primary & Primary Wing',
      grades: 'Nursery to Class 5',
      desc: 'Foundational phonics, joyful arithmetic, creative storytelling, and cultural value grounding.',
      icon: <BookOpen className="w-7 h-7 text-blue-600" />,
      color: 'border-blue-200 bg-blue-50/50',
    },
    {
      title: 'Middle School Wing',
      grades: 'Class 6 to Class 8',
      desc: 'Critical inquiry, hands-on scientific discovery, languages (Hindi, English, Sanskrit), and mathematics foundation.',
      icon: <GraduationCap className="w-7 h-7 text-indigo-600" />,
      color: 'border-indigo-200 bg-indigo-50/50',
    },
    {
      title: 'High School (UP Board)',
      grades: 'Class 9 & Class 10',
      desc: 'Specialized state board syllabus, rigorous laboratory experiments, NCERT mastery, and board mock series.',
      icon: <Award className="w-7 h-7 text-amber-600" />,
      color: 'border-amber-200 bg-amber-50/50',
    },
    {
      title: 'Intermediate College Wing',
      grades: 'Class 11 & Class 12',
      desc: 'Specialized Science (Physics, Chemistry, Math/Bio) & Humanities streams with competitive examination mentorship.',
      icon: <Building2 className="w-7 h-7 text-emerald-600" />,
      color: 'border-emerald-200 bg-emerald-50/50',
    },
  ];

  const campusHighlights = [
    { title: 'Advanced Science Labs', desc: 'Modern Physics, Chemistry & Biology laboratory equipment.', icon: <FlaskConical className="w-6 h-6 text-blue-600" /> },
    { title: 'Digital Computer Center', desc: 'Air-conditioned lab with 40+ high-speed workstations.', icon: <Laptop className="w-6 h-6 text-indigo-600" /> },
    { title: 'Central Knowledge Library', desc: 'Over 5,000 reference books, encyclopedias & journals.', icon: <BookOpen className="w-6 h-6 text-amber-600" /> },
    { title: 'Safe Transport Fleet', desc: 'School buses covering Farrukhabad, Shamsabad & surrounding villages.', icon: <Bus className="w-6 h-6 text-emerald-600" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                <span>Premier Intermediate College in Shamsabad, Farrukhabad (UP)</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Nurturing Wisdom, Moral Values &amp; Academic Brilliance
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-medium">
                Welcome to <strong className="text-white font-bold">Sarswati Gyan Mandir</strong>. Recognized by the UP State Board, we empower young scholars from Nursery to Class 12 with academic rigor, traditional Indian values, modern scientific temper, and digital readiness.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/admissions">
                  <Button size="lg" variant="primary" className="font-extrabold shadow-lg shadow-blue-600/30" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Admissions 2026-27
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="bg-slate-800/90 border-slate-700 text-white hover:bg-slate-800 font-bold">
                    School ERP Portal Login
                  </Button>
                </Link>
              </div>

              <div className="pt-4 flex items-center gap-3 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Affiliation Code: <strong className="text-slate-200">UP-FBD-2026-SGM-089</strong></span>
              </div>
            </div>

            {/* Quick Admission Inquiry Widget */}
            <div className="lg:col-span-5 bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-slate-700 p-7 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-5 h-5 text-amber-400" />
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">Admission Desk 2026-27</h3>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-black px-2.5 py-1 rounded-full border border-emerald-500/30 uppercase tracking-wider">
                  Open Now
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <p className="leading-relaxed">
                  Admissions for Nursery, Primary, High School (Class 9-10) and Intermediate (Class 11 Science/Arts) are currently active.
                </p>
                <ul className="space-y-1.5 pt-2 text-[11px] text-slate-300 font-medium">
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> State-of-the-art Science Laboratories</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Dedicated Board Exam Mock Series</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Safe Transportation across Farrukhabad</li>
                </ul>
              </div>

              <Link href="/admissions" className="block w-full">
                <Button className="w-full font-bold shadow-md shadow-blue-600/30" variant="primary" size="lg">
                  Submit Online Inquiry Form →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="py-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">{s.icon}</div>
              <div>
                <div className="text-xl font-black text-slate-900">{s.value}</div>
                <div className="text-xs font-semibold text-slate-500">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Wings */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
              Academic Curricula
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Educational Wings from Nursery to Class 12
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Rigorous, balanced, and student-centered curriculum aligned with the UP State Board guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {academicWings.map((w, idx) => (
              <div
                key={idx}
                className="rounded-3xl border p-6 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between bg-white border-slate-200"
              >
                <div className="space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-inner">
                    {w.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">{w.title}</h3>
                    <span className="text-xs font-bold text-blue-700">{w.grades}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{w.desc}</p>
                </div>
                <Link href="/academics" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                  Explore Wing <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Facilities */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/20 px-3.5 py-1 rounded-full border border-amber-500/30">
              Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              World-Class Campus &amp; Laboratories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {campusHighlights.map((c, idx) => (
              <div key={idx} className="p-6 bg-slate-800/80 rounded-3xl border border-slate-700 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-700 flex items-center justify-center">{c.icon}</div>
                <h3 className="text-sm font-black text-white">{c.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{c.desc}</p>
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

console.log('Public website generated.');

