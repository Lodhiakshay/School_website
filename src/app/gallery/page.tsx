'use client';

import React, { useState, useEffect } from 'react';
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
  ChevronLeft,
  ChevronRight,
  Download,
  Building,
  Baby,
  PartyPopper,
  Search,
  ExternalLink,
} from 'lucide-react';
import { apiClient } from '../../lib/api-client';

const STARTER_GALLERY = [
  {
    _id: 'seed_01',
    title: 'Annual Sports Day 100m Sprint Finals',
    description: 'Senior boys 100m dash event at the annual sports tournament championship.',
    category: 'sports',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    eventDate: '2026-02-15',
    academicYear: '2026-2027',
  },
  {
    _id: 'seed_02',
    title: 'Science Innovation Fair & Robotics Demo',
    description: 'Working models of AI automation and hydraulic crane demonstrations.',
    category: 'academic',
    imageUrl: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?auto=format&fit=crop&w=1200&q=80',
    eventDate: '2026-01-28',
    academicYear: '2026-2027',
  },
  {
    _id: 'seed_03',
    title: 'Republic Day Flag Hoisting & Patriotic Parade',
    description: 'Grand salute to the National Flag followed by parade by NCC cadettes.',
    category: 'cultural',
    imageUrl: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1200&q=80',
    eventDate: '2026-01-26',
    academicYear: '2026-2027',
  },
  {
    _id: 'seed_04',
    title: 'Saraswati Puja & Classical Music Program',
    description: 'Traditional Vedic Vandana and classical sitar rendition by students.',
    category: 'cultural',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    eventDate: '2026-02-14',
    academicYear: '2026-2027',
  },
  {
    _id: 'seed_05',
    title: 'Chemistry Titration & Salt Analysis Practical Lab',
    description: 'Class 12th students performing acid-base qualitative analysis under guidance.',
    category: 'academic',
    imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80',
    eventDate: '2026-02-05',
    academicYear: '2026-2027',
  },
  {
    _id: 'seed_06',
    title: 'Inter-House Volleyball Tournament Championship',
    description: 'Shivaji House vs Tagore House in the final championship clash.',
    category: 'sports',
    imageUrl: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1200&q=80',
    eventDate: '2026-01-20',
    academicYear: '2026-2027',
  },
  {
    _id: 'seed_07',
    title: 'Primary Wing SSSD Storytelling & Origami Workshop',
    description: 'Creative clay modeling and paper craft show by foundational stage toddlers.',
    category: 'primary',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    eventDate: '2026-01-18',
    academicYear: '2026-2027',
  },
  {
    _id: 'seed_08',
    title: 'Smart IT & Computer Lab Programming Session',
    description: 'Python & Web development class in the high-tech computer workstation hall.',
    category: 'campus',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    eventDate: '2026-01-12',
    academicYear: '2026-2027',
  },
];

const CATEGORY_TABS = [
  { id: 'all', label: 'All Photos', icon: ImageIcon },
  { id: 'sports', label: 'Sports & Athletics', icon: Trophy },
  { id: 'academic', label: 'Science & Labs', icon: FlaskConical },
  { id: 'cultural', label: 'Cultural & Festivals', icon: Palette },
  { id: 'campus', label: 'Campus & Facilities', icon: Building },
  { id: 'primary', label: 'Primary Wing (SSSD)', icon: Baby },
];

export default function GalleryPage() {
  const [items, setItems] = useState<any[]>(STARTER_GALLERY);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get('/gallery')
      .then((res) => {
        if (res.data?.data && res.data.data.length > 0) {
          setItems(res.data.data);
        }
        if (res.data?.meta?.categories) {
          setCategoryCounts(res.data.meta.categories);
        }
      })
      .catch(() => {
        // Fallback to starter items
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = items.filter((item) => {
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  // Lightbox Navigation
  const activeLightboxItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filtered.length);
    }
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filtered.length : 0));
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filtered.length) % filtered.length : 0));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filtered.length]);

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'sports':
        return '🏆 Sports & Athletics';
      case 'academic':
        return '🔬 Science & Labs';
      case 'cultural':
        return '🎨 Cultural & Festivals';
      case 'primary':
        return '👶 Primary Wing (SSSD)';
      case 'celebrations':
        return '🎉 Celebrations';
      default:
        return '🏛️ Campus & Facilities';
    }
  };

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
            Campus Photo &amp; Media Gallery
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            A visual retrospective of national celebrations, sports meets, science fests, laboratory practicals, and cultural milestones at Sarswati Gyan Mandir &amp; SSSD Public School.
          </p>

          {/* Public Search Bar */}
          <div className="max-w-md mx-auto pt-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search memories, sports, science fair..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-blue-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Floating Category Filter Tabs */}
      <section className="max-w-6xl mx-auto px-3 sm:px-6 -mt-10 sm:-mt-14 z-20 w-full overflow-hidden">
        <div className="bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar max-w-full">
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedCategory === tab.id;
            const Icon = tab.icon;
            const count =
              tab.id === 'all'
                ? items.length
                : categoryCounts[tab.id] || items.filter((i) => i.category === tab.id).length;

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
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    isActive ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Photo Grid Showcase */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 flex-1">
        {filtered.length === 0 ? (
          <div className="p-16 text-center text-slate-500 space-y-3 bg-white rounded-3xl border border-slate-200 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No photos match your query.</h3>
            <p className="text-xs text-slate-400">Try selecting another category tab or clearing the search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((item, idx) => (
              <div
                key={item._id || idx}
                onClick={() => setLightboxIndex(idx)}
                className="group relative h-64 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer bg-slate-950"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-5 flex flex-col justify-between opacity-90 group-hover:opacity-100 transition-opacity">
                  <div className="flex justify-end">
                    <span className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white group-hover:bg-amber-400 group-hover:text-slate-950 transition shadow-sm">
                      <Eye className="w-4 h-4" />
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest block mb-1">
                      {getCategoryLabel(item.category)} &bull;{' '}
                      {item.eventDate ? new Date(item.eventDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}
                    </span>
                    <h3 className="text-xs font-black text-white leading-tight font-serif line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* FULLSCREEN LIGHTBOX MODAL WITH NEXT / PREV CONTROLS                       */}
      {/* ========================================================================= */}
      {activeLightboxItem && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl w-full max-h-[92vh] flex flex-col bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl p-4 sm:p-6 my-auto animate-in zoom-in-95 duration-150 relative"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-shrink-0">
              <div className="space-y-0.5">
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider">
                  {getCategoryLabel(activeLightboxItem.category)} &bull;{' '}
                  {activeLightboxItem.eventDate
                    ? new Date(activeLightboxItem.eventDate).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
                    : ''}
                </span>
                <h3 className="text-sm sm:text-base font-black text-white font-serif">{activeLightboxItem.title}</h3>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activeLightboxItem.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
                  title="Open original high-res image"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Visual Display with Prev/Next Floating Arrows */}
            <div className="relative h-[55vh] sm:h-[62vh] w-full rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center my-3">
              <img
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.title}
                className="w-full h-full object-contain"
              />

              {/* Prev Arrow */}
              {filtered.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-amber-400 text-white hover:text-slate-950 backdrop-blur-md transition shadow-xl"
                  title="Previous Photo (Left Arrow)"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              {/* Next Arrow */}
              {filtered.length > 1 && (
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-amber-400 text-white hover:text-slate-950 backdrop-blur-md transition shadow-xl"
                  title="Next Photo (Right Arrow)"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Bottom Caption & Session info */}
            {activeLightboxItem.description && (
              <div className="px-2 pt-1 flex items-center justify-between text-xs text-slate-300">
                <p className="line-clamp-2">{activeLightboxItem.description}</p>
                {activeLightboxItem.academicYear && (
                  <span className="text-[10px] font-mono text-slate-500 flex-shrink-0 ml-4">
                    Session {activeLightboxItem.academicYear}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <PublicFooter />
    </div>
  );
}
