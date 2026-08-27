'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Maximize2,
  X,
} from 'lucide-react';

interface CampusMoment {
  id: string;
  title: string;
  category: string;
  categoryBadgeColor: string;
  desc: string;
  image: string;
  tag?: string;
}

const campusMoments: CampusMoment[] = [
  {
    id: 'sci-labs',
    title: 'Advanced Science & Innovation Labs',
    category: 'Practical STEM',
    categoryBadgeColor: 'bg-emerald-600/90 text-white',
    desc: 'Fully equipped Physics, Chemistry, and Biology laboratories enabling hands-on scientific discovery and board practicals.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=85',
    tag: 'Modern Apparatus',
  },
  {
    id: 'it-center',
    title: 'Digital Computer & Coding Center',
    category: 'IT & Digital Literacy',
    categoryBadgeColor: 'bg-blue-600/90 text-white',
    desc: 'Air-conditioned digital workstation center providing foundational computer education, coding, and smart classroom tools.',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=85',
    tag: '40+ Connected PCs',
  },
  {
    id: 'sports-meet',
    title: 'Annual Sports & Athletic Championship',
    category: 'Sports & Athletics',
    categoryBadgeColor: 'bg-amber-500 text-blue-950 font-black',
    desc: 'Expansive campus grounds fostering teamwork, discipline, cricket, volleyball, badminton, and track championships.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=85',
    tag: 'District Level Meet',
  },
  {
    id: 'merit-honors',
    title: 'State Board Merit & Academic Felicitation',
    category: 'Academic Honor',
    categoryBadgeColor: 'bg-indigo-600/90 text-white',
    desc: 'Annual distinction ceremony honoring top state board rankers and academic achievers with medals and scholarships.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=85',
    tag: '99.4% Pass Rate',
  },
  {
    id: 'saraswati-puja',
    title: 'Saraswati Puja & Cultural Samaroh',
    category: 'Cultural Ethos',
    categoryBadgeColor: 'bg-rose-600/90 text-white',
    desc: 'Traditional Vedic chanting, classical music, art performances, and festival celebrations honoring Maa Saraswati.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=85',
    tag: 'Annual Tradition',
  },
  {
    id: 'central-library',
    title: 'Central Knowledge Repository & Library',
    category: 'Knowledge Hub',
    categoryBadgeColor: 'bg-teal-600/90 text-white',
    desc: 'A serene academic reading hall housing 5,000+ reference volumes, board guides, and periodicals.',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=85',
    tag: '5,000+ Books',
  },
  {
    id: 'science-fair',
    title: 'District Science Exhibition & Projects',
    category: 'Innovation',
    categoryBadgeColor: 'bg-purple-600/90 text-white',
    desc: 'Student working models, renewable energy projects, electronic circuits, and innovative scientific demonstrations.',
    image: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?auto=format&fit=crop&w=1000&q=85',
    tag: 'State Exhibits',
  },
  {
    id: 'national-days',
    title: 'Republic & Independence Day Ceremonies',
    category: 'National Pride',
    categoryBadgeColor: 'bg-amber-600/90 text-white',
    desc: 'Disciplined student march-past, tricolor flag hoisting, national anthem, and patriotic tributes.',
    image: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1000&q=85',
    tag: 'Campus Pride',
  },
];

interface InfiniteCampusCarouselProps {
  items?: Array<{
    id?: string;
    _id?: string;
    title: string;
    category?: string;
    categoryBadgeColor?: string;
    desc?: string;
    image: string;
    badge?: string;
    tag?: string;
    isActive?: boolean;
  }>;
}

export const InfiniteCampusCarousel: React.FC<InfiniteCampusCarouselProps> = ({ items }) => {
  const [activeItem, setActiveItem] = useState<CampusMoment | null>(null);

  const displayMoments: CampusMoment[] =
    items && items.length > 0
      ? items
          .filter((it) => it.isActive !== false)
          .map((it, idx) => ({
            id: it.id || it._id || `carousel-${idx}`,
            title: it.title,
            category: it.category || 'Campus Life',
            categoryBadgeColor: it.categoryBadgeColor || 'bg-blue-600/90 text-white',
            desc: it.desc || '',
            image: it.image,
            tag: it.badge || it.tag || 'Campus Focus',
          }))
      : campusMoments;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Double array for continuous seamless infinite loop
  const stream = [...displayMoments, ...displayMoments];

  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden font-sans border-t border-b border-slate-800/80">
      {/* Background Lighting Aura */}
      <div className="absolute top-1/2 -left-48 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-48 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Production-Grade Clean Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 bg-blue-900/40 text-amber-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-500/30 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Campus Life &amp; Student Experiences</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-serif tracking-tight">
              Life &amp; Celebrations at Saraswati Gyan Mandir
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Capturing vibrant moments of academic distinction, science explorations, cultural celebrations, and athletic triumphs across our campus in Shamsabad.
            </p>
          </div>

          {/* Clean Action Link (Pause button eliminated) */}
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black shadow-lg shadow-blue-600/30 transition active:scale-95 flex-shrink-0 group"
          >
            <span>Explore Photo Gallery</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Single Grand Cinematic Stream (Hardware Accelerated with Auto-Pause on Hover/Touch) */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Edge Gradient Dissolve Masks */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none" />

        <div className="flex gap-6 w-max animate-marquee-left hover:[animation-play-state:paused] active:[animation-play-state:paused]">
          {stream.map((item, idx) => (
            <div
              key={`stream-${item.id}-${idx}`}
              onClick={() => setActiveItem(item)}
              className="group relative w-80 sm:w-96 md:w-[420px] h-64 sm:h-72 md:h-80 rounded-3xl overflow-hidden cursor-pointer border-2 border-white/10 hover:border-amber-400/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 flex-shrink-0 bg-slate-900"
            >
              {/* Grand High-Definition Photograph */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent" />

              {/* Floating Top Category Pill */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className={`text-[11px] font-black uppercase px-3 py-1 rounded-full shadow-lg backdrop-blur-md ${item.categoryBadgeColor}`}>
                  {item.category}
                </span>
                {item.tag && (
                  <span className="text-[11px] bg-slate-950/80 text-amber-300 font-bold px-2.5 py-0.5 rounded-full border border-amber-400/30 backdrop-blur-md">
                    {item.tag}
                  </span>
                )}
              </div>

              {/* Bottom Editorial Content */}
              <div className="absolute bottom-4 left-4 right-4 space-y-1.5">
                <h3 className="text-base sm:text-lg font-black text-white font-serif drop-shadow-md group-hover:text-amber-300 transition leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-xs text-amber-300 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Click to view full photo</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen Interactive Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-[99999] bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="bg-slate-900 border-2 border-amber-400/60 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl space-y-4 animate-in zoom-in-95 duration-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-72 sm:h-96 w-full bg-slate-950">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/40" />

              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 p-2 rounded-2xl bg-slate-950/80 hover:bg-slate-800 text-white border border-white/20 transition shadow-lg"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full shadow-lg backdrop-blur-md ${activeItem.categoryBadgeColor}`}>
                  {activeItem.category}
                </span>
                {activeItem.tag && (
                  <span className="text-xs bg-slate-950/80 text-amber-300 font-bold px-3 py-1 rounded-full border border-amber-400/40 backdrop-blur-md">
                    {activeItem.tag}
                  </span>
                )}
              </div>
            </div>

            <div className="p-6 pt-2 space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                {activeItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeItem.desc}
              </p>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-4">
                <Link
                  href="/gallery"
                  onClick={() => setActiveItem(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 transition"
                >
                  <span>Explore complete campus gallery archive</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setActiveItem(null)}
                  className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition"
                >
                  Close &bull; Esc
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
