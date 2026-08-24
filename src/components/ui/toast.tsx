'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  title?: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: {
    success: (message: string, title?: string) => void;
    error: (message: string, title?: string) => void;
    info: (message: string, title?: string) => void;
    warning: (message: string, title?: string) => void;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: ToastType, message: string, title?: string) => {
    const id = 'toast_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
    const newToast: Toast = { id, message, title, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (message: string, title?: string) => addToast('success', message, title || 'Success'),
    error: (message: string, title?: string) => addToast('error', message, title || 'Notice'),
    info: (message: string, title?: string) => addToast('info', message, title || 'Information'),
    warning: (message: string, title?: string) => addToast('warning', message, title || 'Warning'),
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Centered, Safe-Zone Toast Notification Stack for Curved & Standard Displays */}
      <div className="fixed top-3 left-4 right-4 sm:left-auto sm:right-6 sm:top-6 z-[9999] max-w-sm mx-auto flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => {
          const isSuccess = t.type === 'success';
          const isError = t.type === 'error';
          const isWarning = t.type === 'warning';

          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-start gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-2xl shadow-2xl border backdrop-blur-xl transition-all duration-300 animate-in slide-in-from-top-3 fade-in ${
                isSuccess
                  ? 'bg-slate-950/95 border-emerald-500/50 text-white'
                  : isError
                  ? 'bg-slate-950/95 border-rose-500/50 text-white'
                  : isWarning
                  ? 'bg-slate-950/95 border-amber-500/50 text-white'
                  : 'bg-slate-950/95 border-blue-500/50 text-white'
              }`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {isSuccess && <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />}
                {isError && <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400" />}
                {isWarning && <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />}
                {t.type === 'info' && <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />}
              </div>

              <div className="flex-1 min-w-0 space-y-0.5">
                {t.title && (
                  <h4 className="text-xs font-black text-white font-serif tracking-tight truncate">
                    {t.title}
                  </h4>
                )}
                <p className="text-[11px] sm:text-xs text-slate-300 leading-snug font-medium line-clamp-2">
                  {t.message}
                </p>
              </div>

              <button
                onClick={() => removeToast(t.id)}
                className="p-1 text-slate-400 hover:text-white rounded-lg transition flex-shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
