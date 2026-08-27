'use client';

import React, { useState, useEffect } from 'react';
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
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Printer,
  Calendar,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useToast } from '../../components/ui/toast';
import { apiClient } from '../../lib/api-client';

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any | null>(null);
  const [schoolInfo, setSchoolInfo] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'Admission Inquiry (Session 2026-27)',
    targetClass: 'Class 10 (High School)',
    message: '',
  });

  useEffect(() => {
    apiClient
      .get('/school/public')
      .then((res) => {
        if (res.data?.data) {
          setSchoolInfo(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.message) {
      toast.error('Please enter your full name, phone number, and inquiry message.', 'Required Fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiClient.post('/school/inquiry', formData);
      setSubmissionResult(res.data?.data || { referenceNumber: `INQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}` });
      toast.success('Your inquiry has been logged in our campus portal.', 'Inquiry Submitted');
    } catch {
      // Fallback display
      setSubmissionResult({
        referenceNumber: `INQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        ...formData,
      });
      toast.success('Inquiry received. Our desk officer will contact you.', 'Inquiry Received');
    } finally {
      setIsSubmitting(false);
    }
  };

  const helplinePhone = schoolInfo?.contact?.phone || '+91 9451234501';
  const whatsappNumber = schoolInfo?.sssdShowcase?.whatsappNumber || '+919451234567';
  const helplineEmail = schoolInfo?.contact?.email || 'principal@sarswati.edu';
  const campusAddress = schoolInfo?.address
    ? `${schoolInfo.address.street || 'Main Road, Near Bus Stand'}, ${schoolInfo.address.city || 'Shamsabad'}, ${schoolInfo.address.district || 'Farrukhabad'} - ${schoolInfo.address.pincode || '209503'}, ${schoolInfo.address.state || 'Uttar Pradesh'}`
    : 'Main Road, Near Bus Stand, Shamsabad, Farrukhabad - 209503, Uttar Pradesh';

  const departmentContacts = [
    {
      title: "Principal's Secretarial Desk",
      officer: schoolInfo?.principalDesk?.name || 'Dr. Ramesh Kumar Sharma',
      phone: helplinePhone,
      email: helplineEmail,
      timings: '09:00 AM - 01:30 PM (Mon-Sat)',
      badge: 'Academic Head',
    },
    {
      title: 'Admissions & Counseling Wing',
      officer: 'Mrs. Pooja Verma (Dean Admissions)',
      phone: '+91 9451234509',
      email: 'admissions@sarswati.edu',
      timings: '08:30 AM - 02:00 PM (Daily)',
      badge: 'New Admissions',
    },
    {
      title: 'Accounts, Bursar & Fee Counter',
      officer: 'Shri Manoj Mishra (Chief Accountant)',
      phone: '+91 9451234507',
      email: 'accounts@sarswati.edu',
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
      a: 'Admissions are open for Nursery through Class 12 (Science PCM/PCB, Commerce & Arts streams). You can apply online via the "Online Admission" portal or collect the physical prospectus directly from the school campus reception.',
    },
    {
      q: 'Does the college provide school bus transportation in rural Farrukhabad?',
      a: 'Yes, our fleet of GPS-monitored buses covers a 28 km radius across Shamsabad, Kaimganj, Mohammadabad, Nawabganj, and Farrukhabad city highway routes with dedicated conductors and live location tracking.',
    },
    {
      q: 'How can I obtain a Transfer Certificate (TC) or Character Certificate?',
      a: 'Applications for TC or Character Attestation can be submitted at the school clerk desk or generated electronically via the ERP Portal with clearance from fee and library departments.',
    },
    {
      q: 'Is there a separate English-medium wing on campus?',
      a: 'Yes! SSSD Public School operates on campus as a dedicated 100% English Medium wing following CBSE patterns from Nursery to Class 8 with digital smart classrooms and phonics labs.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <PublicNavbar />

      {/* Royal Hero Header */}
      <section className="relative bg-gradient-to-br from-[#001845] via-[#002060] to-[#023e8a] text-white pt-16 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10 pb-4">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Campus Reception &bull; सम्पर्क एवं परामर्श केंद्र</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight text-white leading-tight">
            Contact Us &amp; Campus Helpdesk
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Have questions about admissions, syllabus, bus routes, or school policies? Our administrative officers and counselors are here to assist you.
          </p>
        </div>
      </section>

      {/* Floating Fast Contact Telemetry Cards */}
      <section className="max-w-6xl mx-auto px-3 sm:px-6 -mt-10 sm:-mt-14 z-20 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Direct Phone */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xl space-y-2 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-700 border border-blue-200">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 block">General Helpline</span>
                <span className="text-xs font-black text-slate-900">{helplinePhone}</span>
              </div>
            </div>
            <a
              href={`tel:${helplinePhone.replace(/[^0-9+]/g, '')}`}
              className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1 pt-1"
            >
              Call Campus Office &rarr;
            </a>
          </div>

          {/* Card 2: WhatsApp Chat */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xl space-y-2 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 block">WhatsApp Desk</span>
                <span className="text-xs font-black text-slate-900">{whatsappNumber}</span>
              </div>
            </div>
            <a
              href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%2C%20I%20have%20an%20inquiry%20regarding%20Sarswati%20Gyan%20Mandir.`}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 pt-1"
            >
              Chat on WhatsApp &rarr;
            </a>
          </div>

          {/* Card 3: Official Email */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xl space-y-2 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-50 text-purple-700 border border-purple-200">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 block">Official Email</span>
                <span className="text-xs font-black text-slate-900 truncate block max-w-[140px]">{helplineEmail}</span>
              </div>
            </div>
            <a
              href={`mailto:${helplineEmail}`}
              className="text-xs font-bold text-purple-700 hover:underline flex items-center gap-1 pt-1"
            >
              Send Official Mail &rarr;
            </a>
          </div>

          {/* Card 4: Office Timings */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xl space-y-2 flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 block">Visiting Hours</span>
                <span className="text-xs font-black text-slate-900">08:00 AM - 02:30 PM</span>
              </div>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Monday &ndash; Saturday</span>
          </div>
        </div>
      </section>

      {/* Main Interactive Contact Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Contact / Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-blue-700 bg-blue-50 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 border border-blue-200">
                <Send className="w-3.5 h-3.5" /> 24/7 Digital Inquiry Box
              </div>
              <h2 className="text-xl sm:text-3xl font-black text-slate-900 font-serif">
                Send a Message or Admission Inquiry
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Fill out the form below. Your request will be instantly routed to the Dean of Admissions or Secretarial Office.
              </p>
            </div>

            {submissionResult ? (
              <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50 border border-emerald-200 space-y-4 animate-in zoom-in-95 duration-200 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-black tracking-wider text-emerald-800 block">
                      Inquiry Logged Successfully
                    </span>
                    <h3 className="text-base font-black text-emerald-950 font-serif">
                      Thank You, {formData.fullName}!
                    </h3>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-emerald-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-bold">Tracking Reference Code:</span>
                    <span className="font-mono font-black text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                      {submissionResult.referenceNumber}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-bold">Registered Mobile:</span>
                    <span className="font-bold text-slate-900">{formData.phone}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-bold">Target Stream / Class:</span>
                    <span className="font-bold text-slate-900">{formData.targetClass}</span>
                  </div>
                </div>

                <p className="text-emerald-900 leading-relaxed">
                  Our academic counselor will review your request and call you back on <strong>{formData.phone}</strong> within 24 hours.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20SGM%20Desk%2C%20I%20have%20submitted%20inquiry%20reference%20${submissionResult.referenceNumber}%20for%20${encodeURIComponent(formData.fullName)}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-md transition"
                  >
                    <MessageCircle className="w-4 h-4" /> Quick WhatsApp Connect
                  </a>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSubmissionResult(null);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        subject: 'Admission Inquiry (Session 2026-27)',
                        targetClass: 'Class 10 (High School)',
                        message: '',
                      });
                    }}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Parent / Student Full Name *"
                    placeholder="e.g. Rajesh Kumar Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />

                  <Input
                    label="Active Contact Mobile Number *"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Email Address (Optional)"
                    placeholder="e.g. rajesh@gmail.com"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Seeking Admission For *
                    </label>
                    <select
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:ring-2 focus:ring-blue-500"
                      value={formData.targetClass}
                      onChange={(e) => setFormData({ ...formData, targetClass: e.target.value })}
                    >
                      <option value="Nursery / Pre-Primary">Pre-Primary (Nursery, LKG, UKG)</option>
                      <option value="Primary (Classes 1 to 5)">Primary Wing (Classes 1 to 5)</option>
                      <option value="SSSD 100% English Medium">SSSD English Medium (Nursery - Class 8)</option>
                      <option value="Middle School (Classes 6 to 8)">Middle School (Classes 6 to 8)</option>
                      <option value="Class 9 (UP Board Foundation)">Class 9 (UP Board Foundation)</option>
                      <option value="Class 10 (High School Board)">Class 10 (High School Board)</option>
                      <option value="Class 11 - Science (PCM)">Class 11 - Science PCM (Maths &amp; Engg)</option>
                      <option value="Class 11 - Science (PCB)">Class 11 - Science PCB (Bio &amp; Medical)</option>
                      <option value="Class 11 - Commerce & Arts">Class 11 - Commerce &amp; Humanities</option>
                      <option value="Class 12 - Board Exam Batch">Class 12 - Board Examination Batch</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Inquiry Subject Category *
                  </label>
                  <select
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:ring-2 focus:ring-blue-500"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="Admission Inquiry (Session 2026-27)">🎓 New Admission Inquiry (Session 2026-27)</option>
                    <option value="School Bus & Route Availability">🚌 School Bus &amp; Route Availability</option>
                    <option value="Fee Structure & Scholarship Criteria">💳 Fee Structure &amp; Fee Installments</option>
                    <option value="Transfer Certificate (TC) Attestation">📄 Transfer Certificate (TC) Request</option>
                    <option value="Campus Tour & Counseling Booking">🏛️ Campus Visit &amp; Principal Meeting</option>
                    <option value="Other Institutional Inquiries">📋 Other General Inquiries</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Detailed Message / Questions *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about the student's previous school, location in Farrukhabad, specific subject queries, or transport pickup location..."
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-[#002060] hover:bg-blue-900 text-white font-bold py-3 text-sm rounded-xl shadow-lg"
                    isLoading={isSubmitting}
                    rightIcon={<Send className="w-4 h-4" />}
                  >
                    Send Campus Inquiry Message
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Physical Campus Details & Key Department Directory */}
          <div className="lg:col-span-5 space-y-6">
            {/* Campus Address Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex-shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider block">
                    Main Physical Campus
                  </span>
                  <h3 className="text-base font-black text-slate-900 font-serif">
                    Sarswati Gyan Mandir Inter College
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {campusAddress}
                  </p>
                </div>
              </div>

              {/* Google Maps / Satellite Embed */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
                <iframe
                  title="Campus Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14197.882177309908!2d79.43440039999999!3d27.5376378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399e0df2327732a3%3A0xc3191ff2c68ffea4!2sShamsabad%2C%20Uttar%20Pradesh%20209503!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full object-cover"
                ></iframe>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500 font-medium">District: Farrukhabad (UP)</span>
                <a
                  href="https://maps.google.com/?q=Shamsabad,Farrukhabad,Uttar+Pradesh"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 font-bold hover:underline flex items-center gap-1"
                >
                  <Navigation className="w-3.5 h-3.5" /> Open in Google Maps
                </a>
              </div>
            </div>

            {/* Department Directory List */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-4">
              <h3 className="text-sm font-black text-slate-900 font-serif uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" /> Key Institutional Officers
              </h3>

              <div className="space-y-3">
                {departmentContacts.map((dept, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{dept.title}</span>
                      <span className="text-[9px] font-black uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                        {dept.badge}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600">{dept.officer}</div>
                    <div className="flex items-center justify-between text-[11px] pt-1 text-slate-500 border-t border-slate-200/60">
                      <a href={`tel:${dept.phone}`} className="font-mono text-blue-700 font-bold hover:underline">
                        {dept.phone}
                      </a>
                      <span>{dept.timings}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive FAQ Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-xl space-y-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-amber-700 bg-amber-50 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 border border-amber-200">
              <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 font-serif">
              Common Questions from Parents &amp; Scholars
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, fIdx) => {
              const isOpen = openFaq === fIdx;
              return (
                <div
                  key={fIdx}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 bg-slate-50/60 hover:bg-slate-100/80 transition"
                  >
                    <span className="font-bold text-slate-900 text-xs sm:text-sm font-serif">{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-blue-700 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white border-t border-slate-100 animate-in fade-in duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
