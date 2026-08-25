'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  UserCheck,
  Building2,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  Printer,
  ChevronRight,
  Database,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <PublicNavbar />

      {/* Royal Hero Header */}
      <section className="relative bg-gradient-to-br from-[#001845] via-[#002060] to-[#023e8a] text-white pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>DPDP Act 2023 &bull; संस्थागत गोपनीयता नीति</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight text-white leading-tight">
            Institutional Privacy Policy &amp; Data Protection Framework
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Sarswati Gyan Mandir Intermediate College is committed to the highest standards of data security, student privacy, and ethical information stewardship for all scholars, parents, and faculty.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-blue-200 font-mono">
            <span>Effective Date: 01 April 2026</span>
            <span>&bull;</span>
            <span>Session: 2026-2027</span>
            <span>&bull;</span>
            <span>Affiliation Code: UP-FBD-2026-SGM-089</span>
          </div>
        </div>
      </section>

      {/* Policy Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 z-20 w-full mb-16 space-y-8">
        {/* Quick Highlights Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-4">
          <h2 className="text-base sm:text-lg font-black text-slate-900 font-serif flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" /> Key Privacy Commitments
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-1.5">
              <Lock className="w-5 h-5 text-blue-700" />
              <div className="font-bold text-slate-900">Zero Commercial Sharing</div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Student and guardian data is never sold, rented, or shared with third-party commercial marketing agencies.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1.5">
              <Database className="w-5 h-5 text-emerald-700" />
              <div className="font-bold text-slate-900">Encrypted Cloud ERP</div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                All academic grades, fee ledgers, and admission dossiers are protected with 256-bit SSL encryption.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-1.5">
              <UserCheck className="w-5 h-5 text-purple-700" />
              <div className="font-bold text-slate-900">Statutory Compliance</div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                100% aligned with Uttar Pradesh Madhyamik Shiksha Parishad (UP MSP) and Digital Personal Data Protection Act.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Legal Sections */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-lg space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Section 1 */}
          <div className="space-y-2.5">
            <h3 className="text-base sm:text-lg font-black text-slate-900 font-serif flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-mono font-bold">1</span>
              Information We Collect
            </h3>
            <p>
              When a scholar is enrolled at Sarswati Gyan Mandir Intermediate College (Shamsabad, Farrukhabad), we collect and securely maintain the following categories of information:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
              <li><strong>Student Profile:</strong> Full name, date of birth, gender, photograph, Aadhaar/PEN number, previous academic records, and caste category for state scholarship verification.</li>
              <li><strong>Parent/Guardian Information:</strong> Father’s &amp; Mother’s names, residential address, mobile contact numbers, email addresses, and occupation.</li>
              <li><strong>Academic &amp; Telemetry Data:</strong> Attendance markers, homework submissions, periodic test scores, UP Board examination marks, and disciplinary logs.</li>
              <li><strong>Financial Transactions:</strong> Digital fee payment receipt records, offline cash ledger entries, concession approvals, and statutory receipt numbers.</li>
            </ul>
          </div>

          <hr className="border-slate-100" />

          {/* Section 2 */}
          <div className="space-y-2.5">
            <h3 className="text-base sm:text-lg font-black text-slate-900 font-serif flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-mono font-bold">2</span>
              Purpose of Data Utilization
            </h3>
            <p>
              Collected institutional data is utilized strictly for lawful educational and administrative functions:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block mb-1">State Board Examination Filings:</strong>
                Registration with UPMSP (Prayagraj) for High School (Class 10) and Intermediate (Class 12) roll number issuance.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block mb-1">Parent SMS Alerts &amp; Telemetry:</strong>
                Instant automated SMS notifications for student morning absenteeism, urgent emergency school closures, and fee receipt tokens.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block mb-1">Scholarship &amp; Direct Benefits:</strong>
                Transmitting verified student enrollment data to the UP Government Social Welfare Portal (Samaj Kalyan Vibhag).
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block mb-1">Safety &amp; Identity Verification:</strong>
                Generation of official barcode-enabled Student ID cards, library circulation passes, and bus transport manifests.
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 3 */}
          <div className="space-y-2.5">
            <h3 className="text-base sm:text-lg font-black text-slate-900 font-serif flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-mono font-bold">3</span>
              Data Protection &amp; Security Controls
            </h3>
            <p>
              The institution employs multi-tiered technical safeguards to prevent unauthorized data access, leakage, or tampering:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
              <li>Role-based access controls (RBAC) ensuring only authorized Class Teachers and the Principal Desk can access sensitive personal dossiers.</li>
              <li>Daily automated off-site database backups with encrypted rest-state storage.</li>
              <li>Physical security logs and CCTV monitoring of institutional server rooms and physical record vaults.</li>
            </ul>
          </div>

          <hr className="border-slate-100" />

          {/* Section 4 */}
          <div className="space-y-2.5">
            <h3 className="text-base sm:text-lg font-black text-slate-900 font-serif flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-mono font-bold">4</span>
              Parental Rights &amp; Data Rectification
            </h3>
            <p>
              Parents and lawful guardians hold the right to inspect their ward’s academic record, request corrections to misspelled names or address records, and obtain official transcripts upon written request to the Principal’s office.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 5: Grievance Desk */}
          <div className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="text-sm sm:text-base font-black text-slate-900 font-serif flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-700" /> Institutional Grievance &amp; Privacy Officer
            </h3>
            <p className="text-xs text-slate-600">
              For any inquiries, data correction requests, or privacy concerns, please contact the Principal Desk:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="flex items-center gap-2 text-slate-700">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>+91 9451234567 / +91 9839124455</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>privacy@sarswatigyanmandir.edu.in</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              Campus Address: Sarswati Gyan Mandir Intermediate College, Station Road, Shamsabad, Farrukhabad, Uttar Pradesh &ndash; 209503
            </p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-[#001845] rounded-3xl text-white shadow-xl">
          <div>
            <h4 className="font-bold text-sm text-amber-300 font-serif">Have questions regarding student records?</h4>
            <p className="text-xs text-blue-200">Visit our downloads center for statutory disclosure files and affiliation certificates.</p>
          </div>
          <Link
            href="/downloads"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition whitespace-nowrap"
          >
            <span>Public Disclosures &bull; Downloads</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
