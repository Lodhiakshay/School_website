/**
 * Universal Video Utility Helper
 * Supports YouTube, Vimeo, Direct MP4/WebM/MOV files, and Cloudinary Video Uploads
 */

export type VideoSourceType = 'youtube' | 'vimeo' | 'direct' | 'unknown';

export interface VideoMetadata {
  type: VideoSourceType;
  id?: string;
  embedUrl: string;
  posterUrl: string;
  isDirectFile: boolean;
}

export function extractYouTubeId(url: string | undefined | null): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();

  // Direct 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Regex supporting watch, youtu.be, shorts, embed, live
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))([a-zA-Z0-9_-]{11})/i
  );

  return match ? match[1] : null;
}

export function extractVimeoId(url: string | undefined | null): string | null {
  if (!url || typeof url !== 'string') return null;
  const match = url.trim().match(/vimeo\.com\/(?:video\/)?([0-9]+)/i);
  return match ? match[1] : null;
}

export function isDirectVideoUrl(url: string | undefined | null): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim().toLowerCase();
  return (
    trimmed.endsWith('.mp4') ||
    trimmed.endsWith('.webm') ||
    trimmed.endsWith('.ogg') ||
    trimmed.endsWith('.mov') ||
    trimmed.endsWith('.m4v') ||
    trimmed.includes('/video/upload/') || // Cloudinary video
    trimmed.startsWith('/uploads/') || // Local uploaded video
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('data:video')
  );
}

export function getVideoType(url: string | undefined | null): VideoSourceType {
  if (!url || typeof url !== 'string') return 'unknown';
  if (extractYouTubeId(url)) return 'youtube';
  if (extractVimeoId(url)) return 'vimeo';
  if (isDirectVideoUrl(url)) return 'direct';
  // If it's any http link that isn't youtube/vimeo, treat as potential direct link
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) return 'direct';
  return 'unknown';
}

export function getYouTubeThumbnail(urlOrId: string | undefined | null, quality: 'hq' | 'maxres' = 'hq'): string {
  const id = extractYouTubeId(urlOrId);
  if (!id) {
    return 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80';
  }
  return quality === 'maxres'
    ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
    : `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export function getYouTubeEmbedUrl(urlOrId: string | undefined | null, autoplay = true): string {
  const id = extractYouTubeId(urlOrId);
  if (!id) return '';
  return `https://www.youtube.com/embed/${id}?autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1&enablejsapi=1`;
}

export function getVideoPlayerInfo(url: string | undefined | null, customPoster?: string, autoplay = true): VideoMetadata {
  const type = getVideoType(url);
  const defaultPoster = 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80';

  if (type === 'youtube') {
    const ytId = extractYouTubeId(url) || '';
    return {
      type: 'youtube',
      id: ytId,
      embedUrl: getYouTubeEmbedUrl(ytId, autoplay),
      posterUrl: customPoster || getYouTubeThumbnail(ytId, 'hq'),
      isDirectFile: false,
    };
  }

  if (type === 'vimeo') {
    const vimeoId = extractVimeoId(url) || '';
    return {
      type: 'vimeo',
      id: vimeoId,
      embedUrl: `https://player.vimeo.com/video/${vimeoId}?autoplay=${autoplay ? 1 : 0}&title=0&byline=0&portrait=0`,
      posterUrl: customPoster || defaultPoster,
      isDirectFile: false,
    };
  }

  return {
    type: 'direct',
    embedUrl: url || '',
    posterUrl: customPoster || defaultPoster,
    isDirectFile: true,
  };
}

