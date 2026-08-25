'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Sparkles,
  Building2,
  Navigation,
  CheckCircle2,
  HelpCircle,
  Bus,
  GraduationCap,
  ShieldCheck,
  PhoneCall,
  UserCheck,
} from 'lucide-react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'Admission Inquiry (Session 2026-27)',
    targetClass: 'Class 10',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const departmentContacts = [
    {
      title: "Principal's Secretarial Desk",
      officer: 'Dr. Ramesh Kumar Sharma',
      phone: '+91 9451234501',
      email: 'principal@sarswati.edu',
      timings: '09:00 AM - 01:30 PM (Mon-Sat)',
      badge: 'Academic Head',
    },
    {
      title: 'Admissions & Counseling Wing',
      officer: 'Mrs. Pooja Verma (Dean Admissions)',
      phone: '+91 9451234509',
      email: 'admission@sarswati.edu',
      timings: '08:30 AM - 02:00 PM (Daily)',
      badge: 'New Admissions',
    },
    {
      title: 'Accounts, Bursar & Fee Counter',
      officer: 'Shri Manoj Mishra (Chief Accountant)',
      phone: '+91 9451234507',
      email: 'accountant@sarswati.edu',
      timings: '08:30 AM - 01:30 PM (Working Days)',
      badge: 'Fee Receipts',
    },
    {
      title: 'Transport & Fleet Controller',
      officer: 'Shri Ramakant Yadav',
      phone: '+91 9451234701',
      email: 'transport@sarswati.edu',
      timings: '07:00 AM - 04:30 PM (All School Days)',
      badge: 'Bus GPS & Routes',
    },
  ];

  const faqs = [
    {
      q: 'What are the school visiting and office timings?',
      a: 'The administrative and admission counter is open Monday through Saturday from 08:00 AM to 02:30 PM. Parents can meet the Principal between 10:00 AM and 01:00 PM with prior intimation.',
    },
    {
      q: 'How do I apply for new admission for the 2026-27 academic session?',
      a: 'Admissions are open for Nursery through Class 12 (Science PCM/PCB & Arts streams). You can apply online via the "Online Admission" portal or collect the physical prospectus directly from the school campus reception.',
    },
    {
      q: 'Does the college provide school bus transportation in rural Farrukhabad?',
      a: 'Yes, our fleet of GPS-monitored buses covers a 28 km radius across Shamsabad, Kaimganj, Mohammadabad, Nawabganj, and Farrukhabad city highway routes with dedicated conductors and live location tracking.',
    },
    {
      q: 'How can I obtain a Transfer Certificate (TC) or Character Certificate?',
      a: 'Applications for TC or Character Attestation can be submitted at the school clerk desk or generated electronically via the ERP Portal with clearance from fee and library departments.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <PublicNavbar />

      {/* Hero Header Banner */}
      <section className="bg-gradient-to-br from-[#001845] via-[#002060] to-[#023e8a] text-white pt-16 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10 pb-4">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/40 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>सम्पर्क सूत्र &bull; Connect With Our Institution</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight text-white leading-tight">
            Get In Touch With <br className="hidden sm:inline" />
            <span className="text-amber-300">Sarswati Gyan Mandir</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-blue-100/90 max-w-2xl mx-auto leading-relaxed font-normal">
            Have questions about admissions, academic curriculum, or campus visits? Our administrative desk and faculty are here to assist you.
          </p>
        </div>
      </section>

      {/* Quick Contact Info Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-10 sm:-mt-14 z-20 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Address */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md hover:shadow-lg transition flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold group-hover:scale-110 transition">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Campus Address</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Main Road, Near Bus Stand, Shamsabad, Farrukhabad, Uttar Pradesh &bull; PIN: 209503
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] font-semibold text-blue-600">
              Landmark: Near Shamsabad Chowki
            </div>
          </div>

          {/* Card 2: Phone */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md hover:shadow-lg transition flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold group-hover:scale-110 transition">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Phone Helplines</h3>
              <div className="text-xs text-slate-700 space-y-1 font-mono">
                <p className="font-bold">+91 9451234567</p>
                <p className="font-bold">+91 9451234568</p>
              </div>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Lines active 8 AM - 4 PM
            </div>
          </div>

          {/* Card 3: Email */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md hover:shadow-lg transition flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold group-hover:scale-110 transition">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Official Inquiries</h3>
              <div className="text-xs text-slate-700 space-y-1">
                <p className="font-semibold text-blue-900 truncate">info@sarswati.edu</p>
                <p className="font-semibold text-blue-900 truncate">admission@sarswati.edu</p>
              </div>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] font-semibold text-indigo-600">
              Response within 24 hours
            </div>
          </div>

          {/* Card 4: Office Hours */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md hover:shadow-lg transition flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold group-hover:scale-110 transition">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Visiting Hours</h3>
              <div className="text-xs text-slate-600 space-y-0.5">
                <p><strong className="text-slate-800">Mon - Sat:</strong> 08:00 AM - 02:30 PM</p>
                <p><strong className="text-slate-800">Sunday:</strong> Closed (Academic Holiday)</p>
              </div>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] font-semibold text-amber-700">
              Principal Meet: 10 AM - 1 PM
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area: Interactive Form & Campus Map */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Interactive Contact & Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Official Inquiry Portal
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif mt-2">
                Send Us An Official Message
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Fill out the form below and our admissions team or academic office will contact you promptly.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-8 bg-emerald-50 border-2 border-emerald-300 rounded-2xl text-center space-y-3 animate-in fade-in zoom-in-95">
                <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black text-emerald-950 font-serif">Message Received Successfully!</h3>
                <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.fullName}</strong>. Your inquiry regarding <em>"{formData.subject}"</em> has been registered with ticket reference <strong>#SGM-INQ-{Math.floor(1000 + Math.random() * 9000)}</strong>. Our school office will reach out to <strong>{formData.phone}</strong> shortly.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 border-emerald-400 text-emerald-800 hover:bg-emerald-100"
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      subject: 'Admission Inquiry (Session 2026-27)',
                      targetClass: 'Class 10',
                      message: '',
                    });
                  }}
                >
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mobile Contact Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9451234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Inquiry Category *</label>
                    <select
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="Admission Inquiry (Session 2026-27)">Admission Inquiry (Session 2026-27)</option>
                      <option value="Fee Structure & Installments">Fee Structure &amp; Installments</option>
                      <option value="School Bus & Transport Route">School Bus &amp; Transport Route</option>
                      <option value="Transfer Certificate (TC) Request">Transfer Certificate (TC) Request</option>
                      <option value="Academic Curriculum / Board Query">Academic Curriculum / Board Query</option>
                      <option value="General Feedback or Complaint">General Feedback or Complaint</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Student Class (If applicable)</label>
                  <select
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={formData.targetClass}
                    onChange={(e) => setFormData({ ...formData, targetClass: e.target.value })}
                  >
                    <option value="Nursery - UKG">Primary Wing (Nursery - UKG)</option>
                    <option value="Class 1 to 5">Primary School (Class 1 to 5)</option>
                    <option value="Class 6 to 8">Middle School (Class 6 to 8)</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10 (UP Board High School)</option>
                    <option value="Class 11 - Science (PCM)">Class 11 - Science (PCM Stream)</option>
                    <option value="Class 11 - Science (PCB)">Class 11 - Science (PCB Stream)</option>
                    <option value="Class 12 - Science (PCM)">Class 12 - Science (PCM Stream)</option>
                    <option value="Class 12 - Science (PCB)">Class 12 - Science (PCB Stream)</option>
                    <option value="Class 11/12 - Arts / Humanities">Class 11/12 - Arts / Humanities</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Detailed Message / Question *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your specific query or information request here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#002060] hover:bg-[#001845] text-white py-3 font-bold text-sm shadow-md"
                  leftIcon={<Send className="w-4 h-4 text-amber-400" />}
                >
                  Submit Official Inquiry
                </Button>
              </form>
            )}
          </div>

          {/* Right Column: Campus Location & Connectivity Map */}
          <div className="lg:col-span-5 space-y-6">
            {/* Visual Campus Map Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-blue-600" /> Campus Location &amp; Directions
                </h3>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Easy Access
                </span>
              </div>

              {/* Map Canvas Graphic */}
              <div className="w-full h-48 bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 rounded-2xl border-2 border-slate-200 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden shadow-inner">
                <div className="w-12 h-12 rounded-full bg-blue-900 text-amber-300 flex items-center justify-center shadow-lg mb-2">
                  <Building2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-black text-sm text-slate-900">सरस्वती ज्ञान मन्दिर इण्टर कॉलेज</h4>
                <p className="text-[10px] text-slate-600 font-medium">Main Road, Near Bus Stand, Shamsabad (Farrukhabad)</p>
                <a
                  href="https://maps.google.com/?q=Shamsabad+Farrukhabad+Uttar+Pradesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition shadow-sm"
                >
                  <MapPin className="w-3 h-3 text-amber-300" /> Open in Google Maps
                </a>
              </div>

              {/* Connectivity Highlights */}
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <Bus className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Bus Stand Connectivity</strong>
                    <span className="text-slate-500 text-[11px]">Directly situated 200m from Shamsabad Main Bus Stop on the highway.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <Navigation className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Railway Stations</strong>
                    <span className="text-slate-500 text-[11px]">Farrukhabad Junction (24 km) &bull; Kaimganj Station (18 km).</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">Safe Gated Campus</strong>
                    <span className="text-slate-500 text-[11px]">24/7 CCTV surveillance, boundary walls, and dedicated security guards.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Admission Banner */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-3xl p-6 text-white shadow-md space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" />
                <span>Session 2026-27 Enrollment</span>
              </div>
              <h4 className="font-serif font-black text-base">Direct Online Admission Available</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Save time by submitting your child's registration and scholarship documents online through our portal.
              </p>
              <Link
                href="/admission"
                className="inline-block bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-4 py-2 rounded-xl transition shadow-sm font-sans"
              >
                Start Online Application &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Administrative Department Helplines */}
      <section className="bg-white py-12 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Direct Helplines
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
              Administrative &amp; Department Contacts
            </h2>
            <p className="text-xs text-slate-500 max-w-xl mx-auto">
              Direct access numbers for school officers during official hours.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {departmentContacts.map((dept, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/40 transition space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      {dept.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-xs text-slate-900 leading-snug">{dept.title}</h3>
                  <p className="text-[11px] font-semibold text-slate-700">{dept.officer}</p>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-200 text-xs">
                  <div className="flex items-center gap-1.5 font-mono font-bold text-blue-700">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{dept.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{dept.email}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium mt-1">{dept.timings}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 w-full space-y-6">
        <div className="text-center space-y-1">
          <span className="text-[11px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Common Inquiries
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
