'use client';

import React, { useState, useRef } from 'react';
import {
  Upload,
  Camera,
  Image as ImageIcon,
  X,
  Sparkles,
  Check,
  User,
  RefreshCw,
  Loader2,
  Crop,
} from 'lucide-react';
import { apiClient } from '../../lib/api-client';
import { useToast } from './toast';
import { ImageCropModal } from './image-crop-modal';

// Curated stock avatar presets for instant selection
export const AVATAR_PRESETS = [
  {
    category: 'Male Faculty / Principal',
    avatars: [
      { label: 'Senior Educator 1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
      { label: 'Senior Educator 2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
      { label: 'Faculty Member 3', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
      { label: 'Faculty Member 4', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80' },
      { label: 'Faculty Member 5', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80' },
    ],
  },
  {
    category: 'Female Faculty / Staff',
    avatars: [
      { label: 'Vice Principal / Senior Lecturer', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' },
      { label: 'Faculty Member 2', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80' },
      { label: 'Faculty Member 3', url: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80' },
      { label: 'Faculty Member 4', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' },
    ],
  },
  {
    category: 'Male Students',
    avatars: [
      { label: 'Scholar Boy 1', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80' },
      { label: 'Scholar Boy 2', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80' },
      { label: 'Scholar Boy 3', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80' },
    ],
  },
  {
    category: 'Female Students',
    avatars: [
      { label: 'Scholar Girl 1', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80' },
      { label: 'Scholar Girl 2', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80' },
      { label: 'Scholar Girl 3', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
    ],
  },
];

interface AvatarPickerProps {
  label?: string;
  value?: string;
  onChange: (url: string) => void;
  shape?: 'circle' | 'rounded' | 'square';
  size?: 'sm' | 'md' | 'lg';
  helperText?: string;
  className?: string;
}

export const AvatarPicker: React.FC<AvatarPickerProps> = ({
  label = 'Profile Photo / Avatar',
  value,
  onChange,
  shape = 'rounded',
  size = 'md',
  helperText,
  className = '',
}) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [isPresetsOpen, setIsPresetsOpen] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [previewError, setPreviewError] = useState(false);

  // Image Cropping States
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [rawImageForCrop, setRawImageForCrop] = useState('');

  const getDimensions = () => {
    switch (size) {
      case 'sm':
        return 'w-12 h-12';
      case 'lg':
        return 'w-24 h-24';
      case 'md':
      default:
        return 'w-18 h-18 sm:w-20 sm:h-20';
    }
  };

  const getShapeClass = () => {
    switch (shape) {
      case 'circle':
        return 'rounded-full';
      case 'square':
        return 'rounded-lg';
      case 'rounded':
      default:
        return 'rounded-2xl';
    }
  };

  // Convert file to data URL and open cropper
  const handleFile = (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file (JPG, PNG, WEBP)', 'Invalid File');
      return;
    }

    if (file.size > 12 * 1024 * 1024) {
      toast.error('Image size must be under 12MB', 'File Too Large');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setRawImageForCrop(e.target.result as string);
        setCropModalOpen(true);
      }
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Finalize selected photo (either cropped or original)
  const handleSavePhoto = async (finalDataUrl: string) => {
    setIsUploading(true);
    setPreviewError(false);
    onChange(finalDataUrl);

    try {
      // Try to upload to server/CDN
      const res = await apiClient.post('/school/upload-media', {
        file: finalDataUrl,
      });

      if (res.data?.data?.url) {
        onChange(res.data.data.url);
      }
    } catch {
      // Keep finalDataUrl (Data URL fallback)
    } finally {
      setIsUploading(false);
      toast.success('Profile photo saved successfully!', 'Photo Updated');
    }
  };

  const handleApplyCustomUrl = () => {
    if (!customUrlInput.trim()) return;
    const clean = customUrlInput.trim();
    setIsUrlModalOpen(false);
    setCustomUrlInput('');
    setRawImageForCrop(clean);
    setCropModalOpen(true);
  };

  const handleSelectPreset = (url: string) => {
    onChange(url);
    setIsPresetsOpen(false);
    toast.success('Avatar preset applied.', 'Avatar Selected');
  };

  const handleRemovePhoto = () => {
    onChange('');
    setPreviewError(false);
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && <label className="block text-xs font-bold text-slate-800">{label}</label>}

      <div className="flex items-center gap-3.5 p-2.5 rounded-2xl border border-slate-200 bg-slate-50/70">
        {/* Avatar Display Box */}
        <div
          className={`relative ${getDimensions()} ${getShapeClass()} overflow-hidden border-2 border-slate-300 bg-white shadow-sm flex items-center justify-center shrink-0 group`}
        >
          {isUploading ? (
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center text-white">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          ) : value && !previewError ? (
            <>
              <img
                src={value}
                alt="Profile Preview"
                onError={() => setPreviewError(true)}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="absolute inset-0 bg-slate-950/70 text-white opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                title="Remove Photo"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="text-slate-400 flex flex-col items-center justify-center p-1">
              <User className="w-6 h-6 stroke-[1.5]" />
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Upload from Device */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFile(e.target.files[0]);
                }
              }}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="px-2.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shadow-xs flex items-center gap-1.5 transition"
            >
              <Upload className="w-3.5 h-3.5" />
              {isUploading ? 'Uploading...' : 'Upload Photo'}
            </button>

            {/* Crop / Adjust current image */}
            {value && (
              <button
                type="button"
                onClick={() => {
                  setRawImageForCrop(value);
                  setCropModalOpen(true);
                }}
                className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[11px] font-bold shadow-xs flex items-center gap-1.5 transition"
                title="Crop or Adjust Current Photo"
              >
                <Crop className="w-3.5 h-3.5 text-amber-600" />
                Crop / Adjust
              </button>
            )}

            {/* Presets Picker */}
            <button
              type="button"
              onClick={() => setIsPresetsOpen(true)}
              className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-[11px] font-bold shadow-xs flex items-center gap-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Choose Preset
            </button>

            {/* Direct Web URL */}
            <button
              type="button"
              onClick={() => setIsUrlModalOpen(true)}
              className="px-2 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-medium transition"
              title="Enter Image Web Link"
            >
              Web URL
            </button>

            {value && (
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                title="Clear Photo"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <p className="text-[10px] text-slate-500 leading-tight">
            {helperText || 'JPG, PNG or WebP under 12MB. Crop or use original image. Syncs with PVC ID Cards.'}
          </p>
        </div>
      </div>

      {/* Image Cropper Modal */}
      <ImageCropModal
        isOpen={cropModalOpen}
        imageSrc={rawImageForCrop}
        onClose={() => setCropModalOpen(false)}
        onCropComplete={handleSavePhoto}
        onUseOriginal={handleSavePhoto}
        defaultAspectRatio="1:1"
        title="Crop & Position Profile Photo"
        description="Choose your crop area (1:1 Avatar, 3:4 ID Card) or click 'Use Original (No Crop)'."
      />

      {/* Preset Avatars Modal */}
      {isPresetsOpen && (
        <div className="fixed inset-0 z-[9999999] bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-100 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 shrink-0">
              <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5 font-serif">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Select Institutional Avatar Preset
              </h4>
              <button
                type="button"
                onClick={() => setIsPresetsOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-3.5 pr-1 flex-1">
              {AVATAR_PRESETS.map((group) => (
                <div key={group.category} className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {group.category}
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {group.avatars.map((av, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectPreset(av.url)}
                        className={`group relative aspect-square rounded-2xl overflow-hidden border-2 transition ${
                          value === av.url ? 'border-blue-600 ring-2 ring-blue-400/40' : 'border-slate-200 hover:border-blue-400'
                        }`}
                      >
                        <img src={av.url} alt={av.label} className="w-full h-full object-cover group-hover:scale-105 transition" />
                        {value === av.url && (
                          <div className="absolute inset-0 bg-blue-600/30 flex items-center justify-center text-white">
                            <Check className="w-4 h-4 drop-shadow-md" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 shrink-0">
              <button
                type="button"
                onClick={() => setIsPresetsOpen(false)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom URL Input Modal */}
      {isUrlModalOpen && (
        <div className="fixed inset-0 z-[9999999] bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-3.5 animate-in zoom-in-95 duration-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
                Image Web Link URL
              </h4>
              <button
                type="button"
                onClick={() => setIsUrlModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="block text-[10px] font-bold text-slate-700">Paste Image URL *</label>
              <input
                type="text"
                value={customUrlInput}
                onChange={(e) => setCustomUrlInput(e.target.value)}
                placeholder="https://images.unsplash.com/... or https://..."
                className="w-full p-2.5 border border-slate-300 rounded-xl text-xs outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                autoFocus
              />
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={handleApplyCustomUrl}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-xl shadow-xs"
              >
                Apply Image URL
              </button>
              <button
                type="button"
                onClick={() => setIsUrlModalOpen(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3 py-2 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};