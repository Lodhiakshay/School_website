'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FlaskConical,
  Laptop,
  BookOpen,
  Bus,
  Trophy,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  SunMedium,
  HeartPulse,
} from 'lucide-react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';
import { Button } from '../../components/ui/button';

export default function FacilitiesPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const facilityList = [
    {
      id: 'physics',
      title: 'Advanced Physics Laboratory',
      category: 'science',
      categoryLabel: 'Science & Research',
      icon: <FlaskConical className="w-6 h-6 text-blue-600" />,
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
      desc: 'Spacious dark-room setup for optics, modern spectrometers, potentiometer benches, sonometers, and electronic digital meters adhering to UP Board practical standards.',
      features: [
        'Individual student experiment work tables',
        'Optics & dark room laser benches',
        'Safety circuit breakers & electrical earthing',
        'Analog & digital multimeters with calibration units',
      ],
    },
    {
      id: 'chemistry',
      title: 'Advanced Chemistry Laboratory',
      category: 'science',
      categoryLabel: 'Science & Research',
      icon: <FlaskConical className="w-6 h-6 text-emerald-600" />,
      image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80',
      desc: 'Equipped with chemical fume hoods, precision analytical balances, reagent distribution racks, distillation units, and full fire-extinguisher safety installations.',
      features: [
        'LPG gas burner pipeline grid with emergency cutoff',
        'Analytical electronic balances (0.001g precision)',
        'Dedicated organic titration & salt analysis counters',
        'First-aid & eye-wash safety shower units',
      ],
    },
    {
      id: 'biology',
      title: 'Biology & Botanical Discovery Lab',
      category: 'science',
      categoryLabel: 'Life Sciences',
      icon: <FlaskConical className="w-6 h-6 text-amber-600" />,
      image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80',
      desc: 'Features high-magnification compound microscopes, human anatomical models, preserved specimen jars, botanical herbarium collections, and projection displays.',
      features: [
        'Compound & binocular microscopes for cell study',
        'Permanent slide archives (Histology & Cytology)',
        'Herbarium & botanical garden specimen linkage',
        'Interactive 3D human anatomical skeleton models',
      ],
    },
    {
      id: 'computer',
      title: 'Digital Computer Science Center',
      category: 'technology',
      categoryLabel: 'Technology & Coding',
      icon: <Laptop className="w-6 h-6 text-indigo-600" />,
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
      desc: 'Air-conditioned digital facility housing 40+ high-speed desktop computers, gigabit fiber broadband connectivity, uninterruptible power backup, and modern coding environments.',
      features: [
        '40+ individual workstations with high-speed fiber line',
        'Python, C++, SQL, and MS Office preloaded suites',
        'Interactive smart board display for teacher coding demos',
        '100% online solar UPS power backup',
      ],
    },
    {
      id: 'library',
      title: 'Central Knowledge Library',
      category: 'library',
      categoryLabel: 'Literacy & Research',
      icon: <BookOpen className="w-6 h-6 text-purple-600" />,
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
      desc: 'Spanning over 5,000 cataloged books, NCERT reference collections, competitive exam primers (JEE, NEET, NDA, UPPSC), periodicals, daily newspapers, and quiet study alcoves.',
      features: [
        '5,240+ cataloged reference volumes and text books',
        'National daily newspapers in Hindi & English',
        'Automated barcode circulation & issue desk',
        'Air-cooled quiet study hall seating 80+ scholars',
      ],
    },
    {
      id: 'sports',
      title: 'Sports Complex & Athletic Grounds',
      category: 'sports',
      categoryLabel: 'Physical Education',
      icon: <Trophy className="w-6 h-6 text-rose-600" />,
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
      desc: '2.5-acre lush green sports field with dedicated courts for Volleyball, Badminton, Kho-Kho, Kabaddi, Cricket turf, and a 200-meter athletics running track.',
      features: [
        'Standard 200m athletic sprint & relay track',
        'Volleyball & Badminton synthetic marked courts',
        'Cricket practice net with turf pitch',
        'Annual inter-college tournament host venue',
      ],
    },
    {
      id: 'transport',
      title: 'Safe Institutional Transport Fleet',
      category: 'transport',
      categoryLabel: 'Logistics & Safety',
      icon: <Bus className="w-6 h-6 text-amber-500" />,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
      desc: 'Fleet of yellow school buses equipped with GPS live tracking, speed governors, first-aid boxes, CCTV surveillance, and licensed experienced drivers covering Farrukhabad.',
      features: [
        'Live GPS tracking with parent mobile SMS updates',
        'Speed governors locked to safe limits (max 40 km/h)',
        'Female bus attendant on all primary routes',
        '28 km coverage spanning Shamsabad & Farrukhabad',
      ],
    },
  ];

  const filtered =
    activeCategory === 'all'
      ? facilityList
      : facilityList.filter((f) => f.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <PublicNavbar />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-[#001845] via-[#002060] to-[#023e8a] text-white pt-16 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10 pb-4">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Campus Infrastructure &bull; शिक्षण एवं शोध सुविधाएं</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight text-white leading-tight">
            World-Class Campus Facilities &amp; Labs
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Discover our experiential learning laboratories, air-conditioned digital computer center, 5,000+ volume central library, sports grounds, and GPS bus fleet.
          </p>
        </div>
      </section>

      {/* Interactive Category Filter Tabs */}
      <section className="max-w-6xl mx-auto px-3 sm:px-6 -mt-10 sm:-mt-14 z-20 w-full overflow-hidden">
        <div className="bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar max-w-full">
          {[
            { id: 'all', label: 'All Campus Facilities (7)' },
            { id: 'science', label: 'Science Laboratories (3)' },
            { id: 'technology', label: 'Computer IT Lab' },
            { id: 'library', label: 'Central Library' },
            { id: 'sports', label: 'Sports Arena' },
            { id: 'transport', label: 'GPS Bus Fleet' },
          ].map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  isActive
                    ? 'bg-[#002060] text-white shadow-md scale-100 ring-2 ring-blue-400/30'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Facilities Showcase Cards */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-10">
          {filtered.map((fac, idx) => (
            <div
              key={fac.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={`lg:col-span-6 space-y-4 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    {fac.categoryLabel}
                  </span>
                </div>
                <h2 className="text-xl sm:text-3xl font-black text-slate-900 font-serif">
                  {fac.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{fac.desc}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {fac.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="relative h-72 sm:h-80 w-full rounded-3xl overflow-hidden shadow-lg border border-slate-200 group">
                  <img
                    src={fac.image}
                    alt={fac.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-md">
                    {fac.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Safety & Environment Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400">
              Campus Security &amp; Well-being
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-serif">
              Safe, Secure &amp; 100% Monitored Environment
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              We prioritize the physical, emotional, and digital safety of every scholar with dedicated on-campus protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700 space-y-2 text-center">
              <ShieldCheck className="w-8 h-8 text-blue-400 mx-auto" />
              <h4 className="font-bold text-sm text-white">24/7 CCTV &amp; Security</h4>
              <p className="text-xs text-slate-300">High-definition cameras across corridors, entrances, laboratories, and grounds.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700 space-y-2 text-center">
              <SunMedium className="w-8 h-8 text-amber-400 mx-auto" />
              <h4 className="font-bold text-sm text-white">Solar Power &amp; RO Water</h4>
              <p className="text-xs text-slate-300">Continuous solar power backup and multi-stage commercial RO purified drinking water plants.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700 space-y-2 text-center">
              <HeartPulse className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="font-bold text-sm text-white">Medical First-Aid Room</h4>
              <p className="text-xs text-slate-300">Equipped sick-bay with trained staff and tie-ups with Shamsabad emergency health clinics.</p>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
