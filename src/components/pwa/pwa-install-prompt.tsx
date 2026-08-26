'use client';

import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { useToast } from '../ui/toast';

const DISMISS_KEY = 'sgm_pwa_dismissed_time';
const DISMISS_COOLDOWN_DAYS = 7; // Don't show again for 7 days if dismissed

export const PwaInstallPrompt: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);

    // 1. Check if already installed / running in standalone PWA mode
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true)
    ) {
      setIsInstalled(true);
      return;
    }

    // 2. Check 7-day cooldown from localStorage
    try {
      const dismissedTime = localStorage.getItem(DISMISS_KEY);
      if (dismissedTime) {
        const diffDays = (Date.now() - parseInt(dismissedTime, 10)) / (1000 * 60 * 60 * 24);
        if (diffDays < DISMISS_COOLDOWN_DAYS) {
          return; // Still in 7-day cooldown
        }
      }
    } catch {
      // Storage access safety
    }

    // 3. Capture beforeinstallprompt event
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // 4. Production-grade Engagement Delay: Wait 5 seconds so user browses the school first
    const timer = setTimeout(() => {
      setShowBanner(true);
    }, 5000);

    const appInstalledHandler = () => {
      setIsInstalled(true);
      setShowBanner(false);
      setIsInstalling(false);
      setDeferredPrompt(null);
      toast.success('SGM & SSSD App installed successfully!', 'App Installed');
    };

    window.addEventListener('appinstalled', appInstalledHandler);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', appInstalledHandler);
    };
  }, [toast]);

  const handleInstall = async () => {
    if (deferredPrompt) {
      setIsInstalling(true);
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice && choice.outcome === 'accepted') {
          setShowBanner(false);
        }
      } catch (err) {
        console.warn('Install error:', err);
      } finally {
        setIsInstalling(false);
        setDeferredPrompt(null);
      }
    } else {
      // Fallback guide for iOS Safari & unsupported browsers
      toast.info('Tap your browser share button (⎋) or menu (⋮) and tap "Add to Home Screen".', 'Install Guide');
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    try {
      localStorage.setItem(DISMISS_KEY, Date.now().toString());
    } catch {
      // Ignore
    }
  };

  if (!mounted || !showBanner || isInstalled) return null;

  return (
    <div className="fixed bottom-3 right-3 left-3 sm:left-auto sm:right-6 sm:bottom-6 z-50 animate-in slide-in-from-bottom-3 duration-300 pointer-events-auto">
      <div className="flex items-center justify-between gap-3 bg-slate-950/95 text-white border border-amber-400/50 rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 shadow-2xl backdrop-blur-xl max-w-sm sm:max-w-md w-full font-sans">
        {/* School Logo & Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl overflow-hidden border border-amber-400/80 bg-white p-0.5 shadow-md flex-shrink-0 flex items-center justify-center">
            <img src="/logo.png" alt="SGM Logo" className="w-full h-full object-contain" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-black text-white truncate leading-tight font-serif">SGM &amp; SSSD App</h4>
              <span className="text-[9px] bg-amber-400/20 text-amber-300 font-extrabold px-1.5 py-0.5 rounded border border-amber-400/30 flex-shrink-0 leading-none">
                FREE
              </span>
            </div>
            <p className="text-[10px] text-slate-300 truncate">1-Tap Fast &bull; Offline Ready</p>
          </div>
        </div>

        {/* Compact Install & Close Buttons */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={handleInstall}
            disabled={isInstalling}
            className="py-1.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-black text-xs shadow-md flex items-center gap-1.5 transition disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5 text-amber-300" />
            <span>{isInstalling ? 'Installing...' : 'Install'}</span>
          </button>
          <button
            onClick={handleDismiss}
            aria-label="Close"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
