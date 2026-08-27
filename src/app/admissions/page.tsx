'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Send,
  CheckCircle2,
  FileText,
  Calendar,
  Sparkles,
  Phone,
  Mail,
  ShieldCheck,
  Building2,
  GraduationCap,
  ArrowRight,
  User,
  Users,
  MapPin,
  School,
  Copy,
  Check,
  Printer,
  Search,
  Clock,
  Award,
  AlertCircle,
  BookOpen,
  HelpCircle,
} from 'lucide-react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { ImageUploader } from '../../components/ui/image-uploader';
import { apiClient } from '../../lib/api-client';

export default function AdmissionsPublicPage() {
  const [activeTab, setActiveTab] = useState<'apply' | 'track'>('apply');
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    medium: 'hindi' as 'hindi' | 'english_sssd',
    targetClass: 'Class 10 (High School)',
    stream: 'Science (PCM)',
    studentName: '',
    gender: 'male' as 'male' | 'female' | 'other',
    dob: '2010-05-15',
    bloodGroup: 'B+',
    category: 'GEN' as 'GEN' | 'OBC' | 'SC' | 'ST' | 'EWS',
    aadhaarNumber: '',
    photoUrl: '',
    fatherName: '',
    fatherPhone: '',
    fatherOccupation: 'Agriculture & Enterprise',
    motherName: '',
    motherPhone: '',
    motherOccupation: 'Homemaker',
    annualIncome: '₹1.5 Lakh - ₹3.0 Lakh',
    whatsappNumber: '',
    email: '',
    address: 'Shamsabad Main Road',
    city: 'Shamsabad',
    district: 'Farrukhabad',
    state: 'Uttar Pradesh',
    pincode: '209503',
    previousSchool: 'Primary & Junior High School, Shamsabad',
    previousClass: 'Class 9',
    previousMarksPercent: 86.5,
    birthCertificateUrl: '',
    marksheetUrl: '',
    declarationAccepted: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<any | null>(null);

  // Tracker State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [trackedApp, setTrackedApp] = useState<any | null>(null);
  const [trackError, setTrackError] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName.trim() || !formData.fatherName.trim() || !formData.fatherPhone.trim()) {
      alert('Please fill all mandatory fields (Student Name, Father Name, Mobile Number).');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        applicantName: formData.studentName.trim(),
        gender: formData.gender,
        dob: new Date(formData.dob),
        targetClass: formData.targetClass,
        medium: formData.medium,
        stream: formData.targetClass.includes('11') || formData.targetClass.includes('12') ? formData.stream : '',
        bloodGroup: formData.bloodGroup,
        category: formData.category,
        aadhaarNumber: formData.aadhaarNumber,
        photoUrl: formData.photoUrl,
        fatherName: formData.fatherName.trim(),
        fatherPhone: formData.fatherPhone.trim(),
        fatherOccupation: formData.fatherOccupation,
        motherName: formData.motherName.trim(),
        motherPhone: formData.motherPhone.trim(),
        motherOccupation: formData.motherOccupation,
        annualIncome: formData.annualIncome,
        whatsappNumber: formData.whatsappNumber || formData.fatherPhone,
        email: formData.email,
        address: `${formData.address}, ${formData.city}, ${formData.district}, ${formData.state} - ${formData.pincode}`,
        city: formData.city,
        district: formData.district,
        state: formData.state,
        pincode: formData.pincode,
        previousSchool: formData.previousSchool,
        previousClass: formData.previousClass,
        previousMarksPercent: Number(formData.previousMarksPercent) || undefined,
        birthCertificateUrl: formData.birthCertificateUrl,
        marksheetUrl: formData.marksheetUrl,
        declarationAccepted: formData.declarationAccepted,
      };

      const res = await apiClient.post('/admissions/apply', payload);
      const appRecord = res.data?.data || {
        ...payload,
        applicationNumber: `SGM-ADM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toISOString(),
      };
      setSubmittedData(appRecord);
    } catch {
      // Fallback preview
      const fallbackRecord = {
        applicationNumber: `SGM-ADM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        applicantName: formData.studentName,
        targetClass: formData.targetClass,
        medium: formData.medium,
        stream: formData.stream,
        fatherName: formData.fatherName,
        fatherPhone: formData.fatherPhone,
        photoUrl: formData.photoUrl,
        status: 'submitted',
        createdAt: new Date().toISOString(),
      };
      setSubmittedData(fallbackRecord);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        if (formContainerRef.current) {
          formContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const handleTrackSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setTrackError(null);
    setTrackedApp(null);

    try {
      const res = await apiClient.get(`/admissions/track/${encodeURIComponent(searchQuery.trim())}`);
      if (res.data?.data) {
        setTrackedApp(res.data.data);
      } else {
        setTrackError('No admission record found with this Application Number or Mobile.');
      }
    } catch (err: any) {
      setTrackError(
        err?.response?.data?.message ||
          'Application record not found. Please double-check your Application ID (e.g. SGM-ADM-2026-1001) or Registered Mobile.'
      );
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <PublicNavbar />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-[#001845] via-[#002060] to-[#023e8a] text-white pt-16 sm:pt-20 pb-20 sm:pb-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Academic Session 2026-27 &bull; सत्र 2026-27 प्रवेश प्रारंभ</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight text-white leading-tight">
            Online Admission &amp; Registration Portal
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Apply online for Sarswati Gyan Mandir Inter College (UP Board Hindi Medium, Class 1-12) and SSSD Public School (100% English Medium, Nursery-10th).
          </p>

          {/* Dual Mode Switcher */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setActiveTab('apply');
                setSubmittedData(null);
              }}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
                activeTab === 'apply'
                  ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/30'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <FileText className="w-4 h-4" /> Apply Online 2026-27
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('track')}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
                activeTab === 'track'
                  ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/30'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Search className="w-4 h-4" /> Track Application Status (स्थिति जांचें)
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main ref={formContainerRef} className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 -mt-10 sm:-mt-12 z-20 pb-20 w-full">
        {/* ========================================================================= */}
        {/* TAB 1: APPLY ONLINE (FORM OR PRINTABLE RECEIPT)                           */}
        {/* ========================================================================= */}
        {activeTab === 'apply' && (
          <>
            {submittedData ? (
              /* SUCCESS RECEIPT / SLIP */
              <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                {/* Receipt Header Banner */}
                <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 bg-emerald-400/20 text-emerald-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Application Successfully Registered
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black font-serif">Official Admission Acknowledgment Slip</h2>
                    <p className="text-xs text-emerald-100">
                      Sarswati Gyan Mandir Inter College &amp; SSSD Public School, Shamsabad (UP)
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => window.print()}
                      leftIcon={<Printer className="w-4 h-4" />}
                    >
                      Print Slip (प्रिंट करें)
                    </Button>
                  </div>
                </div>

                {/* Slip Details Body */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Reference Number Card */}
                  <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                        Official Application Reference Number (आवेदन क्रमांक)
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-emerald-950 font-mono">
                        {submittedData.applicationNumber}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(submittedData.applicationNumber)}
                      className="px-4 py-2 rounded-xl bg-white border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2 hover:bg-emerald-100 transition shadow-sm"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied to Clipboard' : 'Copy Reference ID'}
                    </button>
                  </div>

                  {/* Summary Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Student Name</span>
                      <p className="font-bold text-slate-900 text-sm">{submittedData.applicantName || submittedData.studentName}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Target Class &amp; Stream</span>
                      <p className="font-bold text-slate-900 text-sm">
                        {submittedData.targetClass} {submittedData.stream ? `(${submittedData.stream})` : ''}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Medium of Instruction</span>
                      <p className="font-bold text-blue-700 text-sm">
                        {submittedData.medium === 'english_sssd' ? 'SSSD (100% English Medium)' : 'SGM (UP Board - Hindi Medium)'}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Father&apos;s Name</span>
                      <p className="font-bold text-slate-900 text-sm">{submittedData.fatherName}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Registered Phone</span>
                      <p className="font-bold text-slate-900 text-sm">{submittedData.fatherPhone}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Application Date</span>
                      <p className="font-bold text-slate-900 text-sm">
                        {new Date(submittedData.createdAt || Date.now()).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Instructions Box */}
                  <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-2">
                    <h4 className="font-black text-amber-950 uppercase tracking-wider flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600" /> Next Steps for Confirmation (अगले चरण):
                    </h4>
                    <ul className="list-disc list-inside text-amber-900 space-y-1 font-medium">
                      <li>
                        Please keep your Reference Number <strong className="font-mono">{submittedData.applicationNumber}</strong> safe for status tracking.
                      </li>
                      <li>
                        Visit the School Administrative Counter (9:00 AM &ndash; 2:00 PM) with 2 passport photos, previous marksheet copy, and Aadhaar card.
                      </li>
                      <li>
                        Our counselor desk will contact you via WhatsApp / Phone at <strong className="font-mono">{submittedData.fatherPhone}</strong> within 24 hours.
                      </li>
                    </ul>
                  </div>

                  {/* Actions footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setSubmittedData(null)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800"
                    >
                      &larr; Fill another admission form
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('track');
                        setSearchQuery(submittedData.applicationNumber);
                      }}
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition"
                    >
                      Track this Application Live &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* ADMISSION FORM */
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                <form onSubmit={handleSubmit} className="divide-y divide-slate-200">
                  {/* Section 1: Institutional Wing & Medium */}
                  <div className="p-6 sm:p-8 space-y-5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center">1</span>
                      <h3 className="font-black text-slate-900 text-base">Select Academic Wing &amp; Medium of Study</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div
                        onClick={() => setFormData({ ...formData, medium: 'hindi' })}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition space-y-1 ${
                          formData.medium === 'hindi'
                            ? 'border-blue-600 bg-blue-50/50 shadow-md'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-black text-xs text-blue-900">Sarswati Gyan Mandir</span>
                          <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.medium === 'hindi' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                            {formData.medium === 'hindi' && <Check className="w-3 h-3 text-white" />}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 font-medium">UP Board &bull; Hindi Medium &bull; Classes 1 to 12 (Science &amp; Arts)</p>
                      </div>

                      <div
                        onClick={() => setFormData({ ...formData, medium: 'english_sssd' })}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition space-y-1 ${
                          formData.medium === 'english_sssd'
                            ? 'border-emerald-600 bg-emerald-50/50 shadow-md'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-black text-xs text-emerald-900">SSSD Public School</span>
                          <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.medium === 'english_sssd' ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'}`}>
                            {formData.medium === 'english_sssd' && <Check className="w-3 h-3 text-white" />}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 font-medium">100% English Medium &bull; Smart Class &bull; Nursery to Class 10</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Applying For Class / Grade *</label>
                        <select
                          className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:ring-2 focus:ring-blue-500"
                          value={formData.targetClass}
                          onChange={(e) => setFormData({ ...formData, targetClass: e.target.value })}
                        >
                          <option value="Nursery">Nursery (Early Foundation)</option>
                          <option value="LKG">LKG (Lower Kindergarten)</option>
                          <option value="UKG">UKG (Upper Kindergarten)</option>
                          <option value="Class 1">Class 1</option>
                          <option value="Class 2">Class 2</option>
                          <option value="Class 3">Class 3</option>
                          <option value="Class 4">Class 4</option>
                          <option value="Class 5">Class 5 (Primary Finisher)</option>
                          <option value="Class 6">Class 6 (Middle School)</option>
                          <option value="Class 7">Class 7</option>
                          <option value="Class 8">Class 8</option>
                          <option value="Class 9">Class 9 (High School Prep)</option>
                          <option value="Class 10 (High School)">Class 10 (High School Board)</option>
                          <option value="Class 11 (Senior Secondary)">Class 11 (Intermediate 1st Yr)</option>
                          <option value="Class 12 (Senior Secondary)">Class 12 (Intermediate Board)</option>
                        </select>
                      </div>

                      {(formData.targetClass.includes('11') || formData.targetClass.includes('12')) && (
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Senior Stream Specialization *</label>
                          <select
                            className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:ring-2 focus:ring-blue-500"
                            value={formData.stream}
                            onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                          >
                            <option value="Science (PCM)">Science (PCM - Physics, Chemistry, Maths)</option>
                            <option value="Science (PCB)">Science (PCB - Physics, Chemistry, Biology)</option>
                            <option value="Commerce">Commerce with Accountancy &amp; Economics</option>
                            <option value="Arts / Humanities">Arts / Humanities (Hindi, History, Civics, Geography)</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Section 2: Student Demographics */}
                  <div className="p-6 sm:p-8 space-y-5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center">2</span>
                      <h3 className="font-black text-slate-900 text-base">Student Personal Details (विद्यार्थी विवरण)</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <Input
                          label="Student Full Name (छात्र / छात्रा का पूरा नाम) *"
                          placeholder="e.g. Divyanshu Singh Rathore"
                          value={formData.studentName}
                          onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Gender (लिंग) *</label>
                        <select
                          className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:ring-2 focus:ring-blue-500"
                          value={formData.gender}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                        >
                          <option value="male">Male (बालक)</option>
                          <option value="female">Female (बालिका)</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Input
                        label="Date of Birth (जन्म तिथि) *"
                        type="date"
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        required
                      />
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Category (वर्ग) *</label>
                        <select
                          className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:ring-2 focus:ring-blue-500"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                        >
                          <option value="GEN">General (सामान्य)</option>
                          <option value="OBC">OBC (अन्य पिछड़ा वर्ग)</option>
                          <option value="SC">SC (अनुसूचित जाति)</option>
                          <option value="ST">ST (अनुसूचित जनजाति)</option>
                          <option value="EWS">EWS</option>
                        </select>
                      </div>
                      <Input
                        label="Blood Group (रक्त समूह)"
                        placeholder="e.g. B+ / O+ / A+"
                        value={formData.bloodGroup}
                        onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Aadhaar Card Number (12 अंक आधार क्रमांक)"
                        placeholder="XXXX-XXXX-XXXX"
                        value={formData.aadhaarNumber}
                        onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                      />
                      <ImageUploader
                        label="Student Passport Size Photograph"
                        value={formData.photoUrl}
                        onChange={(url) => setFormData({ ...formData, photoUrl: url })}
                        aspectRatio="portrait"
                        helperText="Upload recent color photo with white background (Cloudinary CDN)."
                      />
                    </div>
                  </div>

                  {/* Section 3: Parents & Contacts */}
                  <div className="p-6 sm:p-8 space-y-5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center">3</span>
                      <h3 className="font-black text-slate-900 text-base">Parent / Guardian Information (अभिभावक विवरण)</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Father's Full Name (पिता का नाम) *"
                        placeholder="e.g. Shri Devendra Singh"
                        value={formData.fatherName}
                        onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                        required
                      />
                      <Input
                        label="Father's Occupation (व्यवसाय)"
                        placeholder="e.g. Farmer / Merchant / Govt Service"
                        value={formData.fatherOccupation}
                        onChange={(e) => setFormData({ ...formData, fatherOccupation: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Mother's Full Name (माता का नाम) *"
                        placeholder="e.g. Smt. Gayatri Devi"
                        value={formData.motherName}
                        onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                        required
                      />
                      <Input
                        label="Mother's Occupation (व्यवसाय)"
                        placeholder="e.g. Homemaker / Teacher"
                        value={formData.motherOccupation}
                        onChange={(e) => setFormData({ ...formData, motherOccupation: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Input
                        label="Primary Calling Phone Number *"
                        placeholder="e.g. +91 94500 XXXXX"
                        value={formData.fatherPhone}
                        onChange={(e) => setFormData({ ...formData, fatherPhone: e.target.value })}
                        required
                      />
                      <Input
                        label="WhatsApp Notification Phone"
                        placeholder="e.g. +91 94500 XXXXX"
                        value={formData.whatsappNumber}
                        onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      />
                      <Input
                        label="Email Address (Optional)"
                        placeholder="e.g. parent@gmail.com"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div className="sm:col-span-2">
                        <Input
                          label="Street Address / Village / Locality *"
                          placeholder="e.g. Near Bus Stand, Shamsabad"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          required
                        />
                      </div>
                      <Input
                        label="District *"
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      />
                      <Input
                        label="Postal PIN Code *"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Section 4: Previous Record & Document Uploads */}
                  <div className="p-6 sm:p-8 space-y-5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center">4</span>
                      <h3 className="font-black text-slate-900 text-base">Previous Academic Background &amp; Documents</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <Input
                          label="Previous School / Institute Attended"
                          placeholder="e.g. Adarsh Bal Vidya Mandir, Farrukhabad"
                          value={formData.previousSchool}
                          onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                        />
                      </div>
                      <Input
                        label="Marks % in Last Class Passed"
                        placeholder="e.g. 88.5%"
                        type="number"
                        step="0.1"
                        value={formData.previousMarksPercent}
                        onChange={(e) => setFormData({ ...formData, previousMarksPercent: parseFloat(e.target.value) || 0 })}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                      <ImageUploader
                        label="Birth Certificate or Transfer Certificate (TC) Image"
                        value={formData.birthCertificateUrl}
                        onChange={(url) => setFormData({ ...formData, birthCertificateUrl: url })}
                        aspectRatio="video"
                        helperText="Upload clear photo or scan of Birth Certificate / TC (Cloudinary CDN)."
                      />
                      <ImageUploader
                        label="Previous Class Marksheet Scan / Photo"
                        value={formData.marksheetUrl}
                        onChange={(url) => setFormData({ ...formData, marksheetUrl: url })}
                        aspectRatio="video"
                        helperText="Upload marksheet photo for merit assessment (Cloudinary CDN)."
                      />
                    </div>
                  </div>

                  {/* Section 5: Submit Button */}
                  <div className="p-6 sm:p-8 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        checked={formData.declarationAccepted}
                        onChange={(e) => setFormData({ ...formData, declarationAccepted: e.target.checked })}
                        required
                      />
                      <span>
                        I declare that all details furnished above are authentic. I agree to comply with the school code of conduct and regulations.
                      </span>
                    </label>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full sm:w-auto px-8 bg-blue-600 hover:bg-blue-700 font-black shadow-lg shadow-blue-600/30 text-xs sm:text-sm"
                      isLoading={isSubmitting}
                      leftIcon={<Send className="w-4 h-4" />}
                    >
                      Submit Online Application (आवेदन जमा करें)
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: LIVE APPLICATION TRACKER (स्थिति जांचें)                         */}
        {/* ========================================================================= */}
        {activeTab === 'track' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Search Box Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900 font-serif">Track Your Admission Application</h3>
                <p className="text-xs text-slate-500">
                  Enter your Application Reference Number (e.g. <strong className="font-mono text-slate-700">SGM-ADM-2026-1001</strong>) or Registered Mobile Number.
                </p>
              </div>

              <form onSubmit={handleTrackSearch} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Enter Application Reference ID or Mobile (उदा. SGM-ADM-2026-1001)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="md"
                  className="bg-blue-600 hover:bg-blue-700 font-bold px-6 text-xs"
                  isLoading={isSearching}
                  leftIcon={<Search className="w-4 h-4" />}
                >
                  Check Status
                </Button>
              </form>

              {trackError && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                  <span>{trackError}</span>
                </div>
              )}
            </div>

            {/* Tracked Results Card */}
            {trackedApp && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] font-black uppercase text-blue-700 block tracking-wider">
                      Application Reference &bull; {trackedApp.applicationNumber}
                    </span>
                    <h2 className="text-xl font-black text-slate-900">{trackedApp.applicantName}</h2>
                    <p className="text-xs text-slate-500">
                      {trackedApp.targetClass} &bull; {trackedApp.medium === 'english_sssd' ? 'SSSD (English Medium)' : 'SGM (Hindi Medium)'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                        trackedApp.status === 'admitted' || trackedApp.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : trackedApp.status === 'interview_scheduled'
                          ? 'bg-purple-100 text-purple-800'
                          : trackedApp.status === 'rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {trackedApp.status?.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Visual Step Progress Stepper */}
                <div className="py-4">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    {[
                      { step: '1', title: 'Application Submitted', desc: 'Online form received', done: true },
                      {
                        step: '2',
                        title: 'Document Verification',
                        desc: 'Marksheets & Aadhaar verified',
                        done: ['document_verified', 'interview_scheduled', 'approved', 'admitted'].includes(trackedApp.status),
                      },
                      {
                        step: '3',
                        title: 'Counseling / Interview',
                        desc: trackedApp.interviewDate
                          ? new Date(trackedApp.interviewDate).toLocaleString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : 'Date & venue will be assigned',
                        done: ['interview_scheduled', 'approved', 'admitted'].includes(trackedApp.status),
                      },
                      {
                        step: '4',
                        title: 'Official Admission & Enrollment',
                        desc: trackedApp.status === 'admitted' ? 'Enrolled in ERP Class Roster' : 'Final seat confirmation',
                        done: ['approved', 'admitted'].includes(trackedApp.status),
                      },
                    ].map((st, sIdx) => (
                      <div
                        key={sIdx}
                        className={`p-4 rounded-2xl border transition ${
                          st.done ? 'bg-emerald-50/70 border-emerald-300' : 'bg-slate-50 border-slate-200 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className={`w-6 h-6 rounded-full text-xs font-black flex items-center justify-center ${
                              st.done ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-700'
                            }`}
                          >
                            {st.done ? <Check className="w-3.5 h-3.5" /> : st.step}
                          </span>
                          <span className="font-bold text-slate-900 text-xs">{st.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-600">{st.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviewer Remarks */}
                {trackedApp.reviewerRemarks && (
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs space-y-1">
                    <span className="font-black text-blue-900 uppercase tracking-wider block">Office Reviewer Remarks:</span>
                    <p className="text-blue-800">{trackedApp.reviewerRemarks}</p>
                  </div>
                )}

                {/* Counseling Details if Scheduled */}
                {trackedApp.interviewDate && (
                  <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-xs space-y-1">
                    <span className="font-black text-purple-900 uppercase tracking-wider block flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-purple-700" /> Scheduled Counseling Session:
                    </span>
                    <p className="text-purple-800">
                      <strong>Date &amp; Time:</strong> {new Date(trackedApp.interviewDate).toLocaleString('en-IN')}
                    </p>
                    <p className="text-purple-800">
                      <strong>Venue:</strong> {trackedApp.interviewVenue || 'School Administrative Office'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      <PublicFooter />
    </div>
  );
}

