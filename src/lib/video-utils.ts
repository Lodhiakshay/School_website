/**
 * Universal Video Utility Helper
 * Supports YouTube, Facebook, Instagram, Vimeo, Google Drive,
 * and Direct MP4/WebM/MOV/Cloudinary Video Files & Uploads.
 */

export type VideoSourceType =
  | 'youtube'
  | 'facebook'
  | 'instagram'
  | 'vimeo'
  | 'drive'
  | 'direct'
  | 'unknown';

export interface VideoMetadata {
  type: VideoSourceType;
  id?: string;
  embedUrl: string;
  posterUrl: string;
  isDirectFile: boolean;
  platformLabel: string;
}

/**
 * Extract YouTube 11-char ID
 */
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

/**
 * Extract Vimeo Video ID
 */
export function extractVimeoId(url: string | undefined | null): string | null {
  if (!url || typeof url !== 'string') return null;
  const match = url.trim().match(/vimeo\.com\/(?:video\/)?([0-9]+)/i);
  return match ? match[1] : null;
}

/**
 * Extract Instagram Post or Reel Shortcode
 */
export function extractInstagramId(url: string | undefined | null): string | null {
  if (!url || typeof url !== 'string') return null;
  const match = url.trim().match(/(?:instagram\.com|instagr\.am)\/(?:p|reel|tv)\/([a-zA-Z0-9_-]+)/i);
  return match ? match[1] : null;
}

/**
 * Extract Google Drive File ID
 */
export function extractGoogleDriveId(url: string | undefined | null): string | null {
  if (!url || typeof url !== 'string') return null;
  const match = url.trim().match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]+)/i);
  return match ? match[1] : null;
}

/**
 * Check if URL is a Facebook Video or Reel
 */
export function isFacebookVideo(url: string | undefined | null): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim().toLowerCase();
  return (
    trimmed.includes('facebook.com/') ||
    trimmed.includes('fb.watch/') ||
    trimmed.includes('fb.com/')
  );
}

/**
 * Check if URL is a direct playable video stream/file
 */
export function isDirectVideoUrl(url: string | undefined | null): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim().toLowerCase();
  return (
    trimmed.endsWith('.mp4') ||
    trimmed.endsWith('.webm') ||
    trimmed.endsWith('.ogg') ||
    trimmed.endsWith('.mov') ||
    trimmed.endsWith('.m4v') ||
    trimmed.endsWith('.avi') ||
    trimmed.includes('/video/upload/') || // Cloudinary video
    trimmed.startsWith('/uploads/') || // Local uploaded video
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('data:video')
  );
}

/**
 * Identify platform video source type
 */
export function getVideoType(url: string | undefined | null): VideoSourceType {
  if (!url || typeof url !== 'string') return 'unknown';
  const trimmed = url.trim();
  if (extractYouTubeId(trimmed)) return 'youtube';
  if (extractInstagramId(trimmed)) return 'instagram';
  if (isFacebookVideo(trimmed)) return 'facebook';
  if (extractVimeoId(trimmed)) return 'vimeo';
  if (extractGoogleDriveId(trimmed)) return 'drive';
  if (isDirectVideoUrl(trimmed)) return 'direct';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/')) {
    return 'direct';
  }
  return 'unknown';
}

/**
 * Get YouTube Thumbnail
 */
export function getYouTubeThumbnail(urlOrId: string | undefined | null, quality: 'hq' | 'maxres' = 'hq'): string {
  const id = extractYouTubeId(urlOrId);
  if (!id) {
    return 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80';
  }
  return quality === 'maxres'
    ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
    : `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

/**
 * Get YouTube Embed URL
 */
export function getYouTubeEmbedUrl(urlOrId: string | undefined | null, autoplay = true): string {
  const id = extractYouTubeId(urlOrId);
  if (!id) return '';
  return `https://www.youtube.com/embed/${id}?autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1&enablejsapi=1`;
}

/**
 * Universal Video Resolver
 */
export function getVideoPlayerInfo(
  url: string | undefined | null,
  customPoster?: string,
  autoplay = true
): VideoMetadata {
  const type = getVideoType(url);
  const defaultPoster =
    'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80';

  if (type === 'youtube') {
    const ytId = extractYouTubeId(url) || '';
    return {
      type: 'youtube',
      id: ytId,
      embedUrl: getYouTubeEmbedUrl(ytId, autoplay),
      posterUrl: customPoster || getYouTubeThumbnail(ytId, 'hq'),
      isDirectFile: false,
      platformLabel: 'YouTube HD',
    };
  }

  if (type === 'instagram') {
    const igId = extractInstagramId(url) || '';
    return {
      type: 'instagram',
      id: igId,
      embedUrl: `https://www.instagram.com/reel/${igId}/embed/`,
      posterUrl: customPoster || defaultPoster,
      isDirectFile: false,
      platformLabel: 'Instagram Reel',
    };
  }

  if (type === 'facebook') {
    const cleanUrl = (url || '').trim();
    return {
      type: 'facebook',
      embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(cleanUrl)}&show_text=0&autoplay=${autoplay ? 1 : 0}`,
      posterUrl: customPoster || defaultPoster,
      isDirectFile: false,
      platformLabel: 'Facebook Video',
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
      platformLabel: 'Vimeo HD',
    };
  }

  if (type === 'drive') {
    const driveId = extractGoogleDriveId(url) || '';
    return {
      type: 'drive',
      id: driveId,
      embedUrl: `https://drive.google.com/file/d/${driveId}/preview`,
      posterUrl: customPoster || defaultPoster,
      isDirectFile: false,
      platformLabel: 'Google Drive Video',
    };
  }

  return {
    type: 'direct',
    embedUrl: url || '',
    posterUrl: customPoster || defaultPoster,
    isDirectFile: true,
    platformLabel: 'Direct Video File (MP4 / WebM)',
  };
}

