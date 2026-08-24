import React from 'react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNavbar />
      <section className="py-16 max-w-5xl mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Contact Institution</h1>
        <p className="text-xs sm:text-sm text-slate-600">Main Road, Near Bus Stand, Shamsabad, Farrukhabad, UP (209503). Phone: +91 9451234567.</p>
      </section>
      <PublicFooter />
    </div>
  );
}
