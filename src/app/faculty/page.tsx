'use client';

import React, { useState } from 'react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';
import { GraduationCap, Award, BookOpen, Mail, Phone, Search, Sparkles } from 'lucide-react';

export default function FacultyPage() {
  const [selectedDept, setSelectedDept] = useState('all');

  const facultyMembers = [
    {
      name: 'Dr. Ramesh Kumar Sharma',
      role: 'Principal & Senior Faculty (Physics)',
      dept: 'science',
      qual: 'M.Sc. (Physics), M.Ed., Ph.D.',
      exp: '28 Yrs Exp',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      subjects: ['Intermediate Physics', 'Atomic & Nuclear Physics'],
    },
    {
      name: 'Shri Dinesh Chandra Gupta',
      role: 'Vice Principal & PGT Mathematics',
      dept: 'science',
      qual: 'M.Sc. (Mathematics), B.Ed.',
      exp: '22 Yrs Exp',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      subjects: ['Class 11 & 12 Mathematics', 'Calculus & Coordinate Geometry'],
    },
    {
      name: 'Dr. Anita Srivastava',
      role: 'PGT Chemistry & Lab Incharge',
      dept: 'science',
      qual: 'M.Sc. (Organic Chemistry), Ph.D., B.Ed.',
      exp: '19 Yrs Exp',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      subjects: ['Class 11 & 12 Chemistry', 'Organic & Inorganic Chemistry'],
    },
    {
      name: 'Shri Rajesh Kumar Mishra',
      role: 'PGT Biology & Botanical Curator',
      dept: 'science',
      qual: 'M.Sc. (Botany), B.Ed.',
      exp: '16 Yrs Exp',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      subjects: ['Class 11 & 12 Biology', 'Genetics & Physiology'],
    },
    {
      name: 'Smt. Geeta Dixit',
      role: 'PGT Hindi Sahitya & Cultural Coordinator',
      dept: 'humanities',
      qual: 'M.A. (Hindi), M.Phil., B.Ed.',
      exp: '20 Yrs Exp',
      image: 'https://images.unsplash.com/photo-1580894732473-b8adffea2d9f?auto=format&fit=crop&w=600&q=80',
      subjects: ['Hindi Literature', 'Kavya & Vyakaran'],
    },
    {
      name: 'Shri Vikramaditya Singh',
      role: 'PGT English Core & Debate Coach',
      dept: 'humanities',
      qual: 'M.A. (English), B.Ed.',
      exp: '14 Yrs Exp',
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
      subjects: ['English Literature', 'Phonetics & Creative Writing'],
    },
    {
      name: 'Shri Manoj Kumar Pathak',
      role: 'PGT Social Sciences & History',
      dept: 'humanities',
      qual: 'M.A. (History & Pol. Sci.), B.Ed.',
      exp: '17 Yrs Exp',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
      subjects: ['History', 'Civics & Indian Polity'],
    },
    {
      name: 'Shri Amit Verma',
      role: 'Head of Computer Science & IT',
      dept: 'technology',
      qual: 'MCA, B.Tech (CSE), B.Ed.',
      exp: '11 Yrs Exp',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
      subjects: ['Computer Applications', 'Python & DBMS'],
    },
    {
      name: 'Smt. Priya Sharma',
      role: 'TGT Sanskrit & Moral Ethics',
      dept: 'humanities',
      qual: 'M.A. (Sanskrit), Acharya, B.Ed.',
      exp: '13 Yrs Exp',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      subjects: ['Sanskrit Grammar', 'Shloka Recitation'],
    },
    {
      name: 'Shri Rakesh Yadav',
      role: 'Director of Physical Education & Sports',
      dept: 'sports',
      qual: 'M.P.Ed., Certified NIS Athletics Coach',
      exp: '15 Yrs Exp',
      image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
      subjects: ['Athletics', 'Volleyball & Cricket'],
    },
    {
      name: 'Smt. Sunita Verma',
      role: 'Primary Wing Headmistress',
      dept: 'primary',
      qual: 'M.A., B.Ed., Early Childhood Certified',
      exp: '18 Yrs Exp',
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80',
      subjects: ['Primary Literacy', 'Joyful Mathematics'],
    },
    {
      name: 'Smt. Pooja Pandey',
      role: 'Senior Librarian & Knowledge Curator',
      dept: 'technology',
      qual: 'M.Lib.Sc., UGC-NET',
      exp: '9 Yrs Exp',
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80',
      subjects: ['Library Management', 'Information Literacy'],
    },
  ];

  const filtered = selectedDept === 'all' ? facultyMembers : facultyMembers.filter((f) => f.dept === selectedDept);

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
            Our Educators &amp; Mentors
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-serif">
            Distinguished Faculty &amp; Academic Staff
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Meet our team of 42+ highly qualified educators, laboratory scientists, and mentors dedicated to student success.
          </p>
        </div>
      </section>

      {/* Faculty Directory */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Department Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {[
            { id: 'all', label: 'All Faculty (42)' },
            { id: 'science', label: 'Science & Labs' },
            { id: 'humanities', label: 'Languages & Humanities' },
            { id: 'technology', label: 'IT & Library' },
            { id: 'sports', label: 'Sports & Athletics' },
            { id: 'primary', label: 'Primary Wing' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedDept(tab.id)}
              className={`px-5 py-2 rounded-2xl text-xs font-extrabold transition-all shadow-sm ${
                selectedDept === tab.id
                  ? 'bg-blue-700 text-white shadow-md shadow-blue-700/30'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((fac, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                  <img
                    src={fac.image}
                    alt={fac.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-blue-950/90 text-amber-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md">
                    {fac.exp}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-sm font-black text-slate-900 font-serif group-hover:text-blue-700 transition">
                    {fac.name}
                  </h3>
                  <p className="text-xs font-bold text-blue-700">{fac.role}</p>
                  <p className="text-[11px] text-slate-500">{fac.qual}</p>

                  <div className="pt-2 flex flex-wrap gap-1">
                    {fac.subjects.map((sub, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold"
                      >
                        {sub}
                      </span>
                    ))}
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
