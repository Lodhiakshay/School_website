'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  X,
  Crop,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Check,
  Image as ImageIcon,
  RefreshCw,
  Move,
} from 'lucide-react';
import { ClientPortal } from './client-portal';
import { Button } from './button';

export type AspectRatioOption = '1:1' | '3:4' | '4:3' | '16:9' | 'free';

export interface ImageCropModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedDataUrl: string) => void;
  onUseOriginal?: (originalDataUrl: string) => void;
  defaultAspectRatio?: AspectRatioOption;
  title?: string;
  description?: string;
}

type DragHandle = 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'w' | 'e' | 'move' | null;

export const ImageCropModal: React.FC<ImageCropModalProps> = ({
  isOpen,
  imageSrc,
  onClose,
  onCropComplete,
  onUseOriginal,
  defaultAspectRatio = '1:1',
  title = 'Crop & Adjust Image',
  description = 'Drag edges/corners to resize, scroll to zoom, or drag inside the box to reposition.',
}) => {
  const [aspectRatio, setAspectRatio] = useState<AspectRatioOption>(defaultAspectRatio);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0); // 0, 90, 180, 270

  // Crop rectangle in percentages of container [0, 100]
  const [cropRect, setCropRect] = useState({
    x: 10,
    y: 10,
    width: 80,
    height: 80,
  });

  const [activeHandle, setActiveHandle] = useState<DragHandle>(null);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [startCropRect, setStartCropRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageNaturalSize, setImageNaturalSize] = useState({ width: 0, height: 0 });

  // Initialize crop rect based on aspect ratio
  const initCropRectForAspect = useCallback((aspect: AspectRatioOption) => {
    let widthPercent = 70;
    let heightPercent = 70;

    switch (aspect) {
      case '1:1':
        widthPercent = 65;
        heightPercent = 65;
        break;
      case '3:4':
        widthPercent = 52;
        heightPercent = 70;
        break;
      case '4:3':
        widthPercent = 72;
        heightPercent = 54;
        break;
      case '16:9':
        widthPercent = 84;
        heightPercent = 48;
        break;
      case 'free':
      default:
        widthPercent = 75;
        heightPercent = 75;
        break;
    }

    setCropRect({
      x: (100 - widthPercent) / 2,
      y: (100 - heightPercent) / 2,
      width: widthPercent,
      height: heightPercent,
    });
  }, []);

  // Reset when opening modal with new image
  useEffect(() => {
    if (isOpen && imageSrc) {
      setZoom(1);
      setRotation(0);
      setAspectRatio(defaultAspectRatio);
      initCropRectForAspect(defaultAspectRatio);

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageSrc;
      img.onload = () => {
        imageRef.current = img;
        setImageNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
        setImageLoaded(true);
      };
    }
  }, [isOpen, imageSrc, defaultAspectRatio, initCropRectForAspect]);

  // When aspect ratio tab changes
  const handleAspectChange = (newAspect: AspectRatioOption) => {
    setAspectRatio(newAspect);
    initCropRectForAspect(newAspect);
  };

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle Mouse Wheel Zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.0015;
    setZoom((prev) => Math.min(4, Math.max(0.5, Number((prev + delta).toFixed(2)))));
  };

  // Start Resizing / Moving
  const startDrag = (handle: DragHandle, clientX: number, clientY: number) => {
    setActiveHandle(handle);
    setDragStartPos({ x: clientX, y: clientY });
    setStartCropRect({ ...cropRect });
  };

  const handlePointerDown = (handle: DragHandle) => (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    startDrag(handle, clientX, clientY);
  };

  // Dragging logic for handles and center move
  const handleGlobalMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!activeHandle || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const deltaXPercent = ((clientX - dragStartPos.x) / containerRect.width) * 100;
      const deltaYPercent = ((clientY - dragStartPos.y) / containerRect.height) * 100;

      let nextX = startCropRect.x;
      let nextY = startCropRect.y;
      let nextW = startCropRect.width;
      let nextH = startCropRect.height;

      const minSizePercent = 15;

      if (activeHandle === 'move') {
        nextX = Math.min(Math.max(0, startCropRect.x + deltaXPercent), 100 - startCropRect.width);
        nextY = Math.min(Math.max(0, startCropRect.y + deltaYPercent), 100 - startCropRect.height);
      } else {
        // Edge: East (Right)
        if (activeHandle.includes('e')) {
          nextW = Math.max(minSizePercent, Math.min(100 - startCropRect.x, startCropRect.width + deltaXPercent));
        }
        // Edge: West (Left)
        if (activeHandle.includes('w')) {
          const maxLeftDelta = startCropRect.width - minSizePercent;
          const clampedDeltaX = Math.min(maxLeftDelta, Math.max(-startCropRect.x, deltaXPercent));
          nextX = startCropRect.x + clampedDeltaX;
          nextW = startCropRect.width - clampedDeltaX;
        }
        // Edge: South (Bottom)
        if (activeHandle.includes('s')) {
          nextH = Math.max(minSizePercent, Math.min(100 - startCropRect.y, startCropRect.height + deltaYPercent));
        }
        // Edge: North (Top)
        if (activeHandle.includes('n')) {
          const maxTopDelta = startCropRect.height - minSizePercent;
          const clampedDeltaY = Math.min(maxTopDelta, Math.max(-startCropRect.y, deltaYPercent));
          nextY = startCropRect.y + clampedDeltaY;
          nextH = startCropRect.height - clampedDeltaY;
        }

        // Maintain fixed aspect ratio if not 'free'
        if (aspectRatio !== 'free') {
          let ratio = 1;
          if (aspectRatio === '3:4') ratio = 3 / 4;
          if (aspectRatio === '4:3') ratio = 4 / 3;
          if (aspectRatio === '16:9') ratio = 16 / 9;

          if (activeHandle === 'e' || activeHandle === 'w' || activeHandle === 'se' || activeHandle === 'sw') {
            nextH = nextW / ratio;
          } else {
            nextW = nextH * ratio;
          }

          // Bound within viewport container
          if (nextX + nextW > 100) nextW = 100 - nextX;
          if (nextY + nextH > 100) nextH = 100 - nextY;
        }
      }

      setCropRect({
        x: Math.max(0, Math.min(100 - minSizePercent, nextX)),
        y: Math.max(0, Math.min(100 - minSizePercent, nextY)),
        width: Math.max(minSizePercent, nextW),
        height: Math.max(minSizePercent, nextH),
      });
    },
    [activeHandle, dragStartPos, startCropRect, aspectRatio]
  );

  const stopDrag = () => {
    setActiveHandle(null);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleGlobalMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) handleGlobalMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onMouseUp = () => stopDrag();
    const onTouchEnd = () => stopDrag();

    if (activeHandle) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchend', onTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [activeHandle, handleGlobalMove]);

  // Rotate 90 degrees
  const handleRotate = () => {
    setRotation((r) => (r + 90) % 360);
  };

  // Reset to original
  const handleReset = () => {
    setZoom(1);
    setRotation(0);
    initCropRectForAspect(aspectRatio);
  };

  // Apply Crop Output via HTML5 Canvas
  const handleApplyCrop = useCallback(() => {
    if (!imageRef.current || !containerRef.current) {
      onCropComplete(imageSrc);
      onClose();
      return;
    }

    const img = imageRef.current;
    const targetWidth = 600;
    let targetHeight = 600;

    if (aspectRatio === '3:4') targetHeight = 800;
    else if (aspectRatio === '4:3') targetHeight = 450;
    else if (aspectRatio === '16:9') targetHeight = 338;
    else if (aspectRatio === 'free') {
      targetHeight = Math.round((cropRect.height / cropRect.width) * targetWidth);
    }

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      onCropComplete(imageSrc);
      onClose();
      return;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Calculate source image crop coordinates relative to zoom and crop box
    const srcX = (cropRect.x / 100) * img.naturalWidth;
    const srcY = (cropRect.y / 100) * img.naturalHeight;
    const srcW = (cropRect.width / 100) * img.naturalWidth;
    const srcH = (cropRect.height / 100) * img.naturalHeight;

    // Apply rotation and zoom to output canvas
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);

    ctx.drawImage(
      img,
      srcX,
      srcY,
      srcW,
      srcH,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );
    ctx.restore();

    const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.94);
    onCropComplete(croppedDataUrl);
    onClose();
  }, [aspectRatio, cropRect, zoom, rotation, imageSrc, onCropComplete, onClose]);

  const handleKeepOriginal = () => {
    if (onUseOriginal) {
      onUseOriginal(imageSrc);
    } else {
      onCropComplete(imageSrc);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ClientPortal>
      <div className="fixed inset-0 z-[9999999] flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150 overflow-y-auto w-full h-full min-h-screen">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150 my-auto">
          {/* Header */}
          <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0">
            <div className="min-w-0 pr-2">
              <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2 font-serif">
                <Crop className="w-4 h-4 text-blue-600" /> {title}
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">{description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition shrink-0"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive Multi-Handle Cropper Workspace */}
          <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
            {/* Viewport Box */}
            <div
              ref={containerRef}
              onWheel={handleWheel}
              className="relative w-full h-64 sm:h-80 bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center select-none border border-slate-800 shadow-inner group"
            >
              {/* Underlying Image */}
              {imageLoaded && (
                <img
                  src={imageSrc}
                  alt="Source"
                  draggable={false}
                  style={{
                    transform: `scale(${zoom}) rotate(${rotation}deg)`,
                    transition: activeHandle ? 'none' : 'transform 0.15s ease-out',
                  }}
                  className="max-w-full max-h-full object-contain pointer-events-none transition-transform select-none"
                />
              )}

              {/* Dynamic Overlay Box with 8 Resize Handles */}
              <div
                style={{
                  left: `${cropRect.x}%`,
                  top: `${cropRect.y}%`,
                  width: `${cropRect.width}%`,
                  height: `${cropRect.height}%`,
                }}
                className="absolute border-2 border-amber-400 bg-transparent shadow-[0_0_0_9999px_rgba(15,23,42,0.78)] z-20 cursor-move"
                onMouseDown={handlePointerDown('move')}
                onTouchStart={handlePointerDown('move')}
              >
                {/* Rule of Thirds Grid Guidelines */}
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-40">
                  <div className="border-r border-b border-white" />
                  <div className="border-r border-b border-white" />
                  <div className="border-b border-white" />
                  <div className="border-r border-b border-white" />
                  <div className="border-r border-b border-white" />
                  <div className="border-b border-white" />
                  <div className="border-r border-white" />
                  <div className="border-r border-white" />
                  <div />
                </div>

                {/* Center Move Indicator Pill */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-slate-950/70 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-xs">
                    <Move className="w-2.5 h-2.5" /> Drag Box
                  </span>
                </div>

                {/* 4 Corner Handles (NW, NE, SW, SE) */}
                <div
                  onMouseDown={handlePointerDown('nw')}
                  onTouchStart={handlePointerDown('nw')}
                  className="absolute -top-2 -left-2 w-4 h-4 bg-amber-400 rounded-full border-2 border-white shadow-md cursor-nwse-resize z-30 hover:scale-125 transition-transform"
                />
                <div
                  onMouseDown={handlePointerDown('ne')}
                  onTouchStart={handlePointerDown('ne')}
                  className="absolute -top-2 -right-2 w-4 h-4 bg-amber-400 rounded-full border-2 border-white shadow-md cursor-nesw-resize z-30 hover:scale-125 transition-transform"
                />
                <div
                  onMouseDown={handlePointerDown('sw')}
                  onTouchStart={handlePointerDown('sw')}
                  className="absolute -bottom-2 -left-2 w-4 h-4 bg-amber-400 rounded-full border-2 border-white shadow-md cursor-nesw-resize z-30 hover:scale-125 transition-transform"
                />
                <div
                  onMouseDown={handlePointerDown('se')}
                  onTouchStart={handlePointerDown('se')}
                  className="absolute -bottom-2 -right-2 w-4 h-4 bg-amber-400 rounded-full border-2 border-white shadow-md cursor-nwse-resize z-30 hover:scale-125 transition-transform"
                />

                {/* 4 Edge Handles (N, S, W, E) for Side Dragging Up/Down/Left/Right */}
                <div
                  onMouseDown={handlePointerDown('n')}
                  onTouchStart={handlePointerDown('n')}
                  className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-3 bg-amber-400/90 rounded-full border border-white shadow-sm cursor-ns-resize z-30 hover:scale-110 transition-transform"
                  title="Drag Top Side Up/Down"
                />
                <div
                  onMouseDown={handlePointerDown('s')}
                  onTouchStart={handlePointerDown('s')}
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-3 bg-amber-400/90 rounded-full border border-white shadow-sm cursor-ns-resize z-30 hover:scale-110 transition-transform"
                  title="Drag Bottom Side Up/Down"
                />
                <div
                  onMouseDown={handlePointerDown('w')}
                  onTouchStart={handlePointerDown('w')}
                  className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-8 bg-amber-400/90 rounded-full border border-white shadow-sm cursor-ew-resize z-30 hover:scale-110 transition-transform"
                  title="Drag Left Side Left/Right"
                />
                <div
                  onMouseDown={handlePointerDown('e')}
                  onTouchStart={handlePointerDown('e')}
                  className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-8 bg-amber-400/90 rounded-full border border-white shadow-sm cursor-ew-resize z-30 hover:scale-110 transition-transform"
                  title="Drag Right Side Left/Right"
                />
              </div>

              {/* Bottom Quick Help Helper */}
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                <span className="text-[10px] font-bold text-white/90 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-sm">
                  Drag 8 Handles to Resize • Scroll to Zoom
                </span>
              </div>
            </div>

            {/* Aspect Ratio Selector */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider">
                  Aspect Ratio (क्रॉप अनुपात)
                </label>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  {aspectRatio === 'free' ? 'Custom Freeform' : aspectRatio}
                </span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {[
                  { key: '1:1', label: '1:1 Square', desc: 'Avatar / Profile' },
                  { key: '3:4', label: '3:4 Portrait', desc: 'Passport / ID Card' },
                  { key: '4:3', label: '4:3 Standard', desc: 'Photo' },
                  { key: '16:9', label: '16:9 Banner', desc: 'Wide Showcase' },
                  { key: 'free', label: 'Custom Free', desc: 'Custom 8-side' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handleAspectChange(item.key as AspectRatioOption)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                      aspectRatio === item.key
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {aspectRatio === item.key && <Check className="w-3 h-3 text-white" />}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Transform Controls: Zoom Slider, Rotate, Reset */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Zoom Slider */}
              <div className="bg-slate-50 p-2 rounded-2xl border border-slate-200 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(0.5, Number((z - 0.2).toFixed(1))))}
                  className="p-1 rounded-lg hover:bg-slate-200 text-slate-600 transition"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <input
                  type="range"
                  min="0.5"
                  max="4"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(4, Number((z + 0.2).toFixed(1))))}
                  className="p-1 rounded-lg hover:bg-slate-200 text-slate-600 transition"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <span className="text-[10px] font-mono font-bold text-slate-600 min-w-8 text-right">
                  {Math.round(zoom * 100)}%
                </span>
              </div>

              {/* Rotate & Reset */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRotate}
                  className="flex-1 py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition"
                >
                  <RotateCw className="w-3.5 h-3.5 text-blue-600" />
                  Rotate 90°
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl text-xs font-bold text-slate-600 flex items-center justify-center gap-1.5 transition"
                  title="Reset View"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-center justify-between gap-2.5 shrink-0">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto text-xs rounded-xl"
            >
              Cancel
            </Button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                type="button"
                variant="outline"
                onClick={handleKeepOriginal}
                className="flex-1 sm:flex-initial text-xs rounded-xl border-slate-300 hover:bg-slate-100 text-slate-700 font-bold"
                leftIcon={<ImageIcon className="w-3.5 h-3.5 text-slate-500" />}
              >
                Use Original (No Crop)
              </Button>

              <Button
                type="button"
                onClick={handleApplyCrop}
                className="flex-1 sm:flex-initial bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20"
                leftIcon={<Check className="w-4 h-4" />}
              >
                Crop &amp; Apply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ClientPortal>
  );
};
