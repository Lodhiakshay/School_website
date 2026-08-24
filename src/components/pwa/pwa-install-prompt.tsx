'use client';

import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

export const PwaInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already in standalone PWA mode
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    ) {
      setIsInstalled(true);
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
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  if (!showPrompt || isInstalled) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-50 max-w-sm bg-slate-900/95 text-white border-2 border-blue-600 rounded-3xl p-4 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl overflow-hidden border border-amber-400 bg-white p-0.5 shadow-md flex-shrink-0">
          <img src="/logo.png" alt="SGM Logo" className="w-full h-full object-contain" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-black text-white truncate font-serif">
            Install SGM School App
          </h4>
          <p className="text-[11px] text-slate-300 truncate">
            Fast offline access &amp; instant notifications
          </p>
        </div>
        <button
          onClick={() => setShowPrompt(false)}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg"
          aria-label="Dismiss install banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <Button
          size="sm"
          variant="primary"
          onClick={handleInstall}
          className="w-full bg-blue-600 hover:bg-blue-700 font-bold text-xs shadow-md shadow-blue-600/30"
          leftIcon={<Download className="w-3.5 h-3.5" />}
        >
          Install App On Device
        </Button>
      </div>
    </div>
  );
};
