'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Phone,
  MapPin,
  Menu,
  X,
  LogIn,
  Send,
  Sparkles,
  Home,
  Info,
  BookOpen,
  Users,
  Building2,
  Image as ImageIcon,
  Calendar,
  Mail,
  UserCheck,
  Briefcase,
  FileDown,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

export const PublicNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const primaryNavLinks = [
    { label: 'Home', href: '/', icon: <Home className="w-4 h-4" /> },
    { label: 'About', href: '/about', icon: <Info className="w-4 h-4" /> },
    { label: 'Desk', href: '/desk', icon: <UserCheck className="w-4 h-4" /> },
    { label: 'Academics', href: '/academics', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'Faculty', href: '/faculty', icon: <Users className="w-4 h-4" /> },
    { label: 'Facilities', href: '/facilities', icon: <Building2 className="w-4 h-4" /> },
    { label: 'Gallery', href: '/gallery', icon: <ImageIcon className="w-4 h-4" /> },
    { label: 'Events', href: '/events', icon: <Calendar className="w-4 h-4" /> },
  ];

  const moreNavLinks = [
    { label: 'Downloads & Disclosures', href: '/downloads', icon: <FileDown className="w-4 h-4" />, desc: 'Mandatory certificates, syllabi & forms' },
    { label: 'Careers & Recruitment', href: '/careers', icon: <Briefcase className="w-4 h-4" />, desc: 'Faculty & staff job openings' },
    { label: 'Contact & Helpdesk', href: '/contact', icon: <Mail className="w-4 h-4" />, desc: 'Campus location & phone directory' },
  ];

  const allMobileLinks = [
    ...primaryNavLinks,
    { label: 'Downloads', href: '/downloads', icon: <FileDown className="w-4 h-4" /> },
    { label: 'Careers', href: '/careers', icon: <Briefcase className="w-4 h-4" /> },
    { label: 'Contact', href: '/contact', icon: <Mail className="w-4 h-4" /> },
  ];

  const isMoreActive = moreNavLinks.some((l) => pathname === l.href);

  return (
    <>
      <header
        className={`w-full sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-slate-950/95 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-slate-950/50'
            : 'bg-slate-950 border-b border-slate-800/80 shadow-md'
        }`}
      >
        {/* Sleek Top Notification & Contact Strip */}
        <div className="bg-gradient-to-r from-[#000f28] via-[#001c44] to-[#000f28] text-slate-300 py-1.5 px-3 sm:px-6 text-xs border-b border-white/10 shadow-inner overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            {/* Desktop Left (Clickable Location & Phone) */}
            <div className="hidden sm:flex items-center gap-4 text-[11px] font-medium min-w-0">
              <a
                href="https://maps.google.com/?q=Shamsabad+Farrukhabad+Uttar+Pradesh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-300 hover:text-amber-300 transition truncate"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span className="truncate">Main Road, Shamsabad, Farrukhabad (209503)</span>
              </a>
              <a
                href="tel:+919451234567"
                className="hidden md:flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 font-mono transition flex-shrink-0"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>+91 9451234567</span>
              </a>
            </div>

            {/* Mobile Single-Line Compact View */}
            <div className="flex sm:hidden items-center justify-between w-full text-[11px] font-bold">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-amber-300 font-serif">Admissions 2026-27</span>
              </div>
              <Link
                href="/admissions"
                className="inline-flex items-center gap-1 text-sky-300 hover:text-white font-black text-[11px] bg-blue-900/60 px-2.5 py-0.5 rounded-full border border-blue-400/30"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-3 h-3 text-amber-300" />
              </Link>
            </div>

            {/* Desktop Right (Live Badge + Apply CTA) */}
            <div className="hidden sm:flex items-center gap-3 text-[11px] flex-shrink-0">
              <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-3 py-0.5 rounded-full border border-amber-500/40 font-extrabold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> Admissions Open 2026-2027
              </span>
              <Link
                href="/admissions"
                className="inline-flex items-center gap-1 text-sky-300 hover:text-white font-extrabold hover:underline whitespace-nowrap"
              >
                <span>Apply Online</span>
                <ArrowRight className="w-3 h-3 text-amber-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3 sm:gap-4 overflow-hidden">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0 flex-1">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-amber-400 bg-white p-0.5 flex-shrink-0 shadow-md group-hover:scale-105 transition-all">
              <img
                src="/logo.png"
                alt="सरस्वती ज्ञान मन्दिर"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <h1 className="text-xs sm:text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-100 tracking-tight leading-tight uppercase font-serif truncate">
                सरस्वती ज्ञान मन्दिर
              </h1>
              <p className="text-[9px] sm:text-[10px] text-amber-300 font-extrabold tracking-wider uppercase truncate">
                SHAMSABAD &bull; FARRUKHABAD
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-4 flex-shrink-0">
            {primaryNavLinks.map((link) => {
              const isActive = pathname === link.href || (link.href === '/desk' && pathname === '/principal-message');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-bold tracking-wide whitespace-nowrap transition-colors py-1 ${
                    isActive
                      ? 'text-amber-300 font-black border-b-2 border-amber-400'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* "More" Dropdown Menu for Downloads, Careers & Contact */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                onMouseEnter={() => setMoreDropdownOpen(true)}
                className={`inline-flex items-center gap-1 text-xs font-bold tracking-wide whitespace-nowrap transition-colors py-1 ${
                  isMoreActive
                    ? 'text-amber-300 font-black border-b-2 border-amber-400'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreDropdownOpen ? 'rotate-180 text-amber-400' : ''}`} />
              </button>

              {moreDropdownOpen && (
                <div
                  onMouseLeave={() => setMoreDropdownOpen(false)}
                  className="absolute right-0 top-full mt-2 w-64 bg-slate-900/95 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1"
                >
                  {moreNavLinks.map((sub) => {
                    const isSubActive = pathname === sub.href;
                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setMoreDropdownOpen(false)}
                        className={`flex items-start gap-3 p-2.5 rounded-xl transition ${
                          isSubActive
                            ? 'bg-blue-600/30 text-amber-300 border border-blue-500/30'
                            : 'text-slate-300 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <span className={`mt-0.5 ${isSubActive ? 'text-amber-400' : 'text-blue-400'}`}>
                          {sub.icon}
                        </span>
                        <div className="space-y-0.5">
                          <div className="font-bold text-xs leading-tight">{sub.label}</div>
                          <div className="text-[10px] text-slate-400 font-normal leading-tight">{sub.desc}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition shadow-sm whitespace-nowrap"
            >
              <LogIn className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
              <span>ERP Portal</span>
            </Link>
            <Link
              href="/admissions"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition shadow-md shadow-blue-600/30 whitespace-nowrap"
            >
              <Send className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
              <span>Online Admission</span>
            </Link>
          </div>

          {/* Mobile Right Controls: Premium Golden Hamburger */}
          <div className="flex items-center lg:hidden flex-shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/20 via-blue-600/20 to-indigo-700/30 hover:from-amber-400/30 hover:to-blue-600/40 text-amber-300 border border-amber-400/40 transition-all flex items-center justify-center active:scale-90 shadow-md flex-shrink-0"
            >
              <Menu className="w-5 h-5 text-amber-300" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300 lg:hidden animate-in fade-in"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide-Out Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-slate-950/95 backdrop-blur-2xl border-l border-white/10 text-white z-50 shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-400 bg-white p-0.5 shadow-md flex-shrink-0">
              <img src="/logo.png" alt="SGM Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-100 font-serif leading-tight">
                सरस्वती ज्ञान मन्दिर
              </h2>
              <p className="text-[9px] text-sky-300 font-bold uppercase">Shamsabad, Farrukhabad</p>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Menu"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Nav Links */}
        <div className="p-4 space-y-1.5 overflow-y-auto flex-1">
          {allMobileLinks.map((link) => {
            const isActive = pathname === link.href || (link.href === '/desk' && pathname === '/principal-message');
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all ${
                  isActive
                    ? 'bg-blue-600/30 text-amber-300 border border-blue-500/40 shadow-sm'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-amber-400' : 'text-blue-400'}>{link.icon}</span>
                  <span>{link.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </Link>
            );
          })}
        </div>

        {/* Drawer Action Buttons & Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-900/80 space-y-2.5">
          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-black text-white border border-white/20 bg-white/10 hover:bg-white/20 transition shadow-sm"
          >
            <LogIn className="w-4 h-4 text-blue-400" />
            <span>ERP Portal Login</span>
          </Link>
          <Link
            href="/admissions"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-black text-white bg-blue-600 hover:bg-blue-700 transition shadow-md shadow-blue-600/30"
          >
            <Send className="w-4 h-4 text-amber-300" />
            <span>Submit Admission Inquiry</span>
          </Link>

          <div className="pt-2 text-[10px] text-slate-400 space-y-1 text-center font-medium">
            <p className="flex items-center justify-center gap-1 text-slate-300 font-bold">
              <Phone className="w-3 h-3 text-emerald-400" /> Helpline: +91 9451234567
            </p>
            <p>Main Road, Shamsabad (Farrukhabad) &bull; PIN: 209503</p>
          </div>
        </div>
      </div>
    </>
  );
};
