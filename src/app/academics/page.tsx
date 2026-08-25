'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Award,
  CheckCircle2,
  FlaskConical,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Layers,
  Clock,
  UserCheck,
  FileDown,
  Target,
  Microscope,
  Calculator,
  Compass,
  Palette,
  HeartHandshake,
} from 'lucide-react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';
import { Button } from '../../components/ui/button';

export default function AcademicsPage() {
  const [activeTab, setActiveTab] = useState('high-school');

  const academicStages = [
    {
      id: 'primary',
      tabLabel: 'Primary Wing',
      subLabel: 'Nursery to Class 5',
      icon: <Palette className="w-4 h-4" />,
      title: 'Pre-Primary & Primary Foundation Wing',
      hindiTitle: 'प्राथमिक एवं पूर्व-प्राथमिक शिक्षा विभाग',
      classes: 'Nursery, LKG, UKG & Classes 1 to 5',
      ageGroup: '3 to 10 Years',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
      description:
        'Focuses on joyful learning, English phonetics, Hindi matras, mental arithmetic, moral storytelling, curiosity-driven environmental awareness, and creative arts.',
      highlights: [
        'Activity-based playway curriculum with audio-visual learning',
        'Phonics-based English reading and handwriting improvement',
        'Abacus basics and joyful mental math calculations',
        'Value-oriented moral education and sanskar sessions',
      ],
      subjects: [
        { name: 'English Language & Phonics', code: 'ENG-PR', type: 'Core' },
        { name: 'Hindi Vyakaran & Sahitya', code: 'HIN-PR', type: 'Core' },
        { name: 'Mathematics & Mental Math', code: 'MTH-PR', type: 'Core' },
        { name: 'Environmental Studies (EVS)', code: 'EVS-01', type: 'Applied' },
        { name: 'General Knowledge & Vedic Sanskar', code: 'GK-01', type: 'Foundational' },
        { name: 'Drawing, Clay Craft & Music', code: 'ART-01', type: 'Co-Curricular' },
      ],
      facilities: ['Smart Kindergarten Activity Room', 'Interactive Toy Library', 'Safe Children Play Park'],
      headFaculty: 'Mrs. Sunita Verma (Primary Coordinator)',
    },
    {
      id: 'middle',
      tabLabel: 'Middle School',
      subLabel: 'Classes 6 to 8',
      icon: <Compass className="w-4 h-4" />,
      title: 'Middle School Exploratory Stage',
      hindiTitle: 'उच्च प्राथमिक एवं माध्यमिक संकाय (कक्षा ६ - ८)',
      classes: 'Classes 6, 7 & 8 (UP Board Aligned)',
      ageGroup: '11 to 13 Years',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
      description:
        'Structured science inquiry, the Three-Language Formula (Hindi, English, Sanskrit), analytical mathematics, social geography, and introductory computing concepts.',
      highlights: [
        'Hands-on introductory science experiments in junior lab',
        'Three-Language Formula (Hindi, English & Devbhasha Sanskrit)',
        'Fundamentals of computer programming and digital literacy',
        'Inter-school quiz, debate, and declamation training',
      ],
      subjects: [
        { name: 'General Science (Physics/Chem/Bio)', code: 'SCI-MID', type: 'Lab Integrated' },
        { name: 'Mathematics (Algebra, Geometry, Arithmetic)', code: 'MTH-MID', type: 'Core' },
        { name: 'Hindi Literature & Advanced Grammar', code: 'HIN-MID', type: 'Core' },
        { name: 'English Grammar & Spoken English', code: 'ENG-MID', type: 'Core' },
        { name: 'Sanskrit Language & Shlokas', code: 'SAN-MID', type: 'Classical' },
        { name: 'Social Studies (History, Civics, Geography)', code: 'SST-MID', type: 'Core' },
        { name: 'Computer Applications & ICT', code: 'ICT-01', type: 'Lab Practical' },
      ],
      facilities: ['Junior Science Lab', 'Computer Laboratory', 'Central Reading Library'],
      headFaculty: 'Shri Dinesh Gupta (Middle School Incharge)',
    },
    {
      id: 'high-school',
      tabLabel: 'High School (Board)',
      subLabel: 'Classes 9 & 10',
      icon: <Target className="w-4 h-4" />,
      title: 'UP State Board High School Examination Section',
      hindiTitle: 'हाईस्कूल परीक्षा संकाय (कक्षा ९ एवं १०)',
      classes: 'Classes 9 & 10 (UP State Board - Prayagraj)',
      ageGroup: '14 to 15 Years',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
      description:
        'Rigorous preparation for the prestigious UP Board High School Examinations with mandatory physics/chemistry/biology laboratory practicals, chapter assessments, and mock test drills.',
      highlights: [
        '100% NCERT & UP MSP syllabus alignment with past 10-year paper solutions',
        '30-mark mandatory laboratory internal assessments with individual experiment desks',
        'Weekly OMR & subjective test series under strict board examination conditions',
        'Special remedial classes for high-scoring rank holders and merit aspirants',
      ],
      subjects: [
        { name: 'Hindi Sahitya (अनिवार्य हिन्दी)', code: '101', type: 'Theory 100M' },
        { name: 'English Core (Grammar & Prose)', code: '102', type: 'Theory 100M' },
        { name: 'Mathematics (गणित)', code: '103', type: 'Theory 100M' },
        { name: 'Science (विज्ञान - भौतिक, रसायन, जीव)', code: '104', type: '70M Theory + 30M Practical' },
        { name: 'Social Science (सामाजिक विज्ञान)', code: '105', type: 'Theory 100M' },
        { name: 'Computer Applications / Drawing (चित्रकला)', code: '106', type: 'Optional' },
      ],
      facilities: ['State-of-the-Art Science Composite Lab', 'High-Speed Computer Lab', 'Board Examination Hall'],
      headFaculty: 'Dr. Ramesh Kumar Sharma & Senior Board Examiners',
    },
    {
      id: 'inter-pcm',
      tabLabel: 'Intermediate PCM (Science)',
      subLabel: 'Classes 11 & 12 (Tech & Engg)',
      icon: <Calculator className="w-4 h-4" />,
      title: 'Intermediate Science Wing (Physics, Chemistry, Math)',
      hindiTitle: 'इण्टरमीडिएट गणित वर्ग (PCM - भौतिक, रसायन, गणित)',
      classes: 'Classes 11 & 12 (UP Intermediate Board - PCM Stream)',
      ageGroup: '16 to 17 Years',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
      description:
        'Engineered for aspiring engineers, research scholars, defense officers (NDA), and technical leaders. Combines intense state board theoretical rigor with JEE Main foundational problem-solving.',
      highlights: [
        'Dedicated Physics and Chemistry laboratory apparatus for all Board practicals',
        'Advanced Calculus, Coordinate Geometry, Mechanics, and Modern Physics modules',
        'NDA / JEE Main competitive exam guidance by experienced senior lecturers',
        'Regular doubt-clearing sessions and formula workshops',
      ],
      subjects: [
        { name: 'General Hindi (सामान्य हिन्दी)', code: '301', type: 'Theory 100M' },
        { name: 'English Core (अंग्रेजी)', code: '302', type: 'Theory 100M' },
        { name: 'Physics (भौतिक विज्ञान)', code: '303', type: '70M Theory + 30M Practical' },
        { name: 'Chemistry (रसायन विज्ञान)', code: '304', type: '70M Theory + 30M Practical' },
        { name: 'Mathematics (गणित)', code: '305', type: 'Theory 100M' },
      ],
      facilities: ['Dedicated Physics Lab', 'Full Chemistry Lab with Fume Hoods', 'Competitive Exam Library'],
      headFaculty: 'Dr. Ramesh Kumar Sharma (Physics) & Shri Dinesh Gupta (Maths)',
    },
    {
      id: 'inter-pcb',
      tabLabel: 'Intermediate PCB (Medical)',
      subLabel: 'Classes 11 & 12 (Bio & Health)',
      icon: <Microscope className="w-4 h-4" />,
      title: 'Intermediate Science Wing (Physics, Chemistry, Biology)',
      hindiTitle: 'इण्टरमीडिएट जीव विज्ञान वर्ग (PCB - भौतिक, रसायन, जीव विज्ञान)',
      classes: 'Classes 11 & 12 (UP Intermediate Board - PCB Stream)',
      ageGroup: '16 to 17 Years',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80',
      description:
        'Designed for future doctors, biotechnologists, agricultural scientists, and healthcare leaders. Features advanced dissection models, botanical specimens, and NEET foundation concepts.',
      highlights: [
        'High-magnification microscopes, permanent slide banks, and preserved specimens',
        'Deep coverage of Botany, Zoology, Human Physiology, Genetics & Ecology',
        'NEET preparation concepts integrated into board lessons',
        'Bio-chemistry and organic laboratory practical mastery',
      ],
      subjects: [
        { name: 'General Hindi (सामान्य हिन्दी)', code: '301', type: 'Theory 100M' },
        { name: 'English Core (अंग्रेजी)', code: '302', type: 'Theory 100M' },
        { name: 'Physics (भौतिक विज्ञान)', code: '303', type: '70M Theory + 30M Practical' },
        { name: 'Chemistry (रसायन विज्ञान)', code: '304', type: '70M Theory + 30M Practical' },
        { name: 'Biology (जीव विज्ञान - वनस्पति एवं जन्तु)', code: '306', type: '70M Theory + 30M Practical' },
      ],
      facilities: ['Modern Biology & Botanical Lab', 'Chemical Analysis Lab', 'Herbarium & Specimen Bank'],
      headFaculty: 'Dr. Alok Tripathi (Senior Biology Lecturer)',
    },
  ];

  const currentStage = academicStages.find((s) => s.id === activeTab) || academicStages[2];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <PublicNavbar />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-[#001845] via-[#002060] to-[#023e8a] text-white pt-16 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10 pb-4">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Curriculum &amp; Academic Pathways &bull; शैक्षणिक पाठ्यक्रम</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight text-white leading-tight">
            Comprehensive Academic Roadmap <br className="hidden sm:inline" />
            <span className="text-amber-300">From Nursery to Class 12 Board</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Fully affiliated with UP Board (Prayagraj). Explore our stage-wise curricula, state board examination frameworks, advanced science laboratories, and subject combinations.
          </p>
        </div>
      </section>

      {/* Interactive Tab Switcher Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 sm:-mt-14 z-20 w-full">
        <div className="bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
          {academicStages.map((stage) => {
            const isActive = activeTab === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveTab(stage.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  isActive
                    ? 'bg-[#002060] text-white shadow-md scale-100 ring-2 ring-blue-400/30'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                    isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {stage.icon}
                </div>
                <div className="text-left">
                  <div className="font-extrabold leading-tight">{stage.tabLabel}</div>
                  <div className={`text-[10px] hidden sm:block ${isActive ? 'text-blue-200' : 'text-slate-400'}`}>
                    {stage.subLabel}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Active Stage Detailed Content Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 animate-in fade-in zoom-in-95 duration-200">
          {/* Left Column: Information, Subjects & Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-blue-100 text-blue-900 font-extrabold text-[11px] px-3 py-1 rounded-full border border-blue-200">
                  {currentStage.classes}
                </span>
                <span className="bg-amber-100 text-amber-900 font-extrabold text-[11px] px-3 py-1 rounded-full border border-amber-200">
                  Age: {currentStage.ageGroup}
                </span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-slate-900 font-serif">
                {currentStage.title}
              </h2>
              <p className="text-xs sm:text-sm font-bold text-amber-900 font-serif">
                {currentStage.hindiTitle}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                {currentStage.description}
              </p>
            </div>

            {/* Pedagogical Highlights */}
            <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-700" /> Academic Highlights &amp; Pedagogical Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentStage.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Structured Subject Ledger */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" /> Prescribed Subject Curriculum &amp; Evaluation Code
                </h4>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-extrabold uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Subject Name</th>
                      <th className="p-3">Course Code</th>
                      <th className="p-3 text-right">Evaluation Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                    {currentStage.subjects.map((sub, sIdx) => (
                      <tr key={sIdx} className="hover:bg-slate-50 transition">
                        <td className="p-3 font-bold text-slate-900">{sub.name}</td>
                        <td className="p-3 font-mono font-bold text-blue-700">{sub.code}</td>
                        <td className="p-3 text-right font-semibold text-slate-600">{sub.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Faculty Coordinator & CTA */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-600 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-blue-700" />
                <span>
                  <strong>Dean / Incharge:</strong> {currentStage.headFaculty}
                </span>
              </div>

              <Link
                href="/admission"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-[#002060] hover:bg-blue-900 text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-md transition"
              >
                <span>Apply for {currentStage.tabLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Visual, Laboratory & Facilities */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {/* Visual Image Banner */}
            <div className="relative h-64 sm:h-80 w-full rounded-3xl overflow-hidden shadow-lg border-2 border-slate-200 group">
              <img
                src={currentStage.image}
                alt={currentStage.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">
                  UP Board Affiliated &bull; Sarswati Gyan Mandir
                </span>
                <h3 className="font-serif font-black text-base sm:text-lg text-white">{currentStage.title}</h3>
              </div>
            </div>

            {/* Dedicated Laboratories & Infrastructure Card */}
            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-3">
              <h4 className="text-xs font-black text-blue-950 uppercase tracking-wider flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-blue-700" /> Campus Facilities Allocated to this Stage
              </h4>
              <div className="space-y-2">
                {currentStage.facilities.map((fac, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-xs font-bold text-slate-800 bg-white p-2.5 rounded-xl border border-blue-100 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{fac}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prospectus Download Box */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white flex items-center justify-between gap-4">
              <div>
                <h5 className="font-bold text-xs text-amber-300">Official Syllabus Prospectus</h5>
                <p className="text-[11px] text-slate-300 mt-0.5">Session 2026-27 Academic Guide</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-white border-slate-700 hover:bg-slate-800 text-xs font-bold whitespace-nowrap"
                onClick={() => window.print()}
                leftIcon={<FileDown className="w-3.5 h-3.5 text-amber-400" />}
              >
                Print / Save PDF
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Board Examination Assessment Framework */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/20 px-4 py-1.5 rounded-full border border-amber-400/40">
              Evaluation &amp; Terminal Assessment
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-serif">
              Continuous Assessment &amp; UP Board Examination Pattern
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Our academic calendar follows a structured evaluation format designed to remove exam anxiety while ensuring consistent Board excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-3 hover:border-amber-400/50 transition">
              <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-xs">
                01
              </div>
              <h4 className="text-sm font-black text-white">Quarterly Unit Tests (UT 1 &amp; 2)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Chapter-wise formative tests (50 Marks) held every quarter with instant digital parent report cards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-3 hover:border-blue-400/50 transition">
              <div className="w-8 h-8 rounded-xl bg-blue-400/20 text-blue-300 flex items-center justify-center font-bold text-xs">
                02
              </div>
              <h4 className="text-sm font-black text-white">Half-Yearly Examination</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mid-term comprehensive theory (70 Marks) and internal laboratory practical evaluation (30 Marks).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-3 hover:border-emerald-400/50 transition">
              <div className="w-8 h-8 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center font-bold text-xs">
                03
              </div>
              <h4 className="text-sm font-black text-white">Pre-Board Simulated Series</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Strict UP Board simulated mock exams for Class 10 &amp; Class 12 with external evaluation standards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-3 hover:border-indigo-400/50 transition">
              <div className="w-8 h-8 rounded-xl bg-indigo-400/20 text-indigo-300 flex items-center justify-center font-bold text-xs">
                04
              </div>
              <h4 className="text-sm font-black text-white">Final Board &amp; Promotion</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                State Board exams and institutional promotion ledger with verified academic merit ranks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Co-Curricular & Holistic Development Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 w-full space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Holistic Growth
          </span>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 font-serif">
            Co-Curricular &amp; Character Building Programs
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <FlaskConical className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 font-serif">Science &amp; Robotic Fairs</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Annual working model exhibits, district Olympiad prep, and experimental science clubs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 font-serif">Vedic Sanskriti &amp; Yoga</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Daily morning prayers, Gita shloka recitation, yoga asanas, and value-based moral education.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 font-serif">Sports &amp; Athletics Meet</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Kabaddi, Volleyball, Cricket, Track &amp; Field races with inter-house championship cups.
            </p>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
