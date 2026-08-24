'use client';

import React from 'react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';
import { Calendar, Clock, MapPin, Sparkles, Award } from 'lucide-react';

export default function EventsPage() {
  const events = [
    {
      title: 'UP Board Mock Pre-Board Examination Series',
      date: '05 Mar 2026 - 15 Mar 2026',
      time: '09:00 AM - 12:15 PM',
      venue: 'Main Examination Halls (Room 101-112)',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      desc: 'Comprehensive simulated UP Board examination for all Class 10 and Class 12 registered students with external evaluators.',
    },
    {
      title: 'Annual Science & Tech Exhibition 2026',
      date: '22 Mar 2026',
      time: '10:00 AM - 03:30 PM',
      venue: 'Science Laboratory Quadrangle',
      image: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?auto=format&fit=crop&w=800&q=80',
      desc: 'Working model display by senior science scholars featuring solar renewable energy, hydraulic cranes, and environmental robotics.',
    },
    {
      title: 'Inter-College Athletics Championship Meet',
      date: '28 Mar 2026',
      time: '08:30 AM - 04:00 PM',
      venue: 'School Athletic Ground & Sports Turf',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
      desc: 'District level athletic track events, high jump, shot-put, volleyball finals, and grand award distribution ceremony.',
    },
    {
      title: 'New Academic Session 2026-27 Orientation Day',
      date: '05 Apr 2026',
      time: '09:30 AM - 01:00 PM',
      venue: 'Auditorium & Primary Wing',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
      desc: 'Welcoming newly enrolled scholars and parents with classroom tours, teacher introductions, and textbook distribution.',
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
            backgroundImage: `url('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-blue-950/80" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/20 px-4 py-1.5 rounded-full border border-amber-400/40">
            Institutional Calendar
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-serif">
            Upcoming Events &amp; Celebrations
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Mark your calendar for upcoming examinations, exhibitions, athletics meets, and institutional celebrations.
          </p>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-6">
          {events.map((ev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 items-center"
            >
              <div className="lg:col-span-8 space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-blue-700">
                  <span className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    <Calendar className="w-3.5 h-3.5" />
                    {ev.date}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    {ev.time}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    {ev.venue}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
                  {ev.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{ev.desc}</p>
              </div>

              <div className="lg:col-span-4">
                <div className="relative h-48 w-full rounded-2xl overflow-hidden shadow-md group">
                  <img
                    src={ev.image}
                    alt={ev.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
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
