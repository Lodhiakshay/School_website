'use client';

import React from 'react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';
import { FlaskConical, Laptop, BookOpen, Bus, Trophy, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

export default function FacilitiesPage() {
  const facilityList = [
    {
      title: 'Advanced Physics Laboratory',
      category: 'Science & Research',
      icon: <FlaskConical className="w-6 h-6 text-blue-600" />,
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
      desc: 'Spacious dark-room setup for optics, modern spectrometers, potentiometer benches, sonometers, and electronic digital meters adhering to UP Board practical standards.',
      features: ['Individual student work tables', 'Safety circuit breakers & earthing', 'Digital and analog multimeters', 'Telescopic & laser apparatus'],
    },
    {
      title: 'Advanced Chemistry Laboratory',
      category: 'Science & Research',
      icon: <FlaskConical className="w-6 h-6 text-emerald-600" />,
      image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80',
      desc: 'Equipped with chemical fume hoods, precision analytical balances, reagent distribution racks, distillation units, and full fire-extinguisher safety installations.',
      features: ['LPG gas burner pipeline grid', 'Analytical electronic balances', 'Dedicated organic titration counters', 'First-aid & eye-wash safety units'],
    },
    {
      title: 'Biology & Botanical Discovery Lab',
      category: 'Life Sciences',
      icon: <FlaskConical className="w-6 h-6 text-amber-600" />,
      image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
      desc: 'Features high-magnification compound microscopes, human anatomical models, preserved specimen jars, botanical herbarium collections, and projection displays.',
      features: ['Compound & binocular microscopes', 'Permanent slide archives', 'Herbarium & botanical garden linkage', 'Interactive anatomical 3D models'],
    },
    {
      title: 'Digital Computer Science Center',
      category: 'Technology & Coding',
      icon: <Laptop className="w-6 h-6 text-indigo-600" />,
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
      desc: 'Air-conditioned digital facility housing 40+ high-speed desktop computers, gigabit fiber broadband connectivity, uninterruptible power backup, and modern coding environments.',
      features: ['High-speed fiber internet line', 'Python, C++, SQL software suites', 'Interactive smart board display', '100% online UPS power backup'],
    },
    {
      title: 'Central Knowledge Library',
      category: 'Literacy & Research',
      icon: <BookOpen className="w-6 h-6 text-purple-600" />,
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
      desc: 'Spanning over 5,000 cataloged books, NCERT reference collections, competitive exam primers (JEE, NEET, NDA, UPPSC), periodicals, daily newspapers, and quiet study alcoves.',
      features: ['5,000+ cataloged reference books', 'National daily newspapers in Hindi/English', 'Automated RFID barcode issue desk', 'Dedicated quiet reading hall'],
    },
    {
      title: 'Sports Complex & Athletic Grounds',
      category: 'Physical Education',
      icon: <Trophy className="w-6 h-6 text-rose-600" />,
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
      desc: '2.5-acre lush green sports field with dedicated courts for Volleyball, Badminton, Kho-Kho, Kabaddi, Cricket turf, and a 200-meter athletics running track.',
      features: ['Standard 200m running track', 'Volleyball & Badminton courts', 'Cricket net practice turf', 'Annual district sports host'],
    },
    {
      title: 'Safe Institutional Transport Fleet',
      category: 'Logistics & Safety',
      icon: <Bus className="w-6 h-6 text-amber-500" />,
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      desc: 'Fleet of yellow school buses equipped with GPS live tracking, speed governors, first-aid boxes, CCTV surveillance, and licensed experienced drivers covering Farrukhabad.',
      features: ['GPS live vehicle tracking', 'Speed governors (max 40 km/h)', 'Female bus attendant on all routes', 'Comprehensive route coverage'],
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
            backgroundImage: `url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-blue-950/80" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/20 px-4 py-1.5 rounded-full border border-amber-400/40">
            World-Class Infrastructure
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-serif">
            Campus Facilities &amp; Science Labs
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Discover our experiential learning laboratories, digital computer center, library, and sports complex.
          </p>
        </div>
      </section>

      {/* Facilities Showcase */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="space-y-12">
          {facilityList.map((fac, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={`lg:col-span-6 space-y-4 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    {fac.category}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
                  {fac.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{fac.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
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
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-md">
                    {fac.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
