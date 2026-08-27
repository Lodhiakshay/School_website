'use client';

import React, { useState, useEffect } from 'react';
import { ExternalLink, Link2, Globe, Sparkles, CheckCircle2, ChevronDown, Phone, Mail, MessageSquare, ShieldCheck, School } from 'lucide-react';

export interface RouteOption {
  value: string;
  label: string;
  category: 'portals' | 'institution' | 'academics' | 'media' | 'actions';
  icon?: string;
  badge?: string;
}

export const SYSTEM_ROUTES: RouteOption[] = [
  // Primary Public Portals
  { value: '/admissions', label: 'Online Admissions & Status Tracker', category: 'portals', icon: '📝', badge: 'Public' },
  { value: '/login', label: 'Central ERP Portal Login (All Roles)', category: 'portals', icon: '🔐', badge: 'ERP' },
  { value: '/contact', label: 'Contact Us & Campus Location Map', category: 'portals', icon: '📞', badge: 'Public' },

  // Institutional Pages
  { value: '/desk', label: 'Principal & Leadership Welcome Desk', category: 'institution', icon: '👨‍💼', badge: 'Leadership' },
  { value: '/about', label: 'School Heritage, Vision & Committee', category: 'institution', icon: '🏫', badge: 'About' },

  // Academics & Wings
  { value: '/academics', label: 'Academic Wings & Streams (Nursery-12th)', category: 'academics', icon: '🎓', badge: 'Academics' },
  { value: '/facilities', label: 'Campus Labs, Library & Infrastructure', category: 'academics', icon: '🔬', badge: 'Campus' },
  { value: '/sssd', label: 'SSSD Public School (100% English Wing)', category: 'academics', icon: '⭐', badge: 'SSSD Wing' },

  // Media & Downloads
  { value: '/gallery', label: 'Campus Photo & Video Gallery', category: 'media', icon: '🖼️', badge: 'Media' },
  { value: '/downloads', label: 'Notices, Circulars & Downloads', category: 'media', icon: '📥', badge: 'Circulars' },

  // Quick Direct Actions
  { value: 'https://wa.me/919876543210', label: 'WhatsApp Instant Admission Help Desk', category: 'actions', icon: '💬', badge: 'WhatsApp' },
  { value: 'tel:+919876543210', label: 'Direct Phone Call Helpline', category: 'actions', icon: '📲', badge: 'Phone Call' },
  { value: 'mailto:info@sarswatigyanmandir.edu.in', label: 'Official Support Email Inquiry', category: 'actions', icon: '✉️', badge: 'Email' },
];

interface LinkDestinationSelectorProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
  className?: string;
}

export function LinkDestinationSelector({
  label = 'Target Destination Link / URL',
  value,
  onChange,
  helperText,
  className = '',
}: LinkDestinationSelectorProps) {
  const matchedRoute = SYSTEM_ROUTES.find((r) => r.value === value);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(!matchedRoute && Boolean(value));
  const [customUrl, setCustomUrl] = useState<string>(!matchedRoute ? value || '' : '');

  useEffect(() => {
    const isMatched = SYSTEM_ROUTES.some((r) => r.value === value);
    if (!isMatched && value) {
      setIsCustomMode(true);
      setCustomUrl(value);
    } else if (isMatched) {
      setIsCustomMode(false);
    }
  }, [value]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    if (selected === '__CUSTOM__') {
      setIsCustomMode(true);
      if (!customUrl) {
        setCustomUrl('https://');
        onChange('https://');
      } else {
        onChange(customUrl);
      }
    } else {
      setIsCustomMode(false);
      onChange(selected);
    }
  };

  const handleCustomUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setCustomUrl(url);
    onChange(url);
  };

  const isExternal = value?.startsWith('http://') || value?.startsWith('https://');
  const isSpecial = value?.startsWith('tel:') || value?.startsWith('mailto:') || value?.startsWith('https://wa.me');

  return (
    <div className={`space-y-1.5 text-xs ${className}`}>
      {/* Header Label and Live Link Tester */}
      <div className="flex items-center justify-between">
        <label className="font-bold text-slate-700 flex items-center gap-1.5 tracking-wide">
          <Link2 className="w-3.5 h-3.5 text-blue-600" />
          <span>{label}</span>
        </label>
        {value && (
          <div className="flex items-center gap-2">
            <span
              className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                isSpecial
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : isExternal
                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}
            >
              {isSpecial ? 'Action Link' : isExternal ? 'External URL' : 'Internal Page'}
            </span>
            <a
              href={value}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 hover:underline transition"
              title="Test destination link in new browser tab"
            >
              <span>Test Link</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>

      {/* Modern Production-Grade Select Dropdown */}
      <div className="space-y-2">
        <div className="relative">
          <select
            value={isCustomMode ? '__CUSTOM__' : value || '/admissions'}
            onChange={handleSelectChange}
            className="w-full pl-3.5 pr-9 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm appearance-none cursor-pointer transition hover:border-slate-400"
          >
            <optgroup label="🌟 Core Public Portals">
              {SYSTEM_ROUTES.filter((r) => r.category === 'portals').map((r) => (
                <option key={r.value} value={r.value}>
                  {r.icon} {r.label} ({r.value})
                </option>
              ))}
            </optgroup>

            <optgroup label="🏫 Institutional & Leadership Pages">
              {SYSTEM_ROUTES.filter((r) => r.category === 'institution').map((r) => (
                <option key={r.value} value={r.value}>
                  {r.icon} {r.label} ({r.value})
                </option>
              ))}
            </optgroup>

            <optgroup label="🎓 Academics, Wings & Facilities">
              {SYSTEM_ROUTES.filter((r) => r.category === 'academics').map((r) => (
                <option key={r.value} value={r.value}>
                  {r.icon} {r.label} ({r.value})
                </option>
              ))}
            </optgroup>

            <optgroup label="📁 Media, Notices & Downloads">
              {SYSTEM_ROUTES.filter((r) => r.category === 'media').map((r) => (
                <option key={r.value} value={r.value}>
                  {r.icon} {r.label} ({r.value})
                </option>
              ))}
            </optgroup>

            <optgroup label="⚡ Quick Direct Actions">
              {SYSTEM_ROUTES.filter((r) => r.category === 'actions').map((r) => (
                <option key={r.value} value={r.value}>
                  {r.icon} {r.label} ({r.badge})
                </option>
              ))}
            </optgroup>

            <optgroup label="🌐 Custom URL Entry">
              <option value="__CUSTOM__">🔗 Custom External Link or Subpath (Custom URL)...</option>
            </optgroup>
          </select>

          {/* Custom Chevron Indicator */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* Custom URL Expandable Drawer */}
        {isCustomMode && (
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-50/90 to-indigo-50/70 border border-blue-200/90 space-y-2 animate-in fade-in zoom-in-95 duration-150 shadow-sm">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-extrabold text-blue-950 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span>Custom Target Destination URL</span>
              </span>
              <span className="text-[10px] text-blue-700 font-mono">Accepts https://, /path, tel:, or mailto:</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customUrl}
                onChange={handleCustomUrlChange}
                placeholder="https://example.com/portal or /custom-page"
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-inner"
              />
            </div>
          </div>
        )}
      </div>

      {helperText && <p className="text-[10px] text-slate-400 font-medium">{helperText}</p>}
    </div>
  );
}
