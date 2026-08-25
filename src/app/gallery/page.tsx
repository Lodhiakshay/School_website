'use client';

import React, { useState } from 'react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';
import { Sparkles, Calendar, Eye, X } from 'lucide-react';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<any>(null);

  const galleryItems = [
    {
      title: 'Annual Sports Day 100m Sprint Finals',
      category: 'sports',
      date: '15 Feb 2026',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Science Innovation Fair & Robotics Demo',
      category: 'academic',
      date: '28 Jan 2026',
      image: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Republic Day Flag Hoisting & Parade',
      category: 'cultural',
      date: '26 Jan 2026',
      image: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Saraswati Puja & Classical Music Program',
      category: 'cultural',
      date: '14 Feb 2026',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Senior Biology Dissection & Herbarium Workshop',
      category: 'academic',
      date: '10 Feb 2026',
      image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Chemistry Titration & Salt Analysis Lab',
      category: 'academic',
      date: '05 Feb 2026',
      image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Inter-House Volleyball Tournament Championship',
      category: 'sports',
      date: '20 Jan 2026',
      image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Primary Wing Storytelling & Craft Exhibition',
      category: 'primary',
      date: '18 Jan 2026',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Computer Coding Hackathon in IT Lab',
      category: 'academic',
      date: '12 Jan 2026',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Yoga & Meditation Morning Assembly',
      category: 'cultural',
      date: '08 Jan 2026',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Inter-School Debate on Environmental Ethics',
      category: 'academic',
      date: '02 Jan 2026',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Cricket Team Victory in District Cup',
      category: 'sports',
      date: '22 Dec 2025',
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const filtered = selectedCategory === 'all' ? galleryItems : galleryItems.filter((g) => g.category === selectedCategory);

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
            Moments &amp; Memories
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-serif">
            Institutional Photo Gallery
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            A visual retrospective of celebrations, sports meets, science fests, and cultural events at Sarswati Gyan Mandir.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {[
            { id: 'all', label: 'All Photographs (12)' },
            { id: 'cultural', label: 'Cultural & Celebrations' },
            { id: 'sports', label: 'Sports & Athletics' },
            { id: 'academic', label: 'Science & Academics' },
            { id: 'primary', label: 'Primary Wing' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-5 py-2 rounded-2xl text-xs font-extrabold transition-all shadow-sm ${
                selectedCategory === tab.id
                  ? 'bg-blue-700 text-white shadow-md shadow-blue-700/30'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Image Grid */}
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
                    {item.category} • {item.date}
                  </span>
                  <h3 className="text-xs font-black text-white leading-tight mt-1">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full max-h-[90vh] flex flex-col bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl p-4 my-auto"
          >
            <div className="flex items-center justify-between px-2 pb-2 flex-shrink-0">
              <div>
                <h3 className="text-sm font-bold text-white">{lightboxImage.title}</h3>
                <p className="text-xs text-amber-400">{lightboxImage.date}</p>
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
