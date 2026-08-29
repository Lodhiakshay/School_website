'use client';

import React, { useEffect } from 'react';
import {
  X,
  Play,
  Video,
  Youtube,
  Film,
  FileVideo,
  Instagram,
  Facebook,
  HardDrive,
} from 'lucide-react';
import { getVideoPlayerInfo, getVideoType } from '../../lib/video-utils';

export interface VideoModalItem {
  title: string;
  speakerName?: string;
  speakerRole?: string;
  youtubeUrl?: string; // Kept for backwards compatibility
  videoUrl?: string; // Universal video URL
  thumbnailUrl?: string;
  quote?: string;
  badge?: string;
}

interface UniversalVideoModalProps {
  video: VideoModalItem | null;
  onClose: () => void;
}

export function UniversalVideoModal({ video, onClose }: UniversalVideoModalProps) {
  useEffect(() => {
    if (!video) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    // Prevent background scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [video, onClose]);

  if (!video) return null;

  const url = video.videoUrl || video.youtubeUrl || '';
  const videoInfo = getVideoPlayerInfo(url, video.thumbnailUrl, true);
  const videoType = getVideoType(url);

  return (
    <div className="fixed inset-0 z-[999999] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Clickable Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-slate-900 border-2 border-amber-400/60 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden z-10 space-y-0 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0 pr-4">
            <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0 border border-rose-500/40">
              {videoType === 'youtube' ? (
                <Youtube className="w-4 h-4 text-rose-500 fill-rose-500" />
              ) : videoType === 'instagram' ? (
                <Instagram className="w-4 h-4 text-pink-500" />
              ) : videoType === 'facebook' ? (
                <Facebook className="w-4 h-4 text-blue-500 fill-blue-500" />
              ) : videoType === 'vimeo' ? (
                <Film className="w-4 h-4 text-sky-400" />
              ) : videoType === 'drive' ? (
                <HardDrive className="w-4 h-4 text-emerald-400" />
              ) : (
                <FileVideo className="w-4 h-4 text-indigo-400" />
              )}
            </div>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-black text-white truncate font-serif">
                {video.title}
              </h3>
              {(video.speakerName || video.speakerRole) && (
                <p className="text-[10.5px] sm:text-xs text-amber-300 font-bold truncate mt-0.5">
                  {video.speakerName} {video.speakerRole ? `• ${video.speakerRole}` : ''}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-rose-600 text-white transition flex-shrink-0 active:scale-95"
            title="Close Video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Universal Video Player Area (16:9 HD) */}
        <div className="relative w-full aspect-video bg-black">
          {videoInfo.isDirectFile ? (
            <video
              src={videoInfo.embedUrl}
              poster={videoInfo.posterUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            >
              <source src={videoInfo.embedUrl} type="video/mp4" />
              <source src={videoInfo.embedUrl} type="video/webm" />
              Your browser does not support HTML5 video playback.
            </video>
          ) : (
            <iframe
              src={videoInfo.embedUrl}
              title={video.title}
              className="w-full h-full object-cover"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>

        {/* Modal Footer / Testimonial Quote */}
        {(video.quote || video.badge) && (
          <div className="p-4 sm:p-5 bg-slate-950/95 text-xs text-slate-300 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {video.quote ? (
              <p className="italic leading-relaxed text-[11px] sm:text-xs text-slate-300">
                &ldquo;{video.quote}&rdquo;
              </p>
            ) : (
              <div />
            )}
            {video.badge && (
              <span className="text-[10px] font-black uppercase text-amber-300 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-auto">
                {video.badge}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

