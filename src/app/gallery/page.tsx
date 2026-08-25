'use client';

import React, { useState } from 'react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';
import {
  Sparkles,
  Calendar,
  Eye,
  X,
  Image as ImageIcon,
  FlaskConical,
  Trophy,
  Palette,
  HeartHandshake,
} from 'lucide-react';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<any>(null);

  const galleryItems = [
    {
      title: 'Annual Sports Day 100m Sprint Finals',
      category: 'sports',
      categoryLabel: 'Sports & Athletics',
      date: '15 Feb 2026',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Science Innovation Fair & Robotics Demo',
      category: 'academic',
      categoryLabel: 'Science & Academics',
      date: '28 Jan 2026',
      image: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Republic Day Flag Hoisting & Parade',
      category: 'cultural',
      categoryLabel: 'Cultural & National',
      date: '26 Jan 2026',
      image: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Saraswati Puja & Classical Music Program',
      category: 'cultural',
      categoryLabel: 'Cultural & National',
      date: '14 Feb 2026',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Senior Biology Dissection & Herbarium Workshop',
      category: 'academic',
      categoryLabel: 'Science & Academics',
      date: '10 Feb 2026',
      image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Chemistry Titration & Salt Analysis Lab',
      category: 'academic',
      categoryLabel: 'Science & Academics',
      date: '05 Feb 2026',
      image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Inter-House Volleyball Tournament Championship',
      category: 'sports',
      categoryLabel: 'Sports & Athletics',
      date: '20 Jan 2026',
      image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Primary Wing Storytelling & Craft Exhibition',
      category: 'primary',
      categoryLabel: 'Primary Wing',
      date: '18 Jan 2026',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Computer Coding Hackathon in IT Lab',
      category: 'academic',
      categoryLabel: 'Science & Academics',
      date: '12 Jan 2026',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Yoga & Meditation Morning Assembly',
      category: 'cultural',
      categoryLabel: 'Cultural & National',
      date: '08 Jan 2026',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Inter-School Debate on Environmental Ethics',
      category: 'academic',
      categoryLabel: 'Science & Academics',
      date: '02 Jan 2026',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Cricket Team Victory in District Cup',
      category: 'sports',
      categoryLabel: 'Sports & Athletics',
      date: '22 Dec 2025',
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const filtered =
    selectedCategory === 'all'
      ? galleryItems
      : galleryItems.filter((g) => g.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <PublicNavbar />

      {/* Royal Hero Header */}
      <section className="relative bg-gradient-to-br from-[#001845] via-[#002060] to-[#023e8a] text-white pt-16 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10 pb-4">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Moments &amp; Memories &bull; छायाचित्र प्रदर्शनी</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight text-white leading-tight">
            Institutional Photo Gallery
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            A visual retrospective of national celebrations, sports meets, science fests, laboratory practicals, and cultural events at Sarswati Gyan Mandir.
          </p>
        </div>
      </section>

      {/* Floating Category Filter Tabs */}
      <section className="max-w-6xl mx-auto px-3 sm:px-6 -mt-10 sm:-mt-14 z-20 w-full overflow-hidden">
        <div className="bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar max-w-full">
          {[
            { id: 'all', label: 'All Photographs (12)', icon: <ImageIcon className="w-4 h-4" /> },
            { id: 'cultural', label: 'Cultural & Festivals', icon: <HeartHandshake className="w-4 h-4" /> },
            { id: 'sports', label: 'Sports & Athletics', icon: <Trophy className="w-4 h-4" /> },
            { id: 'academic', label: 'Science & Labs', icon: <FlaskConical className="w-4 h-4" /> },
            { id: 'primary', label: 'Primary Wing', icon: <Palette className="w-4 h-4" /> },
          ].map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  isActive
                    ? 'bg-[#002060] text-white shadow-md scale-100 ring-2 ring-blue-400/30'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span className={isActive ? 'text-amber-400' : 'text-slate-400'}>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxImage(item)}
              className="group relative h-64 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer bg-slate-950"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-5 flex flex-col justify-between opacity-90 group-hover:opacity-100 transition-opacity">
                <div className="flex justify-end">
                  <span className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white group-hover:bg-amber-400 group-hover:text-slate-950 transition">
                    <Eye className="w-4 h-4" />
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest">
                    {item.categoryLabel} &bull; {item.date}
                  </span>
                  <h3 className="text-xs font-black text-white leading-tight mt-1 font-serif">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal (Bounded & Scroll-Safe) */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full max-h-[90vh] flex flex-col bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl p-4 my-auto animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between px-2 pb-3 flex-shrink-0">
              <div>
                <h3 className="text-sm font-bold text-white font-serif">{lightboxImage.title}</h3>
                <p className="text-xs text-amber-400">{lightboxImage.categoryLabel} &bull; {lightboxImage.date}</p>
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative h-[60vh] w-full rounded-2xl overflow-hidden bg-slate-950 flex-1">
              <img src={lightboxImage.image} alt={lightboxImage.title} className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      )}

      <PublicFooter />
    </div>
  );
}
