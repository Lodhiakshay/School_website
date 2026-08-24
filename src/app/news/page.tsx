'use client';

import React from 'react';
import Link from 'next/link';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';
import { Bell, Calendar, Clock, ArrowRight, Sparkles, Download, Pin } from 'lucide-react';

export default function NewsPage() {
  const notices = [
    {
      title: 'Online Admissions Open for Academic Session 2026-2027',
      date: '20 Feb 2026',
      category: 'Admission Desk',
      isPinned: true,
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      summary: 'Admissions are now open for Nursery to Class 9 and Class 11 (Science PCM/PCB & Arts streams). Parents can submit the online inquiry form or visit the campus admission desk.',
    },
    {
      title: 'UP Board Practical Examination 2026 Schedule for Class 10 & 12',
      date: '16 Feb 2026',
      category: 'Board Examination',
      isPinned: true,
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
      summary: 'Practical examinations for Physics (303), Chemistry (304), and Biology (306) will commence from 25th February 2026 in the college laboratory block under external UP Board examiners.',
    },
    {
      title: 'Sarswati Puja Celebrations & Annual Cultural Program',
      date: '14 Feb 2026',
      category: 'Cultural Event',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      summary: 'The institution commemorated Vasant Panchami with Vedic havan, musical bhajans by students, and classical dance performances in the main auditorium.',
    },
    {
      title: 'Parent-Teacher Meeting (PTM) & Unit Test 1 Result Distribution',
      date: '08 Feb 2026',
      category: 'Academic Circular',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      summary: 'All parents and guardians are requested to attend the PTM to collect verified student marksheets and discuss subject improvement strategies with class teachers.',
    },
    {
      title: 'District Science Exhibition Winner Felicitation',
      date: '01 Feb 2026',
      category: 'Student Achievement',
      image: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?auto=format&fit=crop&w=800&q=80',
      summary: 'Our school robotics and solar irrigation project won the 1st prize in the Farrukhabad District Inter-College Science Fair 2026.',
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
            Circulars &amp; Announcements
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-serif">
            School News &amp; Official Circulars
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Stay informed with the latest exam timetables, holiday schedules, admission alerts, and campus achievements.
          </p>
        </div>
      </section>

      {/* News & Circulars List */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notices.map((n, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={n.image}
                    alt={n.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-blue-950/90 text-amber-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
                    {n.isPinned && <Pin className="w-3 h-3 text-amber-400" />}
                    <span>{n.category}</span>
                  </div>
                </div>

                <div className="p-6 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{n.date}</span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 font-serif group-hover:text-blue-700 transition leading-snug">
                    {n.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{n.summary}</p>
                </div>
              </div>

              <div className="p-6 pt-0 flex justify-between items-center text-xs font-bold text-blue-700">
                <span className="text-[11px] text-slate-500">Issued by Administration</span>
                <span className="group-hover:translate-x-1 transition-transform">Read Notice &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
