'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Youtube,
  Film,
  FileVideo,
  Play,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Sparkles,
  Maximize2,
} from 'lucide-react';
import { getVideoPlayerInfo, getVideoType } from '../../lib/video-utils';
import { UniversalVideoModal, VideoModalItem } from './universal-video-modal';

interface TestimonialItem {
  title: string;
  speakerName: string;
  speakerRole: string;
  youtubeUrl?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  quote?: string;
  badge?: string;
  order?: number;
  isActive?: boolean;
}

interface VideoTestimonialsSectionProps {
  sectionData?: {
    title?: string;
    subtitle?: string;
    badge?: string;
    description?: string;
    isActive?: boolean;
    testimonials?: TestimonialItem[];
  };
}

/**
 * Individual Interactive Video Card
 * Supports Muted Ambient Video Preview on Hover with instant Sound toggle on click
 */
function VideoCardItem({
  test,
  onPlayWithSound,
}: {
  test: TestimonialItem;
  onPlayWithSound: (item: TestimonialItem) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const url = test.videoUrl || test.youtubeUrl || '';
  const playerInfo = getVideoPlayerInfo(url, test.thumbnailUrl, false);
  const videoType = getVideoType(url);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (playerInfo.isDirectFile && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlayingPreview(true))
          .catch(() => {
            // Browser autoplay prevention fallback
          });
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (playerInfo.isDirectFile && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlayingPreview(false);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onPlayWithSound(test)}
      className="w-[85vw] sm:w-[360px] lg:w-[384px] flex-shrink-0 snap-start group bg-slate-900/80 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/80 shadow-xl hover:shadow-2xl hover:shadow-rose-500/10 transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
    >
      {/* 16:9 Video Canvas / Muted Preview */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        {playerInfo.isDirectFile ? (
          <video
            ref={videoRef}
            src={playerInfo.embedUrl}
            poster={playerInfo.posterUrl}
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <img
            src={playerInfo.posterUrl}
            alt={test.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}

        {/* Ambient Dark Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent transition-opacity duration-300 ${
            isPlayingPreview ? 'opacity-40' : 'opacity-80 group-hover:opacity-60'
          }`}
        />

        {/* Center Animated Play / Sound Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-2xl transition-all duration-300 border-2 border-white/40 ring-4 ring-rose-500/30 ${
              isHovered ? 'scale-110 bg-rose-500 ring-rose-400/50' : 'scale-100'
            }`}
          >
            {isHovered ? (
              <Volume2 className="w-6 h-6 sm:w-7 sm:h-7 text-white animate-pulse" />
            ) : (
              <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white ml-0.5" />
            )}
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="text-[10px] font-black uppercase tracking-wider bg-slate-950/80 text-amber-300 border border-amber-400/40 px-2.5 py-1 rounded-full backdrop-blur-md">
            {test.badge || 'Testimonial'}
          </span>
        </div>

        {/* Format Brand Chip */}
        <div className="absolute top-3 right-3">
          {videoType === 'youtube' ? (
            <span className="text-[10px] font-black uppercase text-white bg-rose-600/90 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow backdrop-blur-md">
              <Youtube className="w-3 h-3 fill-white" /> YouTube
            </span>
          ) : videoType === 'vimeo' ? (
            <span className="text-[10px] font-black uppercase text-white bg-sky-600/90 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow backdrop-blur-md">
              <Film className="w-3 h-3 fill-white" /> Vimeo
            </span>
          ) : (
            <span className="text-[10px] font-black uppercase text-white bg-indigo-600/90 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow backdrop-blur-md">
              <FileVideo className="w-3 h-3" /> Video Story
            </span>
          )}
        </div>

        {/* Audio Status & Unmute Trigger Indicator Pill */}
        <div className="absolute bottom-2.5 right-2.5">
          <span
            className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-md border transition-all duration-300 ${
              isHovered
                ? 'bg-amber-400 text-slate-950 border-amber-300 font-extrabold shadow-lg'
                : 'bg-slate-950/80 text-slate-300 border-white/10'
            }`}
          >
            {isHovered ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-slate-950" />
                <span>Play with Sound</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3 h-3 text-slate-400" />
                <span>Muted Preview</span>
              </>
            )}
          </span>
        </div>
      </div>

      {/* Card Content & Quotes */}
      <div className="p-5 sm:p-6 space-y-3.5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="font-serif font-black text-base sm:text-lg text-white group-hover:text-amber-300 transition-colors leading-snug line-clamp-2">
            {test.title}
          </h3>
          {test.quote && (
            <p className="text-xs text-slate-300 leading-relaxed italic line-clamp-3 bg-white/5 p-3 rounded-2xl border border-white/5">
              &ldquo;{test.quote}&rdquo;
            </p>
          )}
        </div>

        {/* Speaker Information */}
        <div className="pt-2 border-t border-white/10">
          <h4 className="text-xs font-black text-amber-300 font-sans">
            {test.speakerName}
          </h4>
          <p className="text-[11px] text-slate-400 font-medium truncate">{test.speakerRole}</p>
        </div>
      </div>
    </div>
  );
}

export function VideoTestimonialsSection({ sectionData }: VideoTestimonialsSectionProps) {
  const [activeVideo, setActiveVideo] = useState<VideoModalItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeScrollIndex, setActiveScrollIndex] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);

  const allTestimonials = useMemo(() => {
    return (sectionData?.testimonials || []).filter((t) => t.isActive !== false);
  }, [sectionData?.testimonials]);

  // Extract unique categories for filter tabs
  const categories = useMemo(() => {
    const set = new Set<string>();
    allTestimonials.forEach((t) => {
      if (t.badge && t.badge.trim()) set.add(t.badge.trim());
    });
    return ['All', ...Array.from(set)];
  }, [allTestimonials]);

  // Filtered testimonials
  const filteredTestimonials = useMemo(() => {
    if (selectedCategory === 'All') return allTestimonials;
    return allTestimonials.filter((t) => t.badge?.trim() === selectedCategory);
  }, [allTestimonials, selectedCategory]);

  // Check scroll position to update arrows and active index
  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Estimate active slide
    const cardWidth = clientWidth > 768 ? clientWidth / 3 : clientWidth > 640 ? clientWidth / 2 : clientWidth;
    const index = Math.round(scrollLeft / (cardWidth + 24));
    setActiveScrollIndex(Math.min(index, filteredTestimonials.length - 1));
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [filteredTestimonials]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  if (sectionData?.isActive === false || allTestimonials.length === 0) {
    return null;
  }

  const title = sectionData?.title || 'Real Stories, Authentic Voices';
  const subtitle = sectionData?.subtitle || 'PARENT & STUDENT EXPERIENCES';
  const badge = sectionData?.badge || 'Video Testimonials • Community Trust';
  const description =
    sectionData?.description ||
    'Hear directly from our parents, successful alumni, and board rankers about how Sarswati Gyan Mandir transforms lives through disciplined academics, holistic values, and personalized mentorship.';

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 via-[#01142f] to-slate-950 text-white relative overflow-hidden border-y border-amber-500/20">
      {/* Ambient Lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-300 border border-rose-400/40 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-sm shadow-md">
            <Youtube className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span>{badge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-serif text-white tracking-tight">
            {title}
          </h2>

          <p className="text-xs sm:text-sm text-amber-300 font-extrabold uppercase tracking-widest">
            {subtitle}
          </p>

          <div
            className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal pt-1"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>

        {/* Category Filter Pills */}
        {categories.length > 2 && (
          <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  if (scrollRef.current) scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md shadow-amber-400/20'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                {cat === 'All' ? `All Stories (${allTestimonials.length})` : cat}
              </button>
            ))}
          </div>
        )}

        {/* Carousel Header with Nav Arrows & Live Counter */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>
              Showing {filteredTestimonials.length} video {filteredTestimonials.length === 1 ? 'story' : 'stories'}
            </span>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`p-2.5 rounded-2xl border transition-all ${
                canScrollLeft
                  ? 'bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-amber-400 active:scale-95 shadow-lg'
                  : 'bg-white/5 text-slate-600 border-white/5 cursor-not-allowed'
              }`}
              title="Previous videos"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`p-2.5 rounded-2xl border transition-all ${
                canScrollRight
                  ? 'bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-amber-400 active:scale-95 shadow-lg'
                  : 'bg-white/5 text-slate-600 border-white/5 cursor-not-allowed'
              }`}
              title="Next videos"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Smooth-Scroll Carousel Track */}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredTestimonials.map((test, idx) => (
            <VideoCardItem
              key={idx}
              test={test}
              onPlayWithSound={(item) => setActiveVideo(item)}
            />
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        {filteredTestimonials.length > 3 && (
          <div className="flex items-center justify-center gap-2 pt-2">
            {Array.from({ length: Math.ceil(filteredTestimonials.length / 3) + 1 }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => {
                  if (scrollRef.current) {
                    const targetScroll = dotIdx * (scrollRef.current.clientWidth * 0.8);
                    scrollRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeScrollIndex === dotIdx
                    ? 'w-8 bg-amber-400'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                title={`Go to page ${dotIdx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Universal Interactive Video Modal Player (With Audio & Sound Unmuted) */}
      <UniversalVideoModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </section>
  );
}

