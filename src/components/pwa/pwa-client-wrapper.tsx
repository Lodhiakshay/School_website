'use client';

import React, { useState, useEffect } from 'react';
import { Download, X, Sparkles, Smartphone, ShieldCheck, Share, PlusSquare, CheckCircle2 } from 'lucide-react';
import { useToast } from '../ui/toast';

export function PwaClientWrapper() {
  const [mounted, setMounted] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(true); // Always show by default
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    setShowPrompt(true);

    // Register Service Worker safely on browser load
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('✅ SGM PWA ServiceWorker active:', reg.scope);
        })
        .catch((err) => {
          console.warn('PWA ServiceWorker notice:', err);
        });
    }

    // Check if already in standalone PWA mode
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true)
    ) {
      setIsInstalled(true);
      setShowPrompt(false);
      return;
    }

    // Detect iOS Safari
    if (typeof window !== 'undefined') {
      const ua = window.navigator.userAgent.toLowerCase();
      const isIosDevice = /iphone|ipad|ipod/.test(ua);
      const isSafari = /safari/.test(ua) && !/chrome|crios|fxios/.test(ua);
      setIsIos(isIosDevice && isSafari);
    }

    // Listen for browser install prompt
    const beforeInstallHandler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', beforeInstallHandler);

    // Listen for custom trigger from any button in navbar/footer
    const openHandler = () => {
      setShowPrompt(true);
      setShowGuideModal(true);
    };
    window.addEventListener('open-pwa-install', openHandler);

    const appInstalledHandler = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setIsInstalling(false);
      setDeferredPrompt(null);
      toast.success('SGM & SSSD App installed successfully to your device!', 'App Installed');
    };

    window.addEventListener('appinstalled', appInstalledHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallHandler);
      window.removeEventListener('open-pwa-install', openHandler);
      window.removeEventListener('appinstalled', appInstalledHandler);
    };
  }, [toast]);

  const handleInstall = async () => {
    if (isIos) {
      setShowGuideModal(true);
      return;
    }

    if (deferredPrompt) {
      setIsInstalling(true);
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice && choice.outcome === 'accepted') {
          setShowPrompt(false);
          toast.success('Adding SGM & SSSD App to your device...', 'Installing');
        }
      } catch (err) {
        console.warn('Install error:', err);
      } finally {
        setIsInstalling(false);
        setDeferredPrompt(null);
      }
    } else {
      setShowGuideModal(true);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!mounted || isInstalled) {
    return null;
  }

  return (
    <>
      {/* Floating Bottom Drawer / Card */}
      {showPrompt && (
        <aside
          aria-label="Install SGM & SSSD App"
          className="fixed bottom-3 right-3 left-3 sm:left-auto sm:right-6 sm:bottom-6 z-[9999] max-w-md w-full sm:w-[420px] bg-slate-950/95 text-white border-2 border-amber-400/60 rounded-3xl p-4 sm:p-5 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-bottom-5 duration-300 font-sans"
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
      )}

      {/* Interactive Step-by-Step Installation Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 text-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border-2 border-amber-400/50">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-black font-serif text-amber-300">How to Install Official School App</h3>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-200">
              {isIos ? (
                <div className="p-3 bg-blue-950/60 rounded-2xl border border-blue-400/30 space-y-2">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <Share className="w-4 h-4" /> iPhone / iPad (Safari):
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-slate-300">
                    <li>Tap the <strong>Share</strong> button (⎋) at the bottom of Safari.</li>
                    <li>Scroll down and select <strong>Add to Home Screen</strong> (<PlusSquare className="w-3.5 h-3.5 inline text-amber-400" />).</li>
                    <li>Tap <strong>Add</strong> at top-right. App is installed!</li>
                  </ol>
                </div>
              ) : (
                <div className="p-3 bg-blue-950/60 rounded-2xl border border-blue-400/30 space-y-2">
                  <div className="font-bold text-amber-300 flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4" /> Android &amp; Desktop (Chrome / Edge):
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-slate-300">
                    <li>Tap the browser menu <strong>(⋮)</strong> in top or bottom corner.</li>
                    <li>Select <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.</li>
                    <li>Confirm <strong>Install</strong>. Icon will appear on your Home Screen!</li>
                  </ol>
                </div>
              )}

              <div className="p-3 bg-emerald-950/50 rounded-2xl border border-emerald-500/30 flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-[11px] text-emerald-200 font-medium">
                  Instant offline access, faster loading, and notifications enabled!
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowGuideModal(false)}
              className="w-full py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-lg transition"
            >
              Got It &bull; Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
