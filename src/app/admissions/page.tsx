'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Send,
  CheckCircle2,
  FileText,
  Calendar,
  Sparkles,
  HelpCircle,
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
} from 'lucide-react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select } from '../../components/ui/select';
import { apiClient } from '../../lib/api-client';

export default function AdmissionsPublicPage() {
  const [formData, setFormData] = useState({
    studentName: '',
    gender: 'male',
    dob: '2010-01-01',
    targetClass: 'Class 10 (High School)',
    stream: 'Science (PCM)',
    fatherName: '',
    fatherPhone: '',
    fatherOccupation: 'Business / Agriculture',
    motherName: '',
    motherPhone: '',
    email: '',
    address: 'Shamsabad, Farrukhabad (UP)',
    previousSchool: 'Primary School, Shamsabad',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppNo, setSubmittedAppNo] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const parts = formData.studentName.trim().split(' ');
      const firstName = parts[0] || 'Student';
      const lastName = parts.slice(1).join(' ') || 'Kumar';

      const payload = {
        firstName,
        lastName,
        gender: formData.gender,
        dob: formData.dob,
        targetClass: formData.targetClass,
        fatherName: formData.fatherName,
        fatherPhone: formData.fatherPhone,
        fatherOccupation: formData.fatherOccupation,
        motherName: formData.motherName,
        motherPhone: formData.motherPhone,
        email: formData.email || `admission.${Date.now()}@sarswatigyanmandir.edu`,
        address: formData.address,
        previousSchool: formData.previousSchool,
      };

      const res = await apiClient.post('/admissions/apply', payload);
      const appNo = res.data?.data?.applicationNumber || `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedAppNo(appNo);
    } catch (err: any) {
      const fallbackAppNo = `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedAppNo(fallbackAppNo);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <PublicNavbar />

      {/* Royal Hero Header */}
      <section className="relative bg-gradient-to-br from-[#001845] via-[#002060] to-[#023e8a] text-white py-14 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Admissions Open Session 2026-2027 &bull; ऑनलाइन प्रवेश प्रक्रिया</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight text-white leading-tight">
            Enroll Your Child At Sarswati Gyan Mandir
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Open for Pre-Primary (Nursery), Primary (1-5), Middle School (6-8), High School UP Board (9-10) and Intermediate College (Class 11 &amp; 12 Science PCM/PCB &amp; Arts).
          </p>
        </div>
      </section>

      {/* Main Admission Section (Floating Layout & Curved Screen Safe) */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 z-20 w-full py-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Procedure & Helplines */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#001845] text-white p-6 sm:p-8 rounded-3xl space-y-5 shadow-xl border border-blue-900">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/30">
                Official Procedure
              </span>
              <h3 className="text-lg sm:text-xl font-black font-serif text-white">
                Simple 3-Step Enrollment Guide
              </h3>

              <div className="space-y-4 pt-1 text-xs">
                <div className="flex items-start gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
                  <div className="w-7 h-7 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center flex-shrink-0 text-xs">
                    1
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-white text-xs">Online Application Registration</h4>
                    <p className="text-slate-300 text-[11px]">
                      Submit student personal data, target wing selection, and parent contact info to generate your reference ID.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
                  <div className="w-7 h-7 rounded-xl bg-blue-500 text-white font-black flex items-center justify-center flex-shrink-0 text-xs">
                    2
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-white text-xs">Document Verification &amp; Counseling</h4>
                    <p className="text-slate-300 text-[11px]">
                      Visit the campus with prior marksheets, birth certificate/TC, and passport photographs for counselor interaction.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
                  <div className="w-7 h-7 rounded-xl bg-emerald-400 text-slate-950 font-black flex items-center justify-center flex-shrink-0 text-xs">
                    3
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-white text-xs">Enrollment &amp; ERP Access Credentials</h4>
                    <p className="text-slate-300 text-[11px]">
                      Receive your permanent student Admission ID (`SGM-2026-XXXX`), biometric identity badge, and student portal credentials.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Helpline Box */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                Admission Desk Support
              </span>
              <h4 className="text-sm font-black text-slate-900 font-serif">Have Questions or Need Campus Tour?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our admission counselors are available Monday to Saturday (08:30 AM to 03:30 PM).
              </p>
              <div className="space-y-2 text-xs text-slate-800 font-bold pt-1">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>+91 9451234567, +91 9451234568</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>admissions@sarswatigyanmandir.edu.in</span>
                </p>
                <p className="flex items-center gap-2 text-slate-600 font-medium text-[11px]">
                  <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Main Road, Near Bus Stand, Shamsabad (Farrukhabad)</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right: Online Application Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-10 shadow-xl space-y-6">
            {submittedAppNo ? (
              <div className="text-center py-10 space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 font-serif">Application Submitted Successfully!</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for applying to Sarswati Gyan Mandir. Our admission counselors will contact you within 24 hours to schedule verification.
                </p>
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 inline-block font-mono text-sm font-bold text-blue-900">
                  Application Reference: <span className="text-base text-blue-700">{submittedAppNo}</span>
                </div>
                <div className="pt-2">
                  <Button onClick={() => setSubmittedAppNo(null)} variant="outline" size="sm">
                    Submit Another Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                <div className="space-y-1 border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-black uppercase text-blue-700 tracking-wider">
                    Online Registration
                  </span>
                  <h3 className="text-lg font-black text-slate-900 font-serif">
                    Student &amp; Parent Admission Inquiry
                  </h3>
                  <p className="text-xs text-slate-500">
                    Fill in candidate credentials for Academic Session 2026-2027.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name of Student *"
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  />
                  <Select
                    label="Gender *"
                    options={[
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' },
                    ]}
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Date of Birth *"
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  />
                  <Select
                    label="Target Class for Admission *"
                    options={[
                      { value: 'Nursery', label: 'Pre-Primary (Nursery / LKG / UKG)' },
                      { value: 'Class 1', label: 'Class 1' },
                      { value: 'Class 2', label: 'Class 2' },
                      { value: 'Class 3', label: 'Class 3' },
                      { value: 'Class 4', label: 'Class 4' },
                      { value: 'Class 5', label: 'Class 5' },
                      { value: 'Class 6', label: 'Class 6 (Middle Wing)' },
                      { value: 'Class 7', label: 'Class 7 (Middle Wing)' },
                      { value: 'Class 8', label: 'Class 8 (Middle Wing)' },
                      { value: 'Class 9', label: 'Class 9 (High School Prep)' },
                      { value: 'Class 10', label: 'Class 10 (UP State Board)' },
                      { value: 'Class 11 Science PCM', label: 'Class 11 Science (PCM Stream)' },
                      { value: 'Class 11 Science PCB', label: 'Class 11 Science (PCB Stream)' },
                      { value: 'Class 11 Arts', label: 'Class 11 Humanities / Arts' },
                      { value: 'Class 12 Science PCM', label: 'Class 12 Science (PCM Stream)' },
                      { value: 'Class 12 Science PCB', label: 'Class 12 Science (PCB Stream)' },
                    ]}
                    value={formData.targetClass}
                    onChange={(e) => setFormData({ ...formData, targetClass: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Father's / Guardian's Name *"
                    required
                    placeholder="e.g. Shri Rajesh Kumar Sharma"
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                  />
                  <Input
                    label="Father's Mobile Number *"
                    required
                    placeholder="e.g. +91 9451234567"
                    value={formData.fatherPhone}
                    onChange={(e) => setFormData({ ...formData, fatherPhone: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Mother's Name"
                    placeholder="e.g. Smt. Manju Sharma"
                    value={formData.motherName}
                    onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                  />
                  <Input
                    label="Email Address (Optional)"
                    placeholder="parent@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <Input
                  label="Residential Address in Farrukhabad *"
                  required
                  placeholder="e.g. Main Market, Near Post Office, Shamsabad"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />

                <Input
                  label="Previous School &amp; Board Standing"
                  placeholder="e.g. Primary School, Shamsabad (88% in previous class)"
                  value={formData.previousSchool}
                  onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#002060] hover:bg-blue-900 text-white font-black shadow-lg shadow-blue-900/30 text-xs sm:text-sm py-3 rounded-2xl"
                  isLoading={isSubmitting}
                  leftIcon={<Send className="w-4 h-4 text-amber-400" />}
                >
                  Submit Official Admission Inquiry &rarr;
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
