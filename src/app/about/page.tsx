'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Target,
  Heart,
  CheckCircle2,
  ShieldCheck,
  Award,
  Building2,
  Users,
  BookOpen,
  Sparkles,
  Calendar,
  Compass,
  ArrowRight,
  GraduationCap,
  FileCheck,
} from 'lucide-react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('heritage');

  const milestones = [
    { year: '1999', title: 'Foundation Stone', desc: 'Established as a primary gurukul by Shri Ram Prakash Verma with 60 students.' },
    { year: '2005', title: 'High School Recognition', desc: 'Affiliated with Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP Prayagraj).' },
    { year: '2012', title: 'Intermediate Science Block', desc: 'Upgraded to full Intermediate College with specialized Physics, Chemistry, and Biology laboratories.' },
    { year: '2019', title: 'Digital Campus & Smart IT Hub', desc: 'Inauguration of air-conditioned 40-seat Computer Laboratory and fiber-optic networking.' },
    { year: '2026', title: 'Silver Jubilee & Unified ERP Portal', desc: '25+ years of excellence, 1,200+ scholars, and complete digital attendance & marksheet ERP.' },
  ];

  const committeeMembers = [
    { name: 'Shri Ram Prakash Verma', designation: 'Founder & Managing Trustee', qual: 'M.A., LL.B.', role: 'Institutional Vision & Trust' },
    { name: 'Dr. Ramesh Kumar Sharma', designation: 'Principal & Ex-Officio Secretary', qual: 'M.Sc., M.Ed., Ph.D.', role: 'Academic Administration & Faculty Head' },
    { name: 'Shri Dinesh Chandra Gupta', designation: 'Academic Director & Vice Principal', qual: 'M.Sc., B.Ed.', role: 'Curriculum & Board Examination Cell' },
    { name: 'Smt. Sunita Verma', designation: 'Primary Wing Headmistress', qual: 'M.A., B.Ed.', role: 'Foundational Stage & Child Welfare' },
    { name: 'Shri Manoj Mishra', designation: 'Bursar & Accounts In-Charge', qual: 'M.Com, Tally Pro', role: 'Financial Transparency & Audits' },
    { name: 'Dr. Anita Srivastava', designation: 'Senior Faculty & Science Dean', qual: 'M.Sc., Ph.D.', role: 'Laboratory Research & Science Fair Head' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <PublicNavbar />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-[#001845] via-[#002060] to-[#023e8a] text-white py-14 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Institutional Heritage &bull; हमारी गौरवशाली परम्परा</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight text-white leading-tight">
            About Sarswati Gyan Mandir
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Established in 1999 in Shamsabad, Farrukhabad. 25+ years of nurturing intellectual brilliance, moral character, and science research across Uttar Pradesh.
          </p>
        </div>
      </section>

      {/* Interactive Sub-Navigation Tabs */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 -mt-6 sm:-mt-8 z-20 w-full">
        <div className="bg-white p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl flex items-center justify-center gap-2 overflow-x-auto">
          {[
            { id: 'heritage', label: 'Heritage & Journey', icon: <Building2 className="w-4 h-4" /> },
            { id: 'vision', label: 'Vision, Mission & Ethos', icon: <Target className="w-4 h-4" /> },
            { id: 'governance', label: 'Managing Committee', icon: <Users className="w-4 h-4" /> },
            { id: 'affiliation', label: 'Affiliations & Codes', icon: <ShieldCheck className="w-4 h-4" /> },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-[#002060] text-white shadow-md scale-100 ring-2 ring-blue-400/30'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span className={isActive ? 'text-amber-400' : 'text-slate-400'}>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full space-y-12">
        {/* Tab 1: Heritage & Journey */}
        {activeTab === 'heritage' && (
          <div className="space-y-12 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  Est. 1999 &bull; Shamsabad
                </span>
                <h2 className="text-xl sm:text-3xl font-black text-slate-900 font-serif">
                  25+ Years of Academic Excellence in Farrukhabad
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <strong>Sarswati Gyan Mandir Intermediate College</strong> was founded with a sacred commitment to bring world-class English &amp; Hindi medium schooling, modern laboratory experimentation, and rooted Indian sanskars to rural and semi-urban scholars.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Guided by the Sanskrit shloka <strong className="text-blue-900 font-serif">&ldquo;तमसो मा ज्योतिर्गमय&rdquo;</strong> (Lead us from darkness unto light), the college has produced top district board toppers, doctors, engineers, military officers, and civil servants.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-100 text-center">
                    <div className="text-xl sm:text-2xl font-black text-blue-900 font-serif">10,000+</div>
                    <div className="text-[10px] font-bold text-slate-600 uppercase mt-0.5">Alumni Network</div>
                  </div>
                  <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-100 text-center">
                    <div className="text-xl sm:text-2xl font-black text-amber-900 font-serif">100%</div>
                    <div className="text-[10px] font-bold text-slate-600 uppercase mt-0.5">Board Pass Rate</div>
                  </div>
                  <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-100 text-center">
                    <div className="text-xl sm:text-2xl font-black text-emerald-900 font-serif">42+</div>
                    <div className="text-[10px] font-bold text-slate-600 uppercase mt-0.5">Faculty Scholars</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-xl border-4 border-slate-100 group">
                  <img
                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
                    alt="Campus Building"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md rounded-2xl p-4 text-white text-xs border border-white/10">
                    <p className="font-bold font-serif">Main Academic Quadrangle &amp; Science Laboratories</p>
                    <p className="text-[10px] text-blue-200">Main Road, Near Bus Stand, Shamsabad (Farrukhabad)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Milestones */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-6">
              <div className="text-center space-y-1">
                <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                  Institutional Journey
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-serif">
                  Historical Milestones &amp; Growth
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-4">
                {milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-2 hover:border-amber-400/50 transition"
                  >
                    <span className="text-lg font-black text-amber-400 font-mono">{m.year}</span>
                    <h4 className="text-xs font-black text-white">{m.title}</h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Vision, Mission & Ethos */}
        {activeTab === 'vision' && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 font-serif">Our Vision</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To stand as the premier educational beacon in Uttar Pradesh, harmonizing Vedic wisdom, ethical character, and advanced scientific inquiry to prepare compassionate global leaders.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 font-serif">Our Mission</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To provide accessible, high-standard schooling with state-of-the-art physics, chemistry, and IT laboratories, ensuring every child achieves 100% conceptual mastery and state board rank potential.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 font-serif">Core Pillars</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Satya (Truth), Vidya (Knowledge), Vinay (Humility), Rashtra Seva (National Duty), and Nirantar Parishram (Continuous Dedication).
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-amber-50/80 border-2 border-amber-300 space-y-3 text-center">
              <span className="text-xs font-black uppercase tracking-wider text-amber-900 font-mono">
                INSTITUTIONAL MAHAVAKYA
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-amber-950 font-serif">
                &ldquo;विद्या ददाति विनयं, विनयाद् याति पात्रताम्।&rdquo;
              </h3>
              <p className="text-xs text-amber-900 max-w-xl mx-auto font-medium">
                True education bestows humility; from humility comes worthiness; from worthiness comes prosperity, and through righteousness, one attains fulfillment.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Managing Committee */}
        {activeTab === 'governance' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center space-y-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Governance
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
                Managing Committee &amp; Governing Body
              </h2>
              <p className="text-xs text-slate-500 max-w-xl mx-auto">
                Eminent educationists and trustees ensuring academic excellence and transparent institutional governance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {committeeMembers.map((mem, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                      {mem.role}
                    </span>
                    <h3 className="text-base font-black text-slate-900 font-serif pt-1">{mem.name}</h3>
                    <p className="text-xs font-bold text-blue-700">{mem.designation}</p>
                    <p className="text-[11px] text-slate-500 font-medium">{mem.qual}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Affiliations & Codes */}
        {activeTab === 'affiliation' && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Statutory Recognition
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
                  Government Recognitions &amp; Board Affiliations
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Affiliating Body</span>
                  <h4 className="text-sm font-black text-slate-900 font-serif">UP Madhyamik Shiksha Parishad (UPMSP, Prayagraj)</h4>
                  <p className="text-slate-600">Authorized for High School (Class 9-10) and Intermediate (Class 11-12) Science PCM/PCB and Arts streams.</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Institutional Registry Code</span>
                  <h4 className="text-sm font-black font-mono text-blue-700">UP-FBD-2026-SGM-089</h4>
                  <p className="text-slate-600">Registered and recognized under the District Inspector of Schools (DIOS), Farrukhabad.</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-blue-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif font-black text-sm text-amber-300">Ready to Join Our Institution?</h4>
                  <p className="text-xs text-blue-200">Admissions are currently open for Academic Session 2026-2027.</p>
                </div>
                <Link
                  href="/admissions"
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl transition shadow-sm whitespace-nowrap"
                >
                  Apply Online Now &rarr;
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      <PublicFooter />
    </div>
  );
}
