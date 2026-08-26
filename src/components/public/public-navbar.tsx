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
  Languages,
  Download,
  Smartphone,
  ShieldCheck,
  Share,
  PlusSquare,
  CheckCircle2,
} from 'lucide-react';
import { useToast } from '../ui/toast';

export const PublicNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // PWA State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPwaBanner, setShowPwaBanner] = useState(true);
  const [showPwaGuideModal, setShowPwaGuideModal] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
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

  // PWA Initialization & Listeners
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Register Service Worker
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
      }

      // Check Standalone mode
      if (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true
      ) {
        setIsInstalled(true);
        setShowPwaBanner(false);
      }

      // Detect iOS
      const ua = window.navigator.userAgent.toLowerCase();
      const isIosDevice = /iphone|ipad|ipod/.test(ua);
      const isSafari = /safari/.test(ua) && !/chrome|crios|fxios/.test(ua);
      setIsIos(isIosDevice && isSafari);

      const beforeInstallHandler = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setShowPwaBanner(true);
      };

      const appInstalledHandler = () => {
        setIsInstalled(true);
        setShowPwaBanner(false);
        setIsInstalling(false);
        setDeferredPrompt(null);
        toast.success('SGM & SSSD App installed successfully to your device!', 'App Installed');
      };

      window.addEventListener('beforeinstallprompt', beforeInstallHandler);
      window.addEventListener('appinstalled', appInstalledHandler);

      return () => {
        window.removeEventListener('beforeinstallprompt', beforeInstallHandler);
        window.removeEventListener('appinstalled', appInstalledHandler);
      };
    }
  }, [toast]);

  const handleInstallApp = async () => {
    if (isIos) {
      setShowPwaGuideModal(true);
      return;
    }

    if (deferredPrompt) {
      setIsInstalling(true);
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice && choice.outcome === 'accepted') {
          setShowPwaBanner(false);
          toast.success('Adding SGM & SSSD App to your device...', 'Installing');
        }
      } catch (err) {
        console.warn('Install error:', err);
      } finally {
        setIsInstalling(false);
        setDeferredPrompt(null);
      }
    } else {
      setShowPwaGuideModal(true);
    }
  };

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
    { label: 'SSSD Public School', href: '/sssd', icon: <Languages className="w-4 h-4 text-emerald-400" />, desc: '100% English medium sister campus' },
    { label: 'Downloads & Disclosures', href: '/downloads', icon: <FileDown className="w-4 h-4" />, desc: 'Mandatory certificates, syllabi & forms' },
    { label: 'Careers & Recruitment', href: '/careers', icon: <Briefcase className="w-4 h-4" />, desc: 'Faculty & staff job openings' },
    { label: 'Contact & Helpdesk', href: '/contact', icon: <Mail className="w-4 h-4" />, desc: 'Campus location & phone directory' },
  ];

  const allMobileLinks = [
    ...primaryNavLinks,
    { label: 'SSSD English Medium Wing', href: '/sssd', icon: <Languages className="w-4 h-4 text-emerald-400" /> },
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
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleInstallApp}
                  className="inline-flex items-center gap-1 text-amber-300 hover:text-white font-black text-[10px] bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/40"
                >
                  <Download className="w-3 h-3 text-amber-300" />
                  <span>App</span>
                </button>
                <Link
                  href="/admissions"
                  className="inline-flex items-center gap-1 text-sky-300 hover:text-white font-black text-[11px] bg-blue-900/60 px-2.5 py-0.5 rounded-full border border-blue-400/30"
                >
                  <span>Apply</span>
                  <ArrowRight className="w-3 h-3 text-amber-300" />
                </Link>
              </div>
            </div>

            {/* Desktop Right (Live Badge + Install App + Apply CTA) */}
            <div className="hidden sm:flex items-center gap-3 text-[11px] flex-shrink-0">
              <button
                type="button"
                onClick={handleInstallApp}
                className="inline-flex items-center gap-1 bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-400/40 font-bold transition active:scale-95"
              >
                <Download className="w-3 h-3 text-amber-300" />
                <span>📲 Install School App</span>
              </button>
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
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3 sm:gap-4 relative">
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
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {primaryNavLinks.map((link) => {
              const isActive = pathname === link.href || (link.href === '/desk' && pathname === '/principal-message');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all relative ${
                    isActive
                      ? 'text-amber-300 bg-white/10 shadow-sm border border-amber-400/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                  )}
                </Link>
              );
            })}

            {/* Dropdown "More" */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 relative ${
                  isMoreActive || moreDropdownOpen
                    ? 'text-amber-300 bg-white/10 border border-amber-400/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180 text-amber-300' : ''}`} />
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

          {/* Mobile Right Controls */}
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

      {/* Mobile Slide-Out Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300 lg:hidden animate-in fade-in"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

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
          {/* Quick PWA App Install in Mobile Menu */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              handleInstallApp();
            }}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-black bg-gradient-to-r from-amber-400/20 to-blue-600/20 border border-amber-400/50 text-amber-300 shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <Download className="w-4 h-4 text-amber-300 animate-bounce" />
              <span>📲 Install Official School App</span>
            </div>
            <span className="text-[9px] bg-amber-400 text-blue-950 font-black px-2 py-0.5 rounded-full">FREE</span>
          </button>

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

      {/* Floating PWA Install Bottom Banner */}
      {showPwaBanner && !isInstalled && (
        <aside
          aria-label="Install SGM & SSSD App"
          className="fixed bottom-3 right-3 left-3 sm:left-auto sm:right-6 sm:bottom-6 z-40 max-w-md w-full sm:w-[420px] bg-slate-950/95 text-white border-2 border-amber-400/60 rounded-3xl p-4 sm:p-5 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-bottom-5 duration-300 font-sans"
        >
          <div className="flex items-start justify-between gap-3 relative z-10">
            <div className="flex items-center gap-3">
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
              onClick={() => setShowPwaBanner(false)}
              className="text-slate-400 hover:text-white hover:bg-slate-800 p-1.5 rounded-xl transition"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

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

          <div className="mt-3.5 flex items-center gap-2">
            <button
              onClick={handleInstallApp}
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
              onClick={() => setShowPwaBanner(false)}
              className="py-2.5 px-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs border border-slate-700 transition"
            >
              Later
            </button>
          </div>
        </aside>
      )}

      {/* Interactive Step-by-Step Installation Modal */}
      {showPwaGuideModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 text-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border-2 border-amber-400/50">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-black font-serif text-amber-300">How to Install Official School App</h3>
              </div>
              <button
                onClick={() => setShowPwaGuideModal(false)}
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
              onClick={() => setShowPwaGuideModal(false)}
              className="w-full py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-lg transition"
            >
              Got It &bull; Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
