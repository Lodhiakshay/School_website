'use client';

import React from 'react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';
import { Quote, Award, ShieldCheck, Mail, Phone, BookOpen, GraduationCap } from 'lucide-react';

export default function PrincipalMessagePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <PublicNavbar />

      {/* Header Banner */}
      <section className="relative bg-slate-950 text-white py-16 lg:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-blue-950/80" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/20 px-4 py-1.5 rounded-full border border-amber-400/40">
            Institutional Leadership
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-serif">
            Message From The Principal
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Words of inspiration, academic vision, and student guidance from Dr. Ramesh Kumar Sharma.
          </p>
        </div>
      </section>

      {/* Main Letter Section */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-8 sm:p-12 shadow-xl space-y-8 relative overflow-hidden">
          {/* Watermark Logo */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 opacity-5 pointer-events-none">
            <img src="/logo.png" alt="Watermark" className="w-full h-full object-contain" />
          </div>

          {/* Letter Header */}
          <div className="flex flex-col sm:flex-row items-center gap-6 border-b-2 border-slate-100 pb-8">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-4 border-amber-400 shadow-xl bg-slate-100 flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                alt="Dr. Ramesh Kumar Sharma"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Principal&apos;s Desk
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
                Dr. Ramesh Kumar Sharma
              </h2>
              <p className="text-xs text-amber-800 font-bold">Principal &amp; Senior Academician</p>
              <p className="text-[11px] text-slate-500 font-medium">
                M.Sc. (Physics), M.Ed., Ph.D. in Education (28+ Years of Academic Leadership)
              </p>
            </div>
          </div>

          {/* Letter Body */}
          <div className="space-y-5 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p className="font-bold text-slate-900 text-sm sm:text-base">
              Dear Parents, Esteemed Teachers, and Beloved Scholars,
            </p>
            <p>
              It gives me immense pleasure and humility to welcome you all to <strong>Sarswati Gyan Mandir Intermediate College</strong>, Shamsabad, Farrukhabad. For over 25 years, our institution has stood steadfast as a temple of learning, grounded in the ancient Vedic maxim:
            </p>
            
            <div className="p-4 rounded-2xl bg-amber-50/70 border-l-4 border-amber-500 text-amber-950 font-serif italic text-sm">
              &ldquo;तमसो मा ज्योतिर्गमय — Lead us from the darkness of ignorance unto the light of wisdom, truth, and enlightenment.&rdquo;
            </div>

            <p>
              We firmly believe that education is not merely the accumulation of facts and memorization for examinations. True education is the harmonious development of the mind, body, character, and spirit. In our campus, we ensure every child from Nursery to Class 12 receives personalized mentorship, rigorous academic coaching under the UP State Board, state-of-the-art laboratory experimentation, and a moral compass that prepares them for modern life.
            </p>

            <p>
              Our science laboratories (Physics, Chemistry, Biology) and air-conditioned digital computer centers are designed to foster experiential and research-oriented learning. Furthermore, our dedicated competitive examination cell provides foundational mentorship for state board top ranks, JEE, NEET, NDA, and civil service aspirations.
            </p>

            <p>
              I urge all parents to partner closely with us through our unified <strong>School ERP Portal</strong> to actively monitor their children&apos;s attendance, academic growth, and holistic development. Let us join hands to shape a generation of patriotic, intelligent, and compassionate citizens.
            </p>
          </div>

          {/* Letter Footer & Signatures */}
          <div className="pt-8 border-t-2 border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-600">
            <div className="space-y-1 text-center sm:text-left">
              <p className="font-bold text-slate-900">With Warm Regards &amp; Blessings,</p>
              <h4 className="text-base font-black text-blue-950 font-serif">Dr. Ramesh Kumar Sharma</h4>
              <p className="text-[11px] text-slate-500">Principal, Sarswati Gyan Mandir Intermediate College</p>
              <p className="text-[10px] text-slate-400">Shamsabad, Farrukhabad (UP) • Affiliation: UP-FBD-2026-SGM-089</p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-1 flex-shrink-0">
              <div className="w-10 h-10 mx-auto rounded-full overflow-hidden border border-amber-400 bg-white p-0.5 shadow-sm">
                <img src="/logo.png" alt="Seal" className="w-full h-full object-contain" />
              </div>
              <span className="block text-[10px] font-black text-blue-900 uppercase tracking-wider">
                Official Institutional Seal
              </span>
              <span className="block text-[9px] text-blue-600 font-semibold">Validated &amp; Approved</span>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
