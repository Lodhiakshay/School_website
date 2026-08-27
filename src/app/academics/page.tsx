'use client';

import React, { useState, useEffect } from 'react';
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
  TrendingUp,
} from 'lucide-react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';
import { Button } from '../../components/ui/button';
import { apiClient } from '../../lib/api-client';

const STARTER_STAGES = [
  {
    id: 'primary',
    tabLabel: 'Primary Wing',
    subLabel: 'Nursery to Class 5',
    iconType: 'primary',
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
    iconType: 'middle',
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
    iconType: 'high-school',
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
    tabLabel: 'Intermediate PCM',
    subLabel: 'Classes 11 & 12 (Engineering)',
    iconType: 'inter-pcm',
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
    tabLabel: 'Intermediate PCB',
    subLabel: 'Classes 11 & 12 (Medical)',
    iconType: 'inter-pcb',
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
  {
    id: 'inter-commerce',
    tabLabel: 'Commerce & Arts',
    subLabel: 'Classes 11 & 12 (Business & Admin)',
    iconType: 'commerce',
    title: 'Intermediate Commerce & Humanities Wing',
    hindiTitle: 'इण्टरमीडिएट वाणिज्य एवं कला वर्ग',
    classes: 'Classes 11 & 12 (UP Intermediate Board - Commerce & Arts)',
    ageGroup: '16 to 17 Years',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
    description:
      'Empowering future chartered accountants, banking professionals, civil service aspirants, and corporate executives through accounting practices, business economics, and public administration.',
    highlights: [
      'Financial Accounting balance sheet workshops and taxation principles',
      'Micro & Macro Economics, Business Organization and Commercial Math',
      'Civil Services (UPSC / UPPSC) general studies foundations for Humanities scholars',
      'Career mentorship for CA Foundation, CUET, and Banking entrance exams',
    ],
    subjects: [
      { name: 'General Hindi (सामान्य हिन्दी)', code: '301', type: 'Theory 100M' },
      { name: 'English Core (अंग्रेजी)', code: '302', type: 'Theory 100M' },
      { name: 'Accountancy / Vahi-Khata (बहीखाता)', code: '311', type: 'Theory 100M' },
      { name: 'Business Organization (व्यापारिक संगठन)', code: '312', type: 'Theory 100M' },
      { name: 'Economics / Commercial Math (अर्थशास्त्र)', code: '313', type: 'Theory 100M' },
    ],
    facilities: ['Commerce Accounting Lab', 'Economics Reference Library', 'Mock Corporate Boardroom'],
    headFaculty: 'Shri Manoj Kumar Mishra (Senior Commerce Head)',
  },
];

export default function AcademicsPage() {
  const [stages, setStages] = useState<any[]>(STARTER_STAGES);
  const [activeTab, setActiveTab] = useState('high-school');

  useEffect(() => {
    apiClient
      .get('/school')
      .then((res) => {
        const remoteWings = res.data?.data?.academicWings;
        if (remoteWings && Array.isArray(remoteWings) && remoteWings.length > 0) {
          const activeWings = remoteWings.filter((w: any) => w.isActive !== false);
          if (activeWings.length > 0) {
            // Match with starter details or use dynamic CMS data
            const merged = activeWings.map((w: any, idx: number) => {
              const matched = STARTER_STAGES.find((s) => s.id === w.slug || s.title.toLowerCase().includes(w.title.toLowerCase()));
              if (matched) {
                return {
                  ...matched,
                  title: w.title || matched.title,
                  classes: w.grades || matched.classes,
                  image: w.image || matched.image,
                  description: w.desc || matched.description,
                };
              }
              return {
                id: w.slug || `wing_${idx}`,
                tabLabel: w.title,
                subLabel: w.grades,
                iconType: 'general',
                title: w.title,
                hindiTitle: w.title,
                classes: w.grades,
                ageGroup: '3 to 18 Years',
                image: w.image || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
                description: w.desc || 'Comprehensive state board curriculum roadmap.',
                highlights: [
                  'Full UP Board & NCERT aligned coursework',
                  'Mandatory practical experiments and lab assessments',
                  'Weekly tests with past 10-year question solutions',
                ],
                subjects: [
                  { name: 'General Hindi', code: '101', type: 'Core' },
                  { name: 'English Core', code: '102', type: 'Core' },
                  { name: 'Mathematics / Science', code: '103', type: 'Core' },
                ],
                facilities: ['Science Lab', 'Computer Workstations', 'Central Library'],
                headFaculty: 'Senior Department Faculty',
              };
            });
            setStages(merged);
            if (!merged.some((m: any) => m.id === activeTab)) {
              setActiveTab(merged[0]?.id || 'high-school');
            }
          }
        }
      })
      .catch(() => {});
  }, []);

  const currentStage = stages.find((s) => s.id === activeTab) || stages[0];

  const getStageIcon = (type: string) => {
    switch (type) {
      case 'primary':
        return <Palette className="w-4 h-4" />;
      case 'middle':
        return <Compass className="w-4 h-4" />;
      case 'high-school':
        return <Target className="w-4 h-4" />;
      case 'inter-pcm':
        return <Calculator className="w-4 h-4" />;
      case 'inter-pcb':
        return <Microscope className="w-4 h-4" />;
      case 'commerce':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <GraduationCap className="w-4 h-4" />;
    }
  };

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
      <section className="max-w-7xl mx-auto px-3 sm:px-6 -mt-10 sm:-mt-14 z-20 w-full overflow-hidden">
        <div className="bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar max-w-full">
          {stages.map((stage) => {
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
                  {getStageIcon(stage.iconType)}
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
      {currentStage && (
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
                    Age Group: {currentStage.ageGroup}
                  </span>
                </div>

                <h2 className="text-xl sm:text-3xl font-black text-slate-900 font-serif leading-tight">
                  {currentStage.title}
                </h2>
                {currentStage.hindiTitle && (
                  <p className="text-xs sm:text-sm font-bold text-slate-500 font-serif">
                    {currentStage.hindiTitle}
                  </p>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentStage.description}
              </p>

              {/* Key Pedagogical Highlights */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" /> Key Pedagogical Pillars &amp; Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentStage.highlights.map((h: string, hIdx: number) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subject Matrix Table */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" /> Prescribed Subject Matrix &amp; Evaluation
                </h3>
                <div className="rounded-2xl border border-slate-200 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-500 border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Subject Name</th>
                        <th className="py-2.5 px-3">Subject Code</th>
                        <th className="py-2.5 px-3 text-right">Assessment Framework</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {currentStage.subjects.map((sub: any, sIdx: number) => (
                        <tr key={sIdx} className="hover:bg-slate-50/80">
                          <td className="py-2.5 px-3 font-bold text-slate-900">{sub.name}</td>
                          <td className="py-2.5 px-3 font-mono text-[11px] text-blue-700">{sub.code}</td>
                          <td className="py-2.5 px-3 text-right">
                            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-mono text-[10px]">
                              {sub.type}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="/admissions">
                  <Button className="bg-[#002060] hover:bg-blue-900 text-white font-bold" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Apply Online for 2026-27
                  </Button>
                </Link>
                <Link href="/downloads">
                  <Button variant="outline" rightIcon={<FileDown className="w-4 h-4" />}>
                    Download Scheme &amp; Circulars
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Photo & Academic Leadership Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-950">
                <img
                  src={currentStage.image}
                  alt={currentStage.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-5">
                  <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
                    {currentStage.classes} &bull; Academic Laboratory Integrated
                  </span>
                </div>
              </div>

              {/* Connected Facilities & Faculty Card */}
              <div className="p-5 rounded-3xl bg-blue-50/60 border border-blue-200 space-y-4 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-800">
                    Integrated Laboratories &amp; Infrastructure
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {currentStage.facilities.map((fac: string, facIdx: number) => (
                      <span
                        key={facIdx}
                        className="bg-white px-2.5 py-1 rounded-lg border border-blue-200 font-bold text-slate-800 text-[11px]"
                      >
                        ✓ {fac}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-blue-200/80">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-800 block mb-1">
                    Academic Incharge &amp; Faculty Lead
                  </span>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-blue-700" />
                    <span className="font-bold text-slate-900">{currentStage.headFaculty}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <PublicFooter />
    </div>
  );
}
