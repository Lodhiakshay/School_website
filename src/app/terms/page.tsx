import React from 'react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNavbar />
      <section className="py-16 max-w-4xl mx-auto px-4 space-y-4">
        <h1 className="text-2xl font-bold">Terms &amp; Regulations</h1>
        <p className="text-xs text-slate-600">Code of conduct and academic regulations for session 2026-2027.</p>
      </section>
      <PublicFooter />
    </div>
  );
}
