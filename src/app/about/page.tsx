'use client';

import React from 'react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';
import { Target, Heart, CheckCircle2, ShieldCheck, Award, Building2, Users, BookOpen } from 'lucide-react';

export default function AboutPage() {
  const leadership = [
    {
      name: 'Dr. Ramesh Kumar Sharma',
      role: 'Principal & Head of Institution',
      qual: 'M.Sc. (Physics), M.Ed., Ph.D.',
      exp: '28+ Years Experience',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Shri Dinesh Chandra Gupta',
      role: 'Vice Principal & Academic Dean',
      qual: 'M.Sc. (Mathematics), B.Ed.',
      exp: '22+ Years Experience',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Smt. Sunita Verma',
      role: 'Headmistress (Primary Wing)',
      qual: 'M.A. (English), B.Ed.',
      exp: '18+ Years Experience',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <PublicNavbar />

      {/* Header Banner */}
      <section className="relative bg-slate-950 text-white py-16 lg:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-blue-950/80" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/20 px-4 py-1.5 rounded-full border border-amber-400/40">
            About Our Institution
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-serif">
            Our Heritage, Vision &amp; Core Values
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Established with a noble resolve to illuminate young minds with traditional Indian values, modern scientific temper, and academic mastery.
          </p>
        </div>
      </section>

      {/* Heritage & Story */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
              <Building2 className="w-4 h-4" /> Established in 1999 • Shamsabad (Farrukhabad)
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif">
              25+ Years of Academic Brilliance in Uttar Pradesh
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong className="text-slate-900">Sarswati Gyan Mandir Intermediate College</strong> was founded in the historic town of Shamsabad, Farrukhabad. Over the last two and a half decades, the college has transformed from a humble gurukul into a full-fledged premier intermediate institution recognized by the UP State Board.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Guided by our guiding Sanskrit motto <strong className="text-blue-900 font-serif font-black">&ldquo;तमसो मा ज्योतिर्गमय&rdquo;</strong> (Lead us from darkness to light), we instill in our students a passion for lifelong learning, national pride, and ethical conduct.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-2xl font-black text-blue-700">10,000+</div>
                <div className="text-xs font-semibold text-slate-600">Alumni Worldwide</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-2xl font-black text-emerald-700">100%</div>
                <div className="text-xs font-semibold text-slate-600">Dedicated Faculty</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80"
                alt="School Campus Building"
                className="w-full h-96 object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md rounded-2xl p-4 text-white border border-slate-700 text-xs">
                <p className="font-bold">Main Campus Quadrangle &amp; Science Block</p>
                <p className="text-[11px] text-slate-300">Shamsabad, Farrukhabad, Uttar Pradesh</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision, Mission, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-8 rounded-3xl bg-blue-50/60 border border-blue-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-700 text-white flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-900 font-serif">Our Vision</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To be a beacon of quality education in rural and semi-urban Uttar Pradesh, bridging traditional Indian heritage with contemporary science, technology, and global competence.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-amber-50/60 border border-amber-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-900 font-serif">Our Mission</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To provide affordable, accessible, and high-standard education that empowers every student to develop intellectual brilliance, critical thinking, sportsmanship, and social responsibility.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-emerald-50/60 border border-emerald-200 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-900 font-serif">Core Pillars</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Integrity, Academic Rigor, Vedic Moral Values, Scientific Temper, Inclusivity, and Continuous Technological Innovation in pedagogy and school management.
            </p>
          </div>
        </div>

        {/* Institutional Leadership */}
        <div className="space-y-8 pt-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-blue-700 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-200">
              Governance &amp; Leadership
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
              Administrative &amp; Academic Leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadership.map((lead, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition group"
              >
                <div className="h-64 w-full overflow-hidden bg-slate-100">
                  <img
                    src={lead.image}
                    alt={lead.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-1.5 text-center">
                  <h3 className="text-base font-black text-slate-900 font-serif">{lead.name}</h3>
                  <p className="text-xs font-bold text-blue-700">{lead.role}</p>
                  <p className="text-[11px] text-slate-500 font-medium">{lead.qual}</p>
                  <span className="inline-block mt-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                    {lead.exp}
                  </span>
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
