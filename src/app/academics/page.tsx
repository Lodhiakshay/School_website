'use client';

import React from 'react';
import Link from 'next/link';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';
import { BookOpen, Award, CheckCircle2, FlaskConical, GraduationCap, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function AcademicsPage() {
  const streams = [
    {
      title: 'Pre-Primary & Primary Education',
      classes: 'Nursery, LKG, UKG & Classes 1 to 5',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
      desc: 'Focus on foundational literacy, English phonetics, Hindi matras, joyful mental arithmetic, storytelling, and moral values.',
      subjects: ['English Reading & Phonics', 'Hindi Vyakaran', 'Mathematics & Mental Math', 'Environmental Studies (EVS)', 'General Knowledge & Moral Values', 'Arts, Craft & Music'],
    },
    {
      title: 'Middle School Curriculum',
      classes: 'Classes 6, 7 & 8 (UP Board Aligned)',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      desc: 'Transition to structured science inquiry, three-language formula (Hindi, English, Sanskrit), social studies, and introductory computing.',
      subjects: ['Science (Physics, Chemistry, Biology basics)', 'Mathematics (Algebra, Geometry)', 'Social Sciences (History, Civics, Geography)', 'Hindi & Sanskrit', 'English Grammar & Literature', 'Computer Science & ICT'],
    },
    {
      title: 'High School Board Section',
      classes: 'Classes 9 & 10 (UP State Board Exam)',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      desc: 'State board syllabus mastery with mandatory laboratory practicals, regular weekly chapter assessments, and state board mock series.',
      subjects: ['Hindi Sahitya (101)', 'English Core (102)', 'Mathematics (103)', 'General Science (104 - Theory 70 + Practical 30)', 'Social Science (105)', 'Computer Applications / Drawing (106)'],
    },
    {
      title: 'Intermediate College Wing (Science PCM/PCB)',
      classes: 'Classes 11 & 12 (UP Intermediate Board)',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
      desc: 'Rigorous science stream for engineering, medical, NDA, and research aspirants with dedicated practicals and competitive coaching.',
      subjects: ['General Hindi (301)', 'English Core (302)', 'Physics (303 - Theory 70 + Practical 30)', 'Chemistry (304 - Theory 70 + Practical 30)', 'Mathematics (305) OR Biology (306 - Theory 70 + Practical 30)'],
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
            backgroundImage: `url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-blue-950/80" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/20 px-4 py-1.5 rounded-full border border-amber-400/40">
            Curriculum &amp; Streams
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-serif">
            Academics &amp; Course Pathways
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Comprehensive academic roadmap aligned with UP Board standards from Nursery foundation to Class 12 Intermediate college.
          </p>
        </div>
      </section>

      {/* Streams & Curriculum */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="space-y-12">
          {streams.map((st, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 items-center"
            >
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-block bg-blue-900 text-amber-300 font-bold px-3 py-1 rounded-full text-[11px] uppercase tracking-wider">
                  {st.classes}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
                  {st.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{st.desc}</p>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Key Subjects &amp; Practical Modules:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {st.subjects.map((sub, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-700 flex-shrink-0" />
                        <span>{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative h-64 sm:h-72 w-full rounded-3xl overflow-hidden shadow-lg border border-slate-200 group">
                  <img
                    src={st.image}
                    alt={st.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Board Examination Assessment Framework */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400">
              Evaluation Pattern
            </span>
            <h3 className="text-2xl font-black font-serif">
              Continuous Assessment &amp; UP Board Examination Framework
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
              Our academic calendar follows a systematic evaluation format designed to remove exam anxiety while ensuring rigorous Board readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
              <span className="text-xs font-black text-amber-400 uppercase">Unit Test 1 &amp; 2</span>
              <p className="text-xs text-slate-300">Chapter-wise formative tests (50 Marks) held every quarter with instant report cards.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
              <span className="text-xs font-black text-blue-400 uppercase">Half-Yearly Exam</span>
              <p className="text-xs text-slate-300">Mid-term comprehensive theory (70 Marks) and lab practical evaluation (30 Marks).</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
              <span className="text-xs font-black text-emerald-400 uppercase">Pre-Board Series</span>
              <p className="text-xs text-slate-300">Strict UP Board simulated mock exams for Class 10 &amp; Class 12 with external evaluation.</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
              <span className="text-xs font-black text-indigo-400 uppercase">Annual Examination</span>
              <p className="text-xs text-slate-300">Final board and institutional promotion ledger with verified academic merit ranks.</p>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
