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
} from 'lucide-react';
import { PublicNavbar } from '../components/public/public-navbar';
import { PublicFooter } from '../components/public/public-footer';

export default function HomePage() {
  const stats = [
    { label: 'Enrolled Scholars', value: '1,250+', icon: <Users className="w-5 h-5 text-blue-600" /> },
    { label: 'Qualified Teachers', value: '42+ Faculty', icon: <GraduationCap className="w-5 h-5 text-emerald-600" /> },
    { label: 'UP Board Pass Rate', value: '99.4%', icon: <Award className="w-5 h-5 text-amber-600" /> },
    { label: 'Years of Excellence', value: '25+ Years', icon: <Building2 className="w-5 h-5 text-indigo-600" /> },
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

  const galleryHighlights = [
    {
      title: 'Annual Sports Meet 2026',
      category: 'Athletics',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'District Science Exhibition',
      category: 'Innovation',
      image: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Saraswati Puja & Cultural Fest',
      category: 'Cultural',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Republic Day Parade & Honors',
      category: 'Celebration',
      image: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=600&q=80',
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
            backgroundImage: `url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-blue-950/80" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-400/40 px-3.5 py-1 rounded-full text-xs font-black shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>Premier Intermediate College in Shamsabad, Farrukhabad (UP)</span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-1 sm:space-y-2">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight font-serif">
                  सरस्वती ज्ञान मन्दिर
                </h1>
                <p className="text-xl sm:text-3xl lg:text-4xl text-blue-400 font-sans font-extrabold tracking-tight">
                  Nurturing Character, Culture &amp; Academic Excellence
                </p>
              </div>

              {/* Subtitle Description */}
              <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl font-medium">
                Affiliated with the <strong className="text-white">UP State Board of High School and Intermediate Education</strong>. We provide state-of-the-art laboratory infrastructure, holistic values, disciplined learning, and complete digital portal management for students from Nursery to Class 12.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/admissions"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-black shadow-xl shadow-blue-600/30 transition transform hover:-translate-y-0.5"
                >
                  <span>Apply Online 2026-27</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 text-white hover:bg-slate-800 text-xs sm:text-sm font-bold transition"
                >
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                  <span>Central ERP Portal</span>
                </Link>
              </div>

              {/* Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Code: UP-FBD-2026-SGM-089
                </span>
                <span className="inline-flex items-center gap-1.5 text-slate-300 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">
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
      <section className="py-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex-shrink-0">{s.icon}</div>
              <div>
                <div className="text-xl font-black text-slate-900">{s.value}</div>
                <div className="text-xs font-bold text-slate-500">{s.label}</div>
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
            <p className="text-xs sm:text-sm text-slate-600">
              Structured developmental pathways mapped to the UP State Board guidelines from primary to intermediate level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {academicWings.map((w, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group bg-white"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={w.image}
                      alt={w.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-blue-900 text-amber-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md">
                      {w.grades}
                    </div>
                  </div>
                  <div className="p-6 space-y-2.5">
                    <h3 className="text-base font-black text-slate-900 group-hover:text-blue-700 transition">
                      {w.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{w.desc}</p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <Link
                    href="/academics"
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-700 hover:text-blue-900 group-hover:translate-x-1 transition-all"
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

      {/* Principal Desk Letter Highlight */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Principal Photo */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-64 sm:w-72 rounded-3xl overflow-hidden border-4 border-amber-400/80 shadow-2xl bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                  alt="Dr. Ramesh Kumar Sharma - Principal"
                  className="w-full h-80 object-cover object-top"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 text-center">
                  <h4 className="text-base font-black text-white font-serif">Dr. Ramesh Kumar Sharma</h4>
                  <p className="text-xs text-amber-300 font-bold">Principal &amp; Senior Academician</p>
                  <p className="text-[10px] text-slate-400">M.Sc., M.Ed., Ph.D. (28+ Yrs Exp.)</p>
                </div>
              </div>
            </div>

            {/* Principal Message Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-900/60 border border-blue-500/40 px-4 py-1.5 rounded-full text-xs font-bold text-blue-300">
                <Quote className="w-3.5 h-3.5 text-amber-400" />
                <span>From the Desk of the Principal</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-serif">
                &ldquo;Education is Not Merely Information, but Character Formation.&rdquo;
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                At Sarswati Gyan Mandir, we strive to build a temple of wisdom where young students of Shamsabad and Farrukhabad are nurtured with Vedic values, scientific curiosity, critical reasoning, and moral integrity. Our alumni have achieved stellar positions in civil services, engineering, medical sciences, and national board examinations.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/principal-message"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition shadow-lg shadow-amber-500/20"
                >
                  <span>Read Full Principal Message</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/faculty"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white hover:bg-slate-800 text-xs font-bold transition"
                >
                  <span>Meet Our Faculty Roster</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-amber-600 bg-amber-100 px-4 py-1.5 rounded-full border border-amber-300">
              Campus Infrastructure
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif">
              State-of-the-Art Laboratories &amp; Campus
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Modern science labs, central library, and tech-enabled classrooms built for hands-on learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((f, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-44 w-full overflow-hidden bg-slate-200">
                  <img
                    src={f.image}
                    alt={f.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-sm font-black text-slate-900 group-hover:text-blue-700 transition">
                    {f.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/facilities"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md shadow-blue-700/20 transition"
            >
              <span>Explore All Campus Facilities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
                Moments of Pride
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-serif">
                Campus Life &amp; Events Gallery
              </h2>
            </div>
            <Link
              href="/gallery"
              className="text-xs font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1"
            >
              View Full Gallery &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryHighlights.map((g, idx) => (
              <div key={idx} className="relative h-60 rounded-3xl overflow-hidden group shadow-md bg-slate-900">
                <img
                  src={g.image}
                  alt={g.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-5 flex flex-col justify-end">
                  <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider">
                    {g.category}
                  </span>
                  <h3 className="text-sm font-black text-white leading-tight">{g.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
