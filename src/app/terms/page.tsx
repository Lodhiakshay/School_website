'use client';

import React from 'react';
import Link from 'next/link';
import {
  FileCheck2,
  Scale,
  GraduationCap,
  CreditCard,
  Bus,
  FlaskConical,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Clock,
  Phone,
  Mail,
} from 'lucide-react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <PublicNavbar />

      {/* Royal Hero Header */}
      <section className="relative bg-gradient-to-br from-[#001845] via-[#002060] to-[#023e8a] text-white pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Scale className="w-4 h-4 text-amber-300" />
            <span>Code of Conduct &bull; नियमावली एवं अनुशासन</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight text-white leading-tight">
            Institutional Terms &amp; Academic Regulations
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Statutory rules, disciplinary framework, examination regulations, and fee policies governing all students enrolled at Sarswati Gyan Mandir Intermediate College for Academic Session 2026-2027.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-blue-200 font-mono">
            <span>Academic Session: 2026-2027</span>
            <span>&bull;</span>
            <span>UP Board Affiliation: UP-FBD-2026-SGM-089</span>
            <span>&bull;</span>
            <span>Jurisdiction: Farrukhabad (UP)</span>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 z-20 w-full mb-16 space-y-8">
        {/* Discipline Highlights Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-4">
          <h2 className="text-base sm:text-lg font-black text-slate-900 font-serif flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" /> Core Institutional Principles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 space-y-1.5">
              <Clock className="w-5 h-5 text-amber-700" />
              <div className="font-bold text-slate-900">75% Mandatory Attendance</div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                UP Board regulations require a minimum 75% biometric attendance for appearing in High School &amp; Intermediate board exams.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-1.5">
              <ShieldAlert className="w-5 h-5 text-blue-700" />
              <div className="font-bold text-slate-900">Zero Tolerance Anti-Ragging</div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Strict disciplinary action, including immediate rustication, is enforced against ragging, bullying, or insubordination.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1.5">
              <GraduationCap className="w-5 h-5 text-emerald-700" />
              <div className="font-bold text-slate-900">Prescribed Institutional Uniform</div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Full institutional uniform with official student ID card is mandatory on all working days and examination dates.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Regulation Clauses */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-lg space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Section 1 */}
          <div className="space-y-2.5">
            <h3 className="text-base sm:text-lg font-black text-slate-900 font-serif flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-mono font-bold">1</span>
              Admission &amp; Enrollment Terms
            </h3>
            <p>
              Admission to all classes (Nursery to Class 12) is governed strictly by merit, documentary verification, and seat availability under the UP Board curriculum framework:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
              <li>Original Transfer Certificate (TC) counter-signed by the District Inspector of Schools (DIOS) or Competent Authority is mandatory at the time of admission.</li>
              <li>Aadhaar card copy, birth certificate, and previous year marksheet must be submitted within 15 days of provisional admission.</li>
              <li>Submission of forged, false, or altered documentation will result in immediate cancellation of enrollment without refund of dues.</li>
            </ul>
          </div>

          <hr className="border-slate-100" />

          {/* Section 2 */}
          <div className="space-y-2.5">
            <h3 className="text-base sm:text-lg font-black text-slate-900 font-serif flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-mono font-bold">2</span>
              Attendance, Leave &amp; Punctuality Policy
            </h3>
            <p>
              Academic discipline is the cornerstone of student character formation:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
              <li>School gates close promptly at 08:00 AM (Summer) and 08:30 AM (Winter). Late comers will not be permitted on campus without guardian authorization.</li>
              <li>Any leave of absence exceeding 2 consecutive days requires a written medical certificate and guardian endorsement submitted to the Class Teacher.</li>
              <li>Unnotified continuous absence for more than 15 days will lead to the student’s name being struck off the rolls under UPMSP regulations.</li>
            </ul>
          </div>

          <hr className="border-slate-100" />

          {/* Section 3 */}
          <div className="space-y-2.5">
            <h3 className="text-base sm:text-lg font-black text-slate-900 font-serif flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-mono font-bold">3</span>
              Tuition Fees &amp; Financial Regulations
            </h3>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <p><strong>Quarterly Payment Schedule:</strong> School tuition fees are payable quarterly by the 10th day of the starting month (April, July, October, January).</p>
              <p><strong>Late Fine:</strong> A nominal late fee of ₹ 10 per day is chargeable on overdue installments after the 15th of the respective month.</p>
              <p><strong>Non-Refundability:</strong> Admission fee, registration charges, and tuition installments once deposited are strictly non-refundable.</p>
              <p><strong>Dues Clearance:</strong> Admit cards for UP Board Annual Examinations and Transfer Certificates (TC) are issued only upon 100% clearance of accounts dues.</p>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Section 4 */}
          <div className="space-y-2.5">
            <h3 className="text-base sm:text-lg font-black text-slate-900 font-serif flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-mono font-bold">4</span>
              Laboratory, Library &amp; Transport Guidelines
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
              <li><strong>Science Labs:</strong> Students must adhere to laboratory safety protocols, wear cotton lab coats, and handle chemical reagents and glassware with utmost care under faculty supervision.</li>
              <li><strong>Library Books:</strong> Borrowed books must be returned within 14 days. Damaged or lost volumes will incur replacement charges.</li>
              <li><strong>Bus Safety:</strong> Indiscipline, standing on footboards, or disturbing the driver will lead to immediate suspension of bus transit privileges.</li>
            </ul>
          </div>

          <hr className="border-slate-100" />

          {/* Section 5 */}
          <div className="space-y-2.5">
            <h3 className="text-base sm:text-lg font-black text-slate-900 font-serif flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-mono font-bold">5</span>
              Prohibition of Electronic Devices
            </h3>
            <p>
              Carrying mobile phones, smartwatches, recording gadgets, or non-educational electronics onto the school campus is strictly prohibited. Any unauthorized device found in student possession will be confiscated and returned only to the parent at the term end.
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* Section 6: Jurisdiction */}
          <div className="space-y-2 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="text-sm sm:text-base font-black text-slate-900 font-serif flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-700" /> Legal Jurisdiction &amp; Dispute Resolution
            </h3>
            <p className="text-xs text-slate-600">
              The Managing Committee of Sarswati Gyan Mandir Intermediate College reserves the final authority in all matters of discipline and institutional administration. All legal disputes are subject solely to the judicial jurisdiction of Farrukhabad Courts (Uttar Pradesh).
            </p>
          </div>
        </div>

        {/* Action Callout */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-[#001845] rounded-3xl text-white shadow-xl">
          <div>
            <h4 className="font-bold text-sm text-amber-300 font-serif">Need statutory admission forms or syllabus copies?</h4>
            <p className="text-xs text-blue-200">Download officially stamped PDF documents from our student center.</p>
          </div>
          <Link
            href="/downloads"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition whitespace-nowrap"
          >
            <span>Downloads &amp; Public Disclosures</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
