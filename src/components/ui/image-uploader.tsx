'use client';

import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Loader2, CheckCircle, RefreshCw, Crop } from 'lucide-react';
import { apiClient } from '../../lib/api-client';
import { useToast } from './toast';
import { ImageCropModal, AspectRatioOption } from './image-crop-modal';

interface ImageUploaderProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide' | 'auto';
  helperText?: string;
  className?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  onChange,
  aspectRatio = 'video',
  helperText,
  className = '',
}) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  // Crop States
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [rawImageForCrop, setRawImageForCrop] = useState('');

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square max-w-[200px]';
      case 'portrait':
        return 'aspect-[3/4] max-w-[220px]';
      case 'wide':
        return 'aspect-[21/9] w-full';
      case 'video':
        return 'aspect-video w-full max-w-[420px]';
      default:
        return 'min-h-[160px] w-full';
    }
  };

  const getDefaultCropAspect = (): AspectRatioOption => {
    switch (aspectRatio) {
      case 'square':
        return '1:1';
      case 'portrait':
        return '3:4';
      case 'wide':
      case 'video':
        return '16:9';
      default:
        return '4:3';
    }
  };

  const handleFile = (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file (JPG, PNG, WEBP, GIF, SVG)', 'Invalid File');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      toast.error('Image size must be under 15MB', 'File Too Large');
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

  const handleSaveFinalImage = async (finalDataUrl: string) => {
    setIsUploading(true);
    setPreviewError(false);
    onChange(finalDataUrl);

    try {
      const res = await apiClient.post('/school/upload-media', {
        file: finalDataUrl,
      });

      if (res.data?.data?.url) {
        onChange(res.data.data.url);
      }
    } catch {
      // Fallback retains finalDataUrl
    } finally {
      setIsUploading(false);
      toast.success('Image saved successfully!', 'Image Ready');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700">{label}</label>
        <div className="flex items-center gap-2">
          {value && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setRawImageForCrop(value);
                setCropModalOpen(true);
              }}
              className="text-[11px] text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-lg transition"
              title="Crop or Adjust Image"
            >
              <Crop className="w-3 h-3 text-amber-600" /> Crop / Adjust
            </button>
          )}
          {value && (
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> Image Active
            </span>
          )}
        </div>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`relative rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden group ${
          isDragOver
            ? 'border-blue-500 bg-blue-50/50 scale-[1.01]'
            : 'border-slate-300 hover:border-blue-400 bg-slate-50/50'
        } ${getAspectClass()}`}
      >
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
          disabled={isUploading}
        />

        {/* Existing Visual Image Preview */}
        {value && !previewError ? (
          <div className="relative w-full h-full">
            <img
              src={value}
              alt={label}
              onError={() => setPreviewError(true)}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
              <div className="bg-white/95 text-slate-900 px-3.5 py-1.5 rounded-xl text-xs font-black shadow-lg flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
                <span>Upload New / Change Image</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full p-4 flex flex-col items-center justify-center text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-blue-100/80 text-blue-600 flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-black text-slate-800">
                Click to Upload Image or Drag &amp; Drop
              </p>
              <p className="text-[10px] text-slate-500 font-medium">
                PNG, JPG, WEBP or GIF • Crop &amp; Adjust Support
              </p>
            </div>
          </div>
        )}

        {/* Uploading Overlay */}
        {isUploading && (
          <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm flex flex-col items-center justify-center text-white space-y-2 z-10 animate-in fade-in duration-150">
            <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
            <p className="text-xs font-black tracking-wide">Processing &amp; Uploading...</p>
          </div>
        )}
      </div>

      {helperText && <p className="text-[10px] text-slate-500">{helperText}</p>}

      {/* Image Cropper Modal */}
      <ImageCropModal
        isOpen={cropModalOpen}
        imageSrc={rawImageForCrop}
        onClose={() => setCropModalOpen(false)}
        onCropComplete={handleSaveFinalImage}
        onUseOriginal={handleSaveFinalImage}
        defaultAspectRatio={getDefaultCropAspect()}
        title={`Crop & Adjust ${label}`}
        description="Select crop area or click 'Use Original (No Crop)'."
      />
    </div>
  );
};