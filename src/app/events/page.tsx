'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Award,
  BookOpen,
  Trophy,
  Users,
  X,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';
import { Button } from '../../components/ui/button';

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  const events = [
    {
      id: 'ev_01',
      title: 'UP Board Mock Pre-Board Examination Series',
      category: 'academic',
      categoryLabel: 'Academic Exam',
      date: '05 Mar 2026 - 15 Mar 2026',
      time: '09:00 AM - 12:15 PM',
      venue: 'Main Examination Halls (Room 101-112)',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
      desc: 'Comprehensive simulated UP Board examination for all Class 10 and Class 12 registered students with external evaluators and OMR evaluation.',
      details: [
        'Class 10 & 12 Board candidates must carry admit cards and geometry kits.',
        'Strict state board seating plans and invigilation protocols will be enforced.',
        'Answer scripts will be evaluated by senior external board evaluators.',
      ],
    },
    {
      id: 'ev_02',
      title: 'Annual Science & Robotics Innovation Fair 2026',
      category: 'science',
      categoryLabel: 'Science & Tech',
      date: '22 Mar 2026',
      time: '10:00 AM - 03:30 PM',
      venue: 'Science Laboratory Quadrangle & Block B',
      image: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?auto=format&fit=crop&w=1200&q=80',
      desc: 'Working model exhibits by senior science scholars featuring solar renewable energy, hydraulic cranes, and environmental robotics.',
      details: [
        'Over 80+ working scientific models presented by Classes 6 through 12.',
        'Special jury panel featuring professors from Kanpur & Agra Universities.',
        'Cash prizes and gold medals for Top 3 scientific innovations.',
      ],
    },
    {
      id: 'ev_03',
      title: 'Inter-College Athletics Championship Meet',
      category: 'sports',
      categoryLabel: 'Sports Meet',
      date: '28 Mar 2026',
      time: '08:30 AM - 04:00 PM',
      venue: 'School Athletic Ground & Sports Turf',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
      desc: 'District level athletic track events, high jump, shot-put, volleyball finals, and grand award distribution ceremony.',
      details: [
        '100m, 200m, 400m sprint finals, long jump, shot-put, and volleyball.',
        'Inter-House Championship Trophy (Shivaji, Maharana, Tagore, Raman Houses).',
        'Chief Guest: District Sports Officer (DSO), Farrukhabad.',
      ],
    },
    {
      id: 'ev_04',
      title: 'New Academic Session 2026-27 Orientation Day',
      category: 'cultural',
      categoryLabel: 'Institutional',
      date: '05 Apr 2026',
      time: '09:30 AM - 01:00 PM',
      venue: 'Auditorium & Primary Wing Quadrangle',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
      desc: 'Welcoming newly enrolled scholars and parents with classroom tours, teacher introductions, and textbook distribution.',
      details: [
        'Interactive meet-and-greet with Principal and Class Mentors.',
        'Distribution of NCERT course books, school uniform kits, and ID badges.',
        'Guidance on the School ERP Parent App login and bus route pickup points.',
      ],
    },
  ];

  const filteredEvents =
    activeFilter === 'all'
      ? events
      : events.filter((ev) => ev.category === activeFilter);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <PublicNavbar />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-[#001845] via-[#002060] to-[#023e8a] text-white py-14 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Institutional Calendar &bull; कार्यक्रम एवं उत्सव</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight text-white leading-tight">
            Upcoming Events &amp; Celebrations
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Stay updated with state board mock examination series, science exhibitions, inter-college athletic tournaments, and cultural celebrations.
          </p>
        </div>
      </section>

      {/* Interactive Category Filter Tabs */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 -mt-6 sm:-mt-8 z-20 w-full">
        <div className="bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Calendar Events (4)' },
            { id: 'academic', label: 'Board Examinations' },
            { id: 'science', label: 'Science & Tech Fairs' },
            { id: 'sports', label: 'Athletics & Sports' },
            { id: 'cultural', label: 'Orientation & Cultural' },
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
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

      {/* Events List */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-6">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 items-center"
            >
              <div className="lg:col-span-8 space-y-3">
                <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold">
                  <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full border border-blue-200">
                    {ev.categoryLabel}
                  </span>
                  <span className="flex items-center gap-1 bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                    <Calendar className="w-3.5 h-3.5 text-blue-700" />
                    {ev.date}
                  </span>
                  <span className="flex items-center gap-1 bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    {ev.time}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
                  {ev.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{ev.desc}</p>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold pt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{ev.venue}</span>
                </div>

                <div className="pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedEvent(ev)}
                    className="text-xs font-bold"
                  >
                    View Event Details &amp; Guidelines &rarr;
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="relative h-56 w-full rounded-2xl overflow-hidden shadow-md group">
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

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col p-6 shadow-2xl border-2 border-slate-900 animate-in zoom-in-95 duration-200 my-auto overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-shrink-0">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  {selectedEvent.categoryLabel}
                </span>
                <h3 className="text-sm font-black text-slate-900 font-serif mt-1">
                  {selectedEvent.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 py-4 space-y-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                <p className="flex items-center gap-2 text-slate-700 font-bold">
                  <Calendar className="w-3.5 h-3.5 text-blue-700" /> Date: {selectedEvent.date}
                </p>
                <p className="flex items-center gap-2 text-slate-700 font-bold">
                  <Clock className="w-3.5 h-3.5 text-amber-600" /> Timing: {selectedEvent.time}
                </p>
                <p className="flex items-center gap-2 text-slate-700 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Venue: {selectedEvent.venue}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Event Guidelines &amp; Protocol:
                </h4>
                <div className="space-y-1.5">
                  {selectedEvent.details.map((d: string, i: number) => (
                    <div key={i} className="flex items-start gap-2 text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-slate-200 flex-shrink-0">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-bold text-xs shadow-sm"
              >
                Contact Helpdesk Regarding Event
              </Link>
              <Button type="button" variant="outline" onClick={() => setSelectedEvent(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <PublicFooter />
    </div>
  );
}
