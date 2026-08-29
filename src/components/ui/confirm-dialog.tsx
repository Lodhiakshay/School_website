'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X, AlertCircle, Info, Loader2 } from 'lucide-react';
import { ClientPortal } from './client-portal';
import { Button } from './button';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  description?: React.ReactNode;
  itemName?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  description = 'Are you sure you want to proceed with this action?',
  itemName,
  confirmText = 'Yes, Delete',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
}) => {
  // ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isLoading, onClose]);

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

  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'warning':
        return {
          iconBg: 'bg-amber-100 text-amber-600 ring-8 ring-amber-50',
          icon: <AlertCircle className="w-6 h-6" />,
          btnClass: 'bg-amber-600 hover:bg-amber-700 text-white',
        };
      case 'info':
        return {
          iconBg: 'bg-blue-100 text-blue-600 ring-8 ring-blue-50',
          icon: <Info className="w-6 h-6" />,
          btnClass: 'bg-blue-600 hover:bg-blue-700 text-white',
        };
      case 'danger':
      default:
        return {
          iconBg: 'bg-rose-100 text-rose-600 ring-8 ring-rose-50',
          icon: <Trash2 className="w-6 h-6" />,
          btnClass: 'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/20',
        };
    }
  };

  const vStyles = getVariantStyles();

  return (
    <ClientPortal>
      <div className="fixed inset-0 z-[9999999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
        <div
          className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150 relative overflow-hidden"
          role="dialog"
          aria-modal="true"
        >
          {/* Top Close Button */}
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition disabled:opacity-50"
            title="Cancel and close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-4">
            {/* Animated Icon Badge */}
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform ${vStyles.iconBg}`}
            >
              {vStyles.icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-4">
              <h3 className="text-base font-black text-slate-900 font-serif leading-snug">
                {title}
              </h3>

              <div className="text-xs text-slate-600 mt-1.5 space-y-2 leading-relaxed">
                {typeof description === 'string' ? (
                  <p>{description}</p>
                ) : (
                  description
                )}

                {itemName && (
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11.5px] font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                    <span className="truncate">{itemName}</span>
                  </div>
                )}

                <p className="text-[10px] text-slate-400 font-medium">
                  This action cannot be undone once confirmed.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="text-xs rounded-xl border-slate-200 text-slate-700 hover:bg-slate-100 font-bold"
            >
              {cancelText}
            </Button>

            <Button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className={`text-xs rounded-xl font-bold ${vStyles.btnClass}`}
              leftIcon={
                isLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )
              }
            >
              {isLoading ? 'Processing...' : confirmText}
            </Button>
          </div>
        </div>
      </div>
    </ClientPortal>
  );
};
