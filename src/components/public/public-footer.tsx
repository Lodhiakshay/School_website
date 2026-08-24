import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ShieldCheck, BookOpen } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500/50 bg-white shadow-lg flex-shrink-0">
              <img src="/logo.png" alt="SGM Logo" className="w-full h-full object-contain p-0.5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white tracking-tight uppercase font-serif">सरस्वती ज्ञान मन्दिर</h3>
              <p className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">Shamsabad, Farrukhabad</p>
            </div>
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Established with a commitment to nurturing intellectual brilliance, moral values, and cultural pride in Shamsabad, Farrukhabad, Uttar Pradesh.
          </p>
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px]">Affiliation Code: UP-FBD-2026-SGM-089</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Quick Links
          </h4>
          <ul className="space-y-2.5">
            <li><Link href="/about" className="hover:text-amber-400 transition">About Our Heritage</Link></li>
            <li><Link href="/principal-message" className="hover:text-amber-400 transition">Principal Message</Link></li>
            <li><Link href="/academics" className="hover:text-amber-400 transition">Academic Curriculum</Link></li>
            <li><Link href="/faculty" className="hover:text-amber-400 transition">Our Faculty &amp; Staff</Link></li>
            <li><Link href="/facilities" className="hover:text-amber-400 transition">Campus Facilities</Link></li>
            <li><Link href="/admissions" className="hover:text-amber-400 transition">Admissions 2026-27</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            ERP &amp; Legal
          </h4>
          <ul className="space-y-2.5">
            <li><Link href="/login" className="text-amber-400 hover:underline font-semibold flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> Central ERP Login</Link></li>
            <li><Link href="/news" className="hover:text-amber-400 transition">Latest Circulars</Link></li>
            <li><Link href="/gallery" className="hover:text-amber-400 transition">Photo Gallery</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-amber-400 transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-amber-400 transition">Terms &amp; Regulations</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Contact Institution
          </h4>
          <div className="space-y-3">
            <p className="flex items-start gap-2.5 text-slate-300">
              <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>Main Road, Near Bus Stand, Shamsabad, Farrukhabad, Uttar Pradesh, PIN: 209503</span>
            </p>
            <p className="flex items-center gap-2.5 text-slate-300">
              <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>+91 9451234567</span>
            </p>
            <p className="flex items-center gap-2.5 text-slate-300">
              <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span>info@sarswatigyanmandir.edu.in</span>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-900 bg-slate-950 py-5 px-4 text-center text-[11px] text-slate-500">
        © 2026 Saraswati Gyan Mandir Intermediate College, Shamsabad, Farrukhabad (UP). All Rights Reserved.
      </div>
    </footer>
  );
};
