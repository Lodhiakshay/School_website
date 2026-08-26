'use client';

import React, { useState, useEffect } from 'react';
import { Download, X, Sparkles, Smartphone, ShieldCheck, Share, PlusSquare } from 'lucide-react';
import { useToast } from '../ui/toast';

export const PwaInstallPrompt: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);

    // Check if already in standalone PWA mode
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true)
    ) {
      setIsInstalled(true);
      return;
    }

    // Check if on iOS Safari
    if (typeof window !== 'undefined') {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
      const isSafari = /safari/.test(userAgent) && !/chrome|crios|fxios/.test(userAgent);
      setIsIos(isIosDevice && isSafari);
    }

    const dismissed = typeof window !== 'undefined' ? sessionStorage.getItem('pwa_prompt_dismissed') : null;
    if (dismissed) {
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setIsInstalling(false);
      setDeferredPrompt(null);
      toast.success('SGM & SSSD App installed successfully to your device!', 'App Installed');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, [toast]);

  const handleInstall = async () => {
    if (isIos) {
      setShowIosGuide(true);
      return;
    }

    if (!deferredPrompt) {
      toast.info('To install, tap browser menu (⋮) and select "Install app" or "Add to Home screen".', 'Install Guide');
      return;
    }

    setIsInstalling(true);
    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice && choice.outcome === 'accepted') {
        setShowPrompt(false);
        toast.success('Adding SGM & SSSD App to your Home Screen...', 'Installing');
      }
    } catch (err) {
      console.warn('Install prompt error:', err);
    } finally {
      setIsInstalling(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('pwa_prompt_dismissed', 'true');
    }
  };

  if (!mounted || !showPrompt || isInstalled) return null;

  return (
    <aside
      aria-label="Install SGM & SSSD App"
      className="fixed bottom-3 right-3 left-3 sm:left-auto sm:right-6 sm:bottom-6 z-[9999] max-w-md w-full sm:w-[420px] bg-slate-950/95 text-white border-2 border-amber-400/50 rounded-3xl p-4 sm:p-5 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-bottom-5 duration-300 font-sans"
    >
      {/* Decorative Glow */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-amber-500/20 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-blue-600/20 rounded-full blur-2xl pointer-events-none"></div>

      {/* Header with Close */}
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          {/* Dual Campus Logos */}
          <div className="flex items-center -space-x-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-amber-400 bg-white p-0.5 shadow-lg flex-shrink-0 flex items-center justify-center relative z-10">
              <img src="/logo.png" alt="SGM Logo" className="w-full h-full object-contain" />
            </div>
            <div className="w-11 h-11 rounded-2xl overflow-hidden border-2 border-emerald-400 bg-white p-0.5 shadow-lg flex-shrink-0 flex items-center justify-center relative z-0">
              <img src="/images/sssd-logo.png" alt="SSSD Logo" className="w-full h-full object-contain" />
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-amber-400/30">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Official School App</span>
            </div>
            <h3 className="text-sm font-black text-white font-serif mt-0.5 leading-tight">
              सरस्वती ज्ञान मंदिर &amp; SSSD App
            </h3>
            <p className="text-[11px] text-slate-300">Shamsabad (Farrukhabad) &bull; 100% Free</p>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="text-slate-400 hover:text-white hover:bg-slate-800 p-1.5 rounded-xl transition"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Feature Highlights Bento */}
      <div className="mt-3.5 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] text-slate-200">
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-2 rounded-xl border border-slate-800">
          <Smartphone className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span className="font-semibold truncate">1-Tap Fast Access</span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-900/80 p-2 rounded-xl border border-slate-800">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
          <span className="font-semibold truncate">ID Card &amp; Fees Portal</span>
        </div>
      </div>

      {/* iOS Safari Instruction Helper */}
      {showIosGuide && (
        <div className="mt-3 p-3 bg-blue-950/80 rounded-2xl border border-blue-400/40 text-xs space-y-1.5 text-blue-100 animate-in fade-in">
          <p className="font-bold flex items-center gap-1 text-amber-300">
            <Share className="w-3.5 h-3.5" /> How to Install on iPhone / iPad:
          </p>
          <ol className="list-decimal list-inside text-[11px] text-slate-200 space-y-0.5">
            <li>Tap the <strong className="text-white">Share</strong> button (⎋) at the bottom of Safari.</li>
            <li>Scroll down and tap <strong className="text-white">Add to Home Screen</strong> (<PlusSquare className="w-3 h-3 inline text-amber-300" />).</li>
            <li>Tap <strong className="text-white">Add</strong> in top right. Done!</li>
          </ol>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-3.5 flex items-center gap-2">
        <button
          onClick={handleInstall}
          disabled={isInstalling}
          className="flex-1 py-2.5 px-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-600 text-white font-black text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all active:scale-98 border border-blue-400/30 disabled:opacity-50"
        >
          {isInstalling ? (
            <>
              <span className="animate-spin text-xs">⏳</span>
              <span>Installing App...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-amber-300 animate-bounce" />
              <span>Install App on Device</span>
            </>
          )}
        </button>
        <button
          onClick={handleDismiss}
          className="py-2.5 px-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs border border-slate-700 transition"
        >
          Later
        </button>
      </div>
    </aside>
  );
};
