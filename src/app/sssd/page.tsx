'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Award,
  ShieldCheck,
  Building2,
  BookOpen,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Users,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Send,
  Laptop,
  Trophy,
  Palette,
  HeartHandshake,
  Languages,
  Clock,
  ArrowLeft,
  X,
  FileDown,
  CreditCard,
  HelpCircle,
  Bus,
} from 'lucide-react';
import { useToast } from '../../components/ui/toast';
import { Button } from '../../components/ui/button';

export default function SSSDPublicSchoolPage() {
  const { toast } = useToast();
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    grade: 'Class 1',
    phone: '',
    email: '',
    address: 'Shamsabad, Farrukhabad',
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName || !formData.studentName || !formData.phone) {
      toast.error('Please fill in all mandatory fields.', 'Missing Info');
      return;
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const refCode = `SSSD-2026-${randomNum}`;
    setSubmittedRef(refCode);
    toast.success(`Application registered with Ref: ${refCode}`, 'Inquiry Received!');
  };

  const sssdFeatures = [
    {
      title: '100% English Medium Ambience',
      desc: 'Immersive English language environment with daily phonics, spoken English clinics, and debate clubs from Kindergarten upwards.',
      icon: <Languages className="w-6 h-6 text-emerald-600" />,
      tag: 'Language Excellence',
    },
    {
      title: 'CBSE Curriculum & NCERT Alignment',
      desc: 'Holistic curriculum aligned with the latest National Education Policy (NEP 2020) and modern STEM learning modules.',
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      tag: 'Academic Rigor',
    },
    {
      title: 'Smart Interactive Classrooms',
      desc: 'Every classroom is equipped with high-definition digital smart boards, visual 3D science models, and multimedia content.',
      icon: <Laptop className="w-6 h-6 text-purple-600" />,
      tag: 'Digital Learning',
    },
    {
      title: 'Science & Robotics Corner',
      desc: 'Hands-on experiential labs for physics, chemistry, biology, and foundational coding for young innovators.',
      icon: <Sparkles className="w-6 h-6 text-amber-600" />,
      tag: 'Innovation',
    },
    {
      title: 'Athletics & Physical Wellness',
      desc: 'Spacious sports arena with synthetic courts for Badminton, Volleyball, Karate/Martial arts training, and Yoga sessions.',
      icon: <Trophy className="w-6 h-6 text-rose-600" />,
      tag: 'Sports Academy',
    },
    {
      title: 'Safe GPS-Tracked Transport',
      desc: 'Dedicated school van and bus fleet covering all sectors of Shamsabad, Farrukhabad, Kaimganj road, and rural suburbs.',
      icon: <ShieldCheck className="w-6 h-6 text-teal-600" />,
      tag: 'Safety & Security',
    },
  ];

  const academicStages = [
    {
      stage: 'Kindergarten & Pre-Primary',
      classes: 'Playgroup, Nursery, LKG, UKG',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80',
      highlights: ['Montessori play-way pedagogy', 'Phonics & rhyme recitation', 'Fine motor skill exercises', 'Colorful air-conditioned play hall'],
    },
    {
      stage: 'Primary Foundation Wing',
      classes: 'Grade 1 to Grade 5',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80',
      highlights: ['Strong English & Math fundamentals', 'Computer literacy & typing', 'Moral science & general knowledge', 'Art, music & storytelling'],
    },
    {
      stage: 'Middle & Secondary School',
      classes: 'Grade 6 to Grade 10',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
      highlights: ['NCERT Science & Math labs', 'Computer coding & Scratch/Python', 'Olympiad & competitive exam drills', 'Inter-school sports & debate fests'],
    },
  ];

  const feeSchedules = [
    { wing: 'Pre-Primary (Nursery, LKG, UKG)', admission: '₹ 2,500', monthly: '₹ 950 / mo', lab: 'Included' },
    { wing: 'Primary Wing (Classes 1 to 5)', admission: '₹ 3,000', monthly: '₹ 1,200 / mo', lab: '₹ 150 / mo' },
    { wing: 'Middle Wing (Classes 6 to 8)', admission: '₹ 3,500', monthly: '₹ 1,450 / mo', lab: '₹ 200 / mo' },
    { wing: 'High School (Classes 9 & 10)', admission: '₹ 4,000', monthly: '₹ 1,750 / mo', lab: '₹ 250 / mo' },
  ];

  const facultyHighlights = [
    { name: 'Mrs. Ananya Sen', role: 'Headmistress & Spoken English Lead', exp: '14 Yrs Exp', qual: 'M.A. English (Gold Medalist), B.Ed.' },
    { name: 'Mr. Vikramaditya Singh', role: 'Senior Science & STEM Instructor', exp: '10 Yrs Exp', qual: 'M.Sc. Physics, B.Ed., CTET' },
    { name: 'Ms. Deepika Saxena', role: 'Primary Phonics & Mathematics Lead', exp: '8 Yrs Exp', qual: 'B.Sc., D.El.Ed., Cambridge TKT' },
    { name: 'Mr. Rohit Kashyap', role: 'Computer & AI Robotics Instructor', exp: '7 Yrs Exp', qual: 'MCA, Certified Python Educator' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-emerald-600 selection:text-white">
      {/* SSSD Top Switcher Strip */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-slate-300 py-2 px-3 sm:px-6 text-xs border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[11px] text-emerald-300 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>English Medium Sister Campus &bull; Managed by Sarswati Educational Trust</span>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full border border-white/15 transition shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Visit Sarswati Gyan Mandir (Inter College)</span>
          </Link>
        </div>
      </div>

      {/* SSSD Dedicated Navbar Header */}
      <header className="w-full sticky top-0 z-40 bg-slate-950/95 backdrop-blur-xl border-b border-emerald-500/20 shadow-xl shadow-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          {/* SSSD Brand Logo */}
          <Link href="/sssd" className="flex items-center gap-3 group">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-amber-400 bg-white p-0.5 shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
              <img
                src="/images/sssd-logo.png"
                alt="SSSD Public School Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-white to-teal-100 uppercase font-serif tracking-tight">
                  SSSD Public School
                </h1>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-black uppercase px-2 py-0.5 rounded-full hidden sm:inline-block font-mono">
                  English Medium
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-amber-300 font-extrabold tracking-wider uppercase">
                SHAMSABAD &bull; FARRUKHABAD (UP)
              </p>
            </div>
          </Link>

          {/* SSSD Action Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+919451234567"
              className="hidden md:flex items-center gap-1.5 text-xs text-slate-300 hover:text-emerald-300 font-mono font-bold"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>+91 9451234567</span>
            </a>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 rounded-xl px-4 py-2"
              onClick={() => setShowApplyModal(true)}
              leftIcon={<Send className="w-3.5 h-3.5 text-amber-300" />}
            >
              Online Admission 2026
            </Button>
          </div>
        </div>
      </header>

      {/* SSSD Hero Section */}
      <section className="relative bg-gradient-to-br from-[#022c22] via-[#064e3b] to-[#042f2e] text-white pt-16 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Admissions Open for Session 2026-2027 &bull; Nursery to Grade 10</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-serif tracking-tight text-white leading-tight">
            Nurturing Global Minds with <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-amber-200 to-teal-200">
              Modern English Medium Education
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Welcome to <strong>SSSD Public School (Shamsabad)</strong> &mdash; the premier co-educational English Medium wing of Sarswati Educational Trust, combining 21st-century digital classrooms, spoken English mastery, and cultural values.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs sm:text-sm shadow-xl rounded-2xl px-6 py-3.5"
              onClick={() => setShowApplyModal(true)}
              leftIcon={<Send className="w-4 h-4" />}
            >
              Apply for SSSD Admission
            </Button>
            <Link
              href="/downloads"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl border border-white/20 transition backdrop-blur-sm"
            >
              <FileDown className="w-4 h-4 text-emerald-300" />
              <span>Download Prospectus</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SSSD Quick Key Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 z-20 w-full">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xl text-center space-y-1">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Medium</span>
            <p className="text-xl sm:text-2xl font-black text-emerald-700 font-serif">100% English</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xl text-center space-y-1">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Grades Offered</span>
            <p className="text-xl sm:text-2xl font-black text-slate-900 font-serif">Nursery to 10th</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xl text-center space-y-1">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Student-Teacher</span>
            <p className="text-xl sm:text-2xl font-black text-blue-700 font-mono">18 : 1</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xl text-center space-y-1">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Campus Safety</span>
            <p className="text-xl sm:text-2xl font-black text-amber-600 font-serif">100% CCTV Safe</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-200">
            Why Choose SSSD Public School
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif">
            World-Class Amenities for Modern Learners
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Every aspect of SSSD Public School is curated to give your child an unmatched advantage in academic brilliance and personality development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sssdFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {feat.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    {feat.tag}
                  </span>
                </div>
                <h3 className="text-base font-black text-slate-900 font-serif">{feat.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Stages at SSSD */}
      <section className="py-20 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full border border-emerald-200">
              Academic Curricula
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif">
              Developmental Learning Wings
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Step-by-step cognitive and skill progression designed for modern English medium scholars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {academicStages.map((stg, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md flex flex-col justify-between hover:shadow-xl transition"
              >
                <div>
                  <div className="h-44 w-full relative overflow-hidden">
                    <img src={stg.image} alt={stg.stage} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 bg-emerald-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md">
                      {stg.classes}
                    </span>
                  </div>
                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-black text-slate-900 font-serif">{stg.stage}</h3>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {stg.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs font-bold border-emerald-300 text-emerald-800 hover:bg-emerald-50"
                    onClick={() => {
                      setFormData({ ...formData, grade: stg.classes.split(',')[0] });
                      setShowApplyModal(true);
                    }}
                  >
                    Apply for this Wing &rarr;
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SSSD Transparent Fee Schedule Section */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1 rounded-full">
            Transparent Fee Structure
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
            Affordable Fee Schedules (2026-2027)
          </h2>
          <p className="text-xs text-slate-600">Quality English medium education with complete transparency and zero hidden charges.</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-emerald-50 text-emerald-950 font-extrabold uppercase tracking-wider text-[11px] border-b border-emerald-100">
                <tr>
                  <th className="px-6 py-4">Educational Wing</th>
                  <th className="px-6 py-4">One-Time Registration</th>
                  <th className="px-6 py-4">Monthly Tuition</th>
                  <th className="px-6 py-4">Digital / Lab Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {feeSchedules.map((f, idx) => (
                  <tr key={idx} className="hover:bg-emerald-50/40 transition">
                    <td className="px-6 py-4 font-bold text-slate-900">{f.wing}</td>
                    <td className="px-6 py-4 text-emerald-800 font-mono font-bold">{f.admission}</td>
                    <td className="px-6 py-4 text-slate-900 font-mono font-bold">{f.monthly}</td>
                    <td className="px-6 py-4 text-slate-600 font-mono">{f.lab}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SSSD Faculty Mentors */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-4 py-1 rounded-full">
              Expert Mentors
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
              Our English Language Educators
            </h2>
            <p className="text-xs text-slate-600">Certified educators trained in modern phonics, interactive smart board teaching, and child psychology.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facultyHighlights.map((fac, idx) => (
              <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg font-serif">
                  {fac.name.charAt(4) || 'T'}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm font-serif">{fac.name}</h4>
                  <p className="text-xs text-emerald-700 font-bold">{fac.role}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-0.5">
                  <p><strong>Qual:</strong> {fac.qual}</p>
                  <p><strong>Experience:</strong> {fac.exp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SSSD Management Trust Banner */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 rounded-3xl p-8 sm:p-12 text-white border border-emerald-500/30 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 p-1 flex items-center justify-center font-black font-serif text-3xl shadow-xl flex-shrink-0">
              <span>SGM</span>
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Sarswati Educational Trust Legacy
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-serif text-white">
                Two Premier Schools &bull; One Vision of Excellence
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Whether you seek the prestigious state board science stream at <strong>Sarswati Gyan Mandir Intermediate College</strong> or modern English medium co-education at <strong>SSSD Public School</strong>, our trust ensures highest academic integrity and student care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SSSD Footer */}
      <footer className="bg-slate-950 text-slate-400 pt-12 pb-8 border-t border-emerald-500/20 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-400 bg-white p-0.5 shadow-md flex-shrink-0">
                <img src="/images/sssd-logo.png" alt="SSSD Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white font-serif">SSSD Public School</h4>
                <p className="text-[10px] text-emerald-400 uppercase font-bold">English Medium Wing &bull; Shamsabad</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold text-slate-300">
              <Link href="/" className="hover:text-amber-300 transition">
                &larr; Sarswati Gyan Mandir (Main Site)
              </Link>
              <Link href="/downloads" className="hover:text-emerald-300 transition">
                Downloads &amp; Forms
              </Link>
              <Link href="/privacy-policy" className="hover:text-emerald-300 transition">
                Privacy Policy
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
            <p>&copy; 2026 SSSD Public School, Shamsabad (Farrukhabad, UP). All rights reserved.</p>
            <p>Managed by Sarswati Shiksha Samiti &bull; Affiliated &bull; Co-Educational</p>
          </div>
        </div>
      </footer>

      {/* SSSD Admission Inquiry Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-emerald-600 space-y-5 animate-in zoom-in-95 duration-200 my-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-amber-400 bg-white p-0.5 shadow-sm flex-shrink-0">
                  <img src="/images/sssd-logo.png" alt="SSSD Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 font-serif">
                    SSSD Public School Admission Inquiry
                  </h3>
                  <p className="text-[10px] text-emerald-700 font-bold uppercase">Session 2026-2027 (English Medium)</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowApplyModal(false);
                  setSubmittedRef(null);
                }}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedRef ? (
              <div className="text-center py-6 space-y-4 animate-in zoom-in-90 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-black text-slate-900 font-serif">Application Registered!</h4>
                  <p className="text-xs text-slate-600">
                    Your inquiry for <strong>{formData.studentName}</strong> has been submitted to SSSD Admission Office.
                  </p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center font-mono space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Your Inquiry Reference ID</span>
                  <div className="text-xl font-black text-emerald-800 tracking-wider">{submittedRef}</div>
                </div>
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold text-xs"
                  onClick={() => {
                    setShowApplyModal(false);
                    setSubmittedRef(null);
                  }}
                >
                  Done
                </Button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Student Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aarav Sharma"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Parent / Guardian Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Grade Applying For *</label>
                    <select
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                    >
                      <option value="Playgroup / Nursery">Playgroup / Nursery</option>
                      <option value="LKG / UKG">LKG / UKG</option>
                      <option value="Class 1">Class 1</option>
                      <option value="Class 2">Class 2</option>
                      <option value="Class 3">Class 3</option>
                      <option value="Class 4">Class 4</option>
                      <option value="Class 5">Class 5</option>
                      <option value="Class 6">Class 6</option>
                      <option value="Class 7">Class 7</option>
                      <option value="Class 8">Class 8</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mobile Contact Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 9839000000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 font-medium font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Residential Address (Town/Village)</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  />
                </div>

                <div className="flex gap-2 pt-3 border-t border-slate-100">
                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold text-xs">
                    Submit SSSD Admission Inquiry
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowApplyModal(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
