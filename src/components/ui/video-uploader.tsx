'use client';

import React, { useState, useRef } from 'react';
import {
  Upload,
  Video,
  Play,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Link as LinkIcon,
  Youtube,
  Film,
  FileVideo,
} from 'lucide-react';
import { apiClient } from '../../lib/api-client';
import { useToast } from './toast';
import {
  getVideoType,
  getVideoPlayerInfo,
  extractYouTubeId,
  extractVimeoId,
  isDirectVideoUrl,
} from '../../lib/video-utils';

interface VideoUploaderProps {
  label: string;
  value: string;
  onChange: (videoUrl: string) => void;
  posterUrl?: string;
  helperText?: string;
  required?: boolean;
}

export function VideoUploader({
  label,
  value,
  onChange,
  posterUrl,
  helperText,
  required,
}: VideoUploaderProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [inputMode, setInputMode] = useState<'url' | 'upload'>('url');
  const [dragOver, setDragOver] = useState(false);

  const videoInfo = getVideoPlayerInfo(value, posterUrl, false);
  const videoType = getVideoType(value);

  const handleFileUpload = async (file: File) => {
    // Validate file type
    const validTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(mp4|webm|ogg|mov|m4v|avi)$/i)) {
      toast.error('Please upload a valid video file (MP4, WebM, MOV, OGG).', 'Invalid Video Format');
      return;
    }

    // Validate size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      toast.error('Video file size exceeds 100MB limit. Please upload a compressed short video.', 'File Too Large');
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadProgress(40);
      const res = await apiClient.post('/school/upload-media', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(Math.min(percent, 95));
          }
        },
      });

      setUploadProgress(100);
      const uploadedUrl = res.data?.data?.url || res.data?.url;
      if (uploadedUrl) {
        onChange(uploadedUrl);
        toast.success('Video uploaded successfully to Cloudinary CDN!', 'Video Uploaded');
      } else {
        throw new Error('Upload URL missing from server response');
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || 'Failed to upload video file.', 'Upload Failed');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2.5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <label className="block text-xs font-bold text-slate-800">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>

        {/* Mode Switcher Pill */}
        <div className="inline-flex rounded-xl bg-slate-100 p-0.5 border border-slate-200 text-[10px] sm:text-[11px] font-bold self-start sm:self-auto max-w-full overflow-x-auto">
          <button
            type="button"
            onClick={() => setInputMode('url')}
            className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1.5 whitespace-nowrap ${
              inputMode === 'url' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <LinkIcon className="w-3 h-3 text-blue-600" /> Web Link / YouTube
          </button>
          <button
            type="button"
            onClick={() => setInputMode('upload')}
            className={`px-2.5 py-1 rounded-lg transition flex items-center gap-1.5 whitespace-nowrap ${
              inputMode === 'upload' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Upload className="w-3 h-3 text-rose-600" /> Direct File Upload
          </button>
        </div>
      </div>

      {/* Input Section */}
      {inputMode === 'url' ? (
        <div className="space-y-1.5">
          <div className="relative">
            <input
              type="text"
              className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-medium focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition"
              placeholder="Paste YouTube, Vimeo, Cloudinary, or Direct MP4 link..."
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {videoType === 'youtube' ? (
                <Youtube className="w-4 h-4 text-rose-600" />
              ) : videoType === 'vimeo' ? (
                <Film className="w-4 h-4 text-sky-500" />
              ) : (
                <LinkIcon className="w-4 h-4" />
              )}
            </div>

            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                title="Clear Video Link"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Type Badge Chip */}
          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] flex-wrap">
            {videoType === 'youtube' && (
              <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold border border-emerald-200 max-w-full break-all">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" /> YouTube Video (ID: {videoInfo.id})
              </span>
            )}
            {videoType === 'vimeo' && (
              <span className="inline-flex items-center gap-1 text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full font-bold border border-sky-200 max-w-full break-all">
                <CheckCircle2 className="w-3 h-3 text-sky-600 flex-shrink-0" /> Vimeo Video (ID: {videoInfo.id})
              </span>
            )}
            {videoType === 'direct' && value && (
              <span className="inline-flex items-center gap-1 text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full font-bold border border-indigo-200 max-w-full break-all">
                <FileVideo className="w-3 h-3 text-indigo-600 flex-shrink-0" /> Direct Video File (MP4 / WebM / CDN)
              </span>
            )}
          </div>
        </div>
      ) : (
        /* Drag & Drop Direct Upload Box */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`p-6 rounded-2xl border-2 border-dashed transition flex flex-col items-center justify-center text-center cursor-pointer ${
            dragOver
              ? 'border-rose-500 bg-rose-50/50'
              : 'border-slate-300 bg-slate-50 hover:bg-white hover:border-rose-400'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
            accept="video/mp4,video/webm,video/ogg,video/quicktime,video/*"
            className="hidden"
          />

          {isUploading ? (
            <div className="space-y-2 py-2">
              <Loader2 className="w-8 h-8 text-rose-600 animate-spin mx-auto" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-800">Uploading video to Cloudinary CDN...</p>
                <div className="w-48 bg-slate-200 h-2 rounded-full overflow-hidden mx-auto">
                  <div
                    className="bg-rose-600 h-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-500 font-mono">{uploadProgress}% complete</p>
              </div>
            </div>
          ) : (
            <div className="space-y-1.5 py-1">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-sm">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900">Click to Browse or Drag &amp; Drop Video</p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Supports MP4, WebM, MOV, or OGG short videos (up to 100MB).
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Live Video Player Preview */}
      {value && (
        <div className="mt-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5 font-mono">
              <Play className="w-3 h-3 text-amber-400 fill-amber-400" /> Live Player Preview
            </span>
            <span className="text-[10px] text-slate-400 font-mono uppercase bg-slate-800 px-2 py-0.5 rounded-full">
              {videoType === 'youtube' ? 'YouTube HD' : videoType === 'vimeo' ? 'Vimeo' : 'HTML5 Video'}
            </span>
          </div>

          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-slate-800">
            {videoInfo.isDirectFile ? (
              <video
                src={videoInfo.embedUrl}
                poster={videoInfo.posterUrl}
                controls
                playsInline
                className="w-full h-full object-contain"
              />
            ) : (
              <iframe
                src={videoInfo.embedUrl}
                title={label}
                className="w-full h-full object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      )}

      {helperText && <p className="text-[10.5px] text-slate-500 leading-tight">{helperText}</p>}
    </div>
  );
}

