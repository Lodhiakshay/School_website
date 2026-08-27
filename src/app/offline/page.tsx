'use client';

import React from 'react';
import { WifiOff, RefreshCw, Phone } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-slate-900 border-2 border-blue-900 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-amber-400 bg-white p-1 shadow-lg">
          <img src="/logo.png" alt="SGM Logo" className="w-full h-full object-contain" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold">
            <WifiOff className="w-4 h-4" />
            <span>You Are Offline</span>
          </div>
          <h1 className="text-xl font-black text-white font-serif">
            सरस्वती ज्ञान मन्दिर
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            It looks like your internet connection is unavailable. Cached content is still accessible in the SGM Progressive Web App.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Button
            onClick={() => window.location.reload()}
            variant="primary"
            className="w-full bg-blue-700 hover:bg-blue-800 font-bold"
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Retry Connection
          </Button>
          <a
            href="tel:+919876543210"
            className="inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-xs font-bold text-slate-300 hover:text-white"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Call School Helpline: +91 9876543210</span>
          </a>
        </div>
      </div>
    </div>
  );
}

