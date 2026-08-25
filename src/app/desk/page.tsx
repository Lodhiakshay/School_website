'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Quote,
  Award,
  ShieldCheck,
  Mail,
  Phone,
  BookOpen,
  GraduationCap,
  Sparkles,
  UserCheck,
  CheckCircle2,
  HeartHandshake,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';

export default function LeadershipDeskPage() {
  const [activeLeader, setActiveLeader] = useState('principal');

  const leaders = [
    {
      id: 'principal',
      role: "Principal's Desk",
      name: 'Dr. Ramesh Kumar Sharma',
      qualification: 'M.Sc. (Physics), M.Ed., Ph.D. in Education',
      experience: '28+ Years of Academic Leadership',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
      shloka: 'तमसो मा ज्योतिर्गमय — Lead us from ignorance unto the light of wisdom.',
      title: 'Words of Inspiration & Academic Vision',
      paragraphs: [
        'It gives me immense pleasure and humility to welcome you all to Sarswati Gyan Mandir Intermediate College, Shamsabad, Farrukhabad. For over 25 years, our institution has stood steadfast as a temple of learning, character building, and academic excellence.',
        'We firmly believe that education is not merely the accumulation of facts and memorization for examinations. True education is the harmonious development of the mind, body, intellect, and moral spirit. In our campus, every child from Nursery to Class 12 receives personalized mentorship, state-of-the-art laboratory experimentation, and a moral compass that prepares them for modern life.',
        'Our science laboratories (Physics, Chemistry, Biology) and air-conditioned digital computer centers are designed to foster experiential and research-oriented learning. Furthermore, our dedicated competitive examination cell provides foundational mentorship for state board top ranks, JEE, NEET, NDA, and civil service aspirations.',
        'I urge all parents to partner closely with us through our unified School ERP Portal to actively monitor their children’s attendance, academic growth, and holistic development. Let us join hands to shape a generation of patriotic, intelligent, and compassionate citizens.',
      ],
      designation: 'Principal, Sarswati Gyan Mandir Intermediate College',
    },
    {
      id: 'manager',
      role: "Manager's Desk",
      name: 'Shri Ram Prakash Verma',
      qualification: 'M.A., LL.B., Veteran Social Reformer',
      experience: 'Founder & Managing Trustee (Est. 1999)',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
      shloka: 'विद्या ददाति विनयं विनयाद् याति पात्रताम् — Knowledge bestows humility, and humility brings worthiness.',
      title: 'Institutional Foundation & Commitment to Rural Education',
      paragraphs: [
        'When we laid the foundation stone of Sarswati Gyan Mandir in 1999, our primary aspiration was to bring world-class English & Hindi bilingual education, modern science infrastructure, and patriotic Indian values to the heart of Shamsabad and surrounding villages in Farrukhabad district.',
        'Over the last two decades, it has been our management’s unwavering pledge to provide affordable, transparent, and high-standard schooling without compromising on digital facilities, laboratory apparatus, or qualified faculty.',
        'We have invested heavily in bus fleet connectivity across a 28 km radius, 24/7 solar power backup, digital smart classrooms, and secure campus surveillance so that every child, especially our girl students, can pursue higher secondary education in a safe, nurturing environment.',
      ],
      designation: 'Manager & President, SGM Educational Trust',
    },
    {
      id: 'director',
      role: "Academic Director's Desk",
      name: 'Shri Dinesh Gupta',
      qualification: 'M.Sc. (Mathematics), B.Ed.',
      experience: '20+ Years in Curriculum & Board Evaluation',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      shloka: 'सा विद्या या विमुक्तये — That is true knowledge which liberates the mind from fear and confusion.',
      title: 'Board Examination Mastery & Analytical Pedagogy',
      paragraphs: [
        'Our teaching pedagogy at Saraswati Gyan Mandir blends traditional conceptual clarity with modern scientific problem-solving techniques. In Mathematics and Science, we emphasize derivation from first principles rather than rote memorization.',
        'Through our regular Chapter-wise Unit Tests, OMR mock test series, and personalized doubt sessions, our students consistently achieve 90%+ marks and top district ranks in UP Board High School and Intermediate examinations.',
        'We welcome our young scholars to make full use of our central library, digital science lab kits, and faculty mentorship to achieve their highest potential.',
      ],
      designation: 'Academic Director & Head of Mathematics',
    },
  ];

  const current = leaders.find((l) => l.id === activeLeader) || leaders[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <PublicNavbar />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-[#001845] via-[#002060] to-[#023e8a] text-white py-14 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Institutional Leadership &bull; मार्गदर्शक संदेश</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight text-white leading-tight">
            Messages From The Leadership Desk
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Guiding philosophy, moral vision, and pedagogical direction from the Principal, Manager, and Academic Directors of Sarswati Gyan Mandir.
          </p>
        </div>
      </section>

      {/* Interactive Leader Switcher Tabs (Mobile Scroll & Curved Screen Safe) */}
      <section className="max-w-5xl mx-auto px-3 sm:px-6 -mt-6 sm:-mt-8 z-20 w-full">
        <div className="bg-white p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar">
          {leaders.map((leader) => {
            const isActive = activeLeader === leader.id;
            return (
              <button
                key={leader.id}
                onClick={() => setActiveLeader(leader.id)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  isActive
                    ? 'bg-[#002060] text-white shadow-md scale-100 ring-2 ring-blue-400/30'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <UserCheck className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{leader.role}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Active Letter Section */}
      <section className="py-10 sm:py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-12 shadow-xl space-y-8 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Subtle Institutional Watermark */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 opacity-5 pointer-events-none">
            <img src="/logo.png" alt="Watermark" className="w-full h-full object-contain" />
          </div>

          {/* Letter Header Profile */}
          <div className="flex flex-col sm:flex-row items-center gap-6 border-b-2 border-slate-100 pb-8 text-center sm:text-left">
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-4 border-amber-400 shadow-xl bg-slate-100 flex-shrink-0 p-0.5">
              <img
                src={current.image}
                alt={current.name}
                className="w-full h-full object-cover object-top rounded-2xl"
              />
            </div>
            <div className="space-y-1">
              <span className="inline-block text-[10px] font-black text-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                {current.role}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
                {current.name}
              </h2>
              <p className="text-xs text-amber-900 font-bold">{current.experience}</p>
              <p className="text-[11px] text-slate-500 font-medium">{current.qualification}</p>
            </div>
          </div>

          {/* Vedic Shloka Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border-l-4 border-amber-500 text-amber-950 font-serif italic text-xs sm:text-sm shadow-sm">
            &ldquo;{current.shloka}&rdquo;
          </div>

          {/* Letter Body Paragraphs */}
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base font-serif">
              {current.title}
            </h3>
            {current.paragraphs.map((p, pIdx) => (
              <p key={pIdx}>{p}</p>
            ))}
          </div>

          {/* Official Signature & Seal Block */}
          <div className="pt-8 border-t-2 border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-600">
            <div className="space-y-1 text-center sm:text-left">
              <p className="font-bold text-slate-900">With Warm Blessings &amp; Vision,</p>
              <h4 className="text-base font-black text-blue-950 font-serif">{current.name}</h4>
              <p className="text-[11px] text-slate-500">{current.designation}</p>
              <p className="text-[10px] text-slate-400">Shamsabad, Farrukhabad (UP) • Affiliation: UP-FBD-2026-SGM-089</p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-1 flex-shrink-0">
              <div className="w-10 h-10 mx-auto rounded-full overflow-hidden border border-amber-400 bg-white p-0.5 shadow-sm">
                <img src="/logo.png" alt="Seal" className="w-full h-full object-contain" />
              </div>
              <span className="block text-[10px] font-black text-blue-900 uppercase tracking-wider">
                Institutional Seal
              </span>
              <span className="block text-[9px] text-blue-600 font-semibold">Verified Leadership</span>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
