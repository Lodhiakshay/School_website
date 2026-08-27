'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Award,
  ShieldCheck,
  Building2,
  Calendar,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Users,
  MapPin,
  Quote,
  Languages,
} from 'lucide-react';
import { PublicNavbar } from '../components/public/public-navbar';
import { PublicFooter } from '../components/public/public-footer';
import { InfiniteCampusCarousel } from '../components/public/infinite-campus-carousel';

export default function HomePage() {
  const stats = [
    { value: '1,250+', label: 'Enrolled Scholars', icon: <Users className="w-5 h-5 text-blue-600" /> },
    { value: '42+', label: 'Expert Faculty', icon: <GraduationCap className="w-5 h-5 text-emerald-600" /> },
    { value: '99.4%', label: 'Board Pass Rate', icon: <Award className="w-5 h-5 text-amber-600" /> },
    { value: '25+ Yrs', label: 'Academic Legacy', icon: <Building2 className="w-5 h-5 text-indigo-600" /> },
  ];

  const academicWings = [
    {
      title: 'Pre-Primary & Primary Wing',
      grades: 'Nursery to Class 5',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80',
      desc: 'Foundational literacy, phonics, joyful arithmetic, creative arts, and moral grounding in a caring environment.',
    },
    {
      title: 'Middle School Wing',
      grades: 'Class 6 to Class 8',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80',
      desc: 'Scientific exploration, digital literacy, languages (Hindi, English, Sanskrit), and strong mathematics fundamentals.',
    },
    {
      title: 'High School (UP Board)',
      grades: 'Class 9 & Class 10',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
      desc: 'Rigorous state board curriculum, NCERT mastery, comprehensive laboratory experiments, and board mock series.',
    },
    {
      title: 'Intermediate College Wing',
      grades: 'Class 11 & Class 12',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
      desc: 'Specialized Science (PCM/PCB) & Humanities streams with state board preparation and competitive examination guidance.',
    },
  ];

  const facilities = [
    {
      title: 'Physics & Chemistry Labs',
      desc: 'Equipped with modern apparatus, optical benches, reagents, and certified safety setups.',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Digital Computer Center',
      desc: 'Air-conditioned lab with 40+ connected workstations and coding modules.',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Central Knowledge Library',
      desc: 'Extensive repository of 5,000+ reference volumes, encyclopedias, and regional literature.',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Dedicated Transport Fleet',
      desc: 'GPS-tracked school buses covering Shamsabad, Farrukhabad, and surrounding rural routes.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <PublicNavbar />

      {/* Hero Banner with ZERO empty gap on Mobile */}
      <section className="relative bg-slate-950 text-white pt-4 pb-12 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 overflow-hidden">
        {/* Background Image with Deep Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Premier Intermediate College in Shamsabad, Farrukhabad (UP)</span>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-serif leading-tight">
                  सरस्वती ज्ञान मन्दिर
                </h1>
                <p className="text-base sm:text-2xl font-black text-blue-400 tracking-tight font-serif">
                  Nurturing Character, Culture &amp; Academic Excellence
                </p>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-medium">
                Affiliated with the <strong className="text-white">UP State Board of High School and Intermediate Education</strong>. We provide state-of-the-art laboratory infrastructure, holistic values, disciplined learning, and complete digital portal management for students from Nursery to Class 12.
              </p>

              {/* Action Buttons (Stacked on mobile, row on tablet/desktop) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 w-full sm:w-auto">
                <Link
                  href="/admissions"
                  className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-black shadow-xl shadow-blue-600/30 transition transform hover:-translate-y-0.5"
                >
                  <span>Apply Online 2026-27</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/login"
                  className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 text-white hover:bg-slate-800 text-xs sm:text-sm font-bold transition"
                >
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                  <span>Central ERP Portal</span>
                </Link>
              </div>

              {/* Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800 text-[11px] sm:text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Code: UP-FBD-2026-SGM-089
                </span>
                <span className="inline-flex items-center gap-1.5 text-slate-300 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800 text-[11px] sm:text-xs">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" /> Shamsabad, Farrukhabad (PIN: 209503)
                </span>
              </div>
            </div>

            {/* Quick Admission Inquiry Widget */}
            <div className="lg:col-span-5 bg-slate-900/95 border-2 border-blue-600/30 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-amber-400 bg-white p-0.5 shadow-md flex-shrink-0">
                    <img src="/logo.png" alt="SGM" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider font-serif">
                      ONLINE ADMISSIONS 2026-27
                    </h3>
                    <p className="text-[10px] text-amber-400 font-bold">Nursery to Class 12 (Science / Arts)</p>
                  </div>
                </div>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-black px-2.5 py-0.5 rounded-full border border-emerald-500/30 uppercase">
                  ACTIVE
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <p className="leading-relaxed text-[11px]">
                  Admissions open for academic session 2026-27. Submit an online inquiry for instant counseling.
                </p>
                <div className="grid grid-cols-2 gap-2 pt-0.5">
                  <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-[10px] font-semibold text-slate-200">
                    ✓ High School Board Batches
                  </div>
                  <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-[10px] font-semibold text-slate-200">
                    ✓ Class 11 PCM / PCB / Arts
                  </div>
                  <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-[10px] font-semibold text-slate-200">
                    ✓ Digital Lab Facilities
                  </div>
                  <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-[10px] font-semibold text-slate-200">
                    ✓ School Bus Routes
                  </div>
                </div>
              </div>

              <Link
                href="/admissions"
                className="block w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-center font-black text-white text-xs shadow-lg shadow-blue-600/30 transition uppercase tracking-wider"
              >
                SUBMIT ADMISSION INQUIRY &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Ribbon */}
      <section className="py-6 sm:py-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3.5 hover:shadow-md transition"
            >
              <div className="p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-200 flex-shrink-0">
                {s.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-base sm:text-xl font-black text-slate-900 leading-tight truncate">
                  {s.value}
                </div>
                <div className="text-[11px] sm:text-xs font-bold text-slate-500 leading-tight truncate">
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Wings */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-700 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200">
              Academic Curricula
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif">
              Comprehensive Educational Wings
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Structured developmental pathways mapped to the UP State Board guidelines from primary to intermediate level.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {academicWings.map((w, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 w-full relative overflow-hidden">
                    <img
                      src={w.image}
                      alt={w.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 bg-blue-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md">
                      {w.grades}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-black text-slate-900 font-serif group-hover:text-blue-600 transition">
                      {w.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {w.desc}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    href="/academics"
                    className="inline-flex items-center gap-1.5 text-xs font-black text-blue-600 hover:text-blue-700 group-hover:translate-x-1 transition-transform"
                  >
                    <span>View Curriculum</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities & Infrastructure */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
              Campus Infrastructure
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif">
              World-Class Facilities &amp; Laboratories
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Designed to foster practical scientific inquiry, digital literacy, and holistic sports development.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((f, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition p-4 space-y-4"
              >
                <div className="h-40 rounded-2xl overflow-hidden relative">
                  <img src={f.image} alt={f.title} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-slate-900 font-serif">{f.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sister Institution: SSSD Public School (English Medium) Showcase */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-emerald-950 via-slate-950 to-teal-950 rounded-3xl p-6 sm:p-12 text-white border-2 border-emerald-500/30 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="lg:col-span-8 space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>100% English Medium Wing &bull; CBSE Pattern</span>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-amber-400 bg-white p-0.5 shadow-xl flex-shrink-0">
                  <img
                    src="/images/sssd-logo.png"
                    alt="SSSD Public School Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-4xl font-black font-serif text-white leading-tight">
                    SSSD Public School
                  </h2>
                  <p className="text-[11px] sm:text-xs text-amber-300 font-extrabold uppercase tracking-wider">
                    SHAMSABAD &bull; FARRUKHABAD (100% ENGLISH MEDIUM)
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
                Seeking a dedicated <strong>100% English Medium</strong> learning environment with CBSE pattern curriculum, digital smart boards, and phonics labs? Discover our premier English-medium campus located right here in Shamsabad, Farrukhabad.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 space-y-0.5">
                  <span className="font-bold text-amber-300 block">Nursery to 10th</span>
                  <span className="text-[11px] text-slate-300">Co-Ed Schooling</span>
                </div>
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 space-y-0.5">
                  <span className="font-bold text-emerald-300 block">100% English</span>
                  <span className="text-[11px] text-slate-300">Spoken &amp; Phonics</span>
                </div>
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 space-y-0.5 col-span-2 sm:col-span-1">
                  <span className="font-bold text-teal-300 block">Smart STEM Labs</span>
                  <span className="text-[11px] text-slate-300">GPS Bus Fleet</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <Link
                  href="/sssd"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition active:scale-95"
                >
                  <span>Explore SSSD Public School Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/sssd"
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-emerald-200 border border-white/15 text-xs font-bold transition"
                >
                  <span>Online Admission 2026</span>
                </Link>
              </div>
            </div>

            {/* Right Card / Visual */}
            <div className="lg:col-span-4 relative z-10">
              <div className="bg-slate-900/95 rounded-3xl p-5 sm:p-6 border border-emerald-500/40 shadow-2xl space-y-4 text-center overflow-hidden relative group">
                <div className="h-44 sm:h-48 w-full rounded-2xl overflow-hidden relative shadow-inner border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80"
                    alt="SSSD Public School Smart Classroom"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                  <span className="absolute top-3 left-3 bg-emerald-500 text-slate-950 font-black text-[10px] uppercase px-3 py-1 rounded-full shadow-md font-mono">
                    100% English Medium
                  </span>
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <h3 className="font-serif font-black text-sm text-white drop-shadow">SSSD Public School</h3>
                    <p className="text-[10px] text-emerald-300 font-bold uppercase">Shamsabad, Farrukhabad</p>
                  </div>
                </div>

                <div className="space-y-1 text-left bg-white/5 p-3 rounded-xl border border-white/10 text-[11px] text-slate-300">
                  <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                    <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>CBSE Pattern &bull; Smart Phonics Labs</span>
                  </div>
                  <p className="text-[10px] text-slate-400">Co-Educational Schooling with modern digital classrooms.</p>
                </div>

                <Link
                  href="/sssd"
                  className="block w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md transition"
                >
                  Visit SSSD Campus Portal &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principal Desk Leadership Showcase */}
      <section className="py-20 bg-slate-100/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#001740] via-[#002060] to-[#021029] rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden border-2 border-amber-400/50">
            {/* Background Glows & Watermark Seal */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 right-4 w-64 h-64 opacity-5 pointer-events-none">
              <img src="/images/stamps/principal-round-seal.png" alt="Watermark Seal" className="w-full h-full object-contain" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              {/* Left Column: Hero Portrait & Leadership Credentials */}
              <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left space-y-3">
                <div className="relative w-full max-w-[260px] sm:max-w-[300px] md:max-w-full h-64 sm:h-80 md:h-[370px] rounded-3xl overflow-hidden border-4 border-amber-400/90 shadow-2xl shadow-amber-500/20 bg-slate-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=85"
                    alt="Principal Dr. Ramesh Kumar Sharma"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  
                  {/* Floating Experience Badge */}
                  <div className="absolute top-3 left-3 bg-amber-400 text-blue-950 text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-lg border border-amber-300 flex items-center gap-1 font-mono">
                    <span>★ 25+ Years Academic Leadership</span>
                  </div>

                  {/* Nameplate inside photo bottom */}
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <h4 className="font-serif font-black text-lg sm:text-xl text-white drop-shadow-md">
                      Dr. Ramesh Kumar Sharma
                    </h4>
                    <p className="text-xs text-amber-300 font-bold drop-shadow">
                      Principal &bull; M.Sc., M.Ed., Ph.D.
                    </p>
                    <p className="text-[10px] text-slate-300 font-mono mt-0.5">
                      Sarswati Gyan Mandir &amp; SSSD Group
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Key Vision, 3 Pillars, and Message Excerpt */}
              <div className="md:col-span-7 space-y-5">
                {/* Header Tag */}
                <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-black uppercase px-3.5 py-1.5 rounded-full border border-amber-400/40">
                  <Quote className="w-3.5 h-3.5 text-amber-300" />
                  <span>From The Principal&apos;s Desk</span>
                </div>

                {/* Main Quote Title */}
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-serif text-white leading-snug">
                  &ldquo;Empowering Rural Youth with Modern Science, Moral Character &amp; Board Excellence&rdquo;
                </h3>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                  At Saraswati Gyan Mandir and our English-medium wing SSSD Public School, education is not merely the transmission of syllabus &mdash; it is the ignite of intellect, character building, cultural ethos, and competitive spirit. We are dedicated to providing students of Shamsabad and Farrukhabad with world-class facilities and nurturing mentorship.
                </p>

                {/* 3 Pillars Bento Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 space-y-1">
                    <div className="text-amber-300 text-xs font-black">🎓 Board Toppers</div>
                    <div className="text-[11px] text-slate-300">Consistent Top State &amp; District Ranks</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 space-y-1">
                    <div className="text-emerald-300 text-xs font-black">🔬 Modern Labs</div>
                    <div className="text-[11px] text-slate-300">Physics, Chem, Bio &amp; IT Practical Centers</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 space-y-1">
                    <div className="text-blue-300 text-xs font-black">🕉️ Values &amp; Sports</div>
                    <div className="text-[11px] text-slate-300">Sanskar, Discipline &amp; Physical Fitness</div>
                  </div>
                </div>

                {/* Action & Stamped Signature */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/15">
                  <Link
                    href="/desk"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-950 font-black text-xs shadow-lg shadow-amber-400/20 transition-all active:scale-95 group"
                  >
                    <span>Read Full Welcome Letter from Desk</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="bg-white/90 p-1.5 px-3 rounded-xl border border-amber-300/60 flex items-center gap-2 self-start sm:self-auto shadow-md">
                    <img
                      src="/images/stamps/principal-signature.png"
                      alt="Principal Signature"
                      className="h-9 w-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 360° Infinite Interactive Campus Showcase */}
      <InfiniteCampusCarousel />

      <PublicFooter />
    </div>
  );
}
