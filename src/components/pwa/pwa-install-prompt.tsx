'use client';

import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export const PwaInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already in standalone PWA mode
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true)
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
    <aside
      aria-label="Install SGM App"
      className="fixed bottom-3 right-3 left-3 sm:left-auto sm:right-6 z-50 max-w-sm bg-slate-950/95 text-white border border-amber-400/40 rounded-2xl p-3 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-amber-400 bg-white p-1 shadow-md flex-shrink-0 flex items-center justify-center">
          <img
            src="/icon-192.png"
            alt="SGM Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-black text-amber-300 truncate font-serif">
            Install SGM Mobile App
          </h4>
          <p className="text-[10px] text-slate-300 truncate">
            Fast offline access &amp; instant notifications
          </p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={handleInstall}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] shadow-md shadow-blue-600/30 flex items-center gap-1 transition"
          >
            <Download className="w-3 h-3" />
            <span>Install</span>
          </button>
          <button
            onClick={() => setShowPrompt(false)}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition"
            aria-label="Dismiss install banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
