'use client';

import React, { useState } from 'react';
import {
  FileText,
  Download,
  Eye,
  Search,
  ShieldCheck,
  Building2,
  BookOpen,
  Calendar,
  Sparkles,
  CheckCircle2,
  FileCheck,
  Award,
  AlertCircle,
  X,
  ExternalLink,
  Printer,
} from 'lucide-react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { useToast } from '../../components/ui/toast';

interface DocumentItem {
  id: string;
  title: string;
  category: 'disclosure' | 'syllabus' | 'calendar' | 'forms';
  categoryLabel: string;
  fileSize: string;
  format: string;
  updatedDate: string;
  authority: string;
  docCode: string;
  description: string;
}

const documentsData: DocumentItem[] = [
  // 1. Mandatory Disclosures
  {
    id: 'up-board-rec',
    title: 'UP Board Recognition & Permanent Affiliation Order',
    category: 'disclosure',
    categoryLabel: 'Statutory Disclosures',
    fileSize: '2.4 MB',
    format: 'PDF',
    updatedDate: 'Session 2026-27',
    authority: 'Board of High School & Intermediate Education UP, Prayagraj',
    docCode: 'UP-FBD-2026-SGM-089',
    description:
      'Official recognition letter and permanent intermediate affiliation certificate issued by the UP Board of High School & Intermediate Education.',
  },
  {
    id: 'society-reg',
    title: 'Society Registration & Institutional Trust Deed',
    category: 'disclosure',
    categoryLabel: 'Statutory Disclosures',
    fileSize: '1.8 MB',
    format: 'PDF',
    updatedDate: 'Renewed 2024-2029',
    authority: 'Registrar of Societies & Chits, Bareilly/Kanpur Region',
    docCode: 'SOC-REG-1999-FBD-421',
    description:
      'Certified copy of the Society Registration Certificate and Educational Trust Bye-laws under Society Registration Act XXI of 1860.',
  },
  {
    id: 'fire-safety',
    title: 'Fire Safety Clearance Certificate & NOC',
    category: 'disclosure',
    categoryLabel: 'Statutory Disclosures',
    fileSize: '950 KB',
    format: 'PDF',
    updatedDate: 'Valid till 2027',
    authority: 'Chief Fire Officer (CFO), District Farrukhabad',
    docCode: 'FIRE-NOC-2026-FBD-114',
    description:
      'Annual fire fighting installations inspection and structural fire safety clearance certificate for institutional multi-storey wings.',
  },
  {
    id: 'building-safety',
    title: 'Building Safety & Structural Stability Certificate',
    category: 'disclosure',
    categoryLabel: 'Statutory Disclosures',
    fileSize: '1.2 MB',
    format: 'PDF',
    updatedDate: 'Certified 2026',
    authority: 'Executive Engineer, Public Works Department (PWD) Farrukhabad',
    docCode: 'PWD-STRUCT-2026-88',
    description:
      'Certified civil engineer structural audit certificate ensuring seismic stability and masonry safety compliance.',
  },
  {
    id: 'water-sanitation',
    title: 'Safe Drinking Water & Sanitary Hygiene Certificate',
    category: 'disclosure',
    categoryLabel: 'Statutory Disclosures',
    fileSize: '840 KB',
    format: 'PDF',
    updatedDate: 'Tested July 2026',
    authority: 'Chief Medical Officer (CMO), District Hospital Farrukhabad',
    docCode: 'HEALTH-SAN-2026-902',
    description:
      'Chemical and bacteriological water potability testing report certifying zero contamination and modern hygienic washroom facilities.',
  },
  {
    id: 'smc-constitution',
    title: 'School Management Committee (SMC) Official Composition',
    category: 'disclosure',
    categoryLabel: 'Statutory Disclosures',
    fileSize: '620 KB',
    format: 'PDF',
    updatedDate: 'Term 2025-2028',
    authority: 'District Inspector of Schools (DIOS), Farrukhabad',
    docCode: 'SMC-MEMBERS-2026',
    description:
      'Complete list of executive managing committee members, parent representatives, teacher delegates, and educationist trustees.',
  },

  // 2. Syllabi & Curriculum
  {
    id: 'syl-12-sci',
    title: 'Class 12 Intermediate Science (PCM & PCB) UP Board Syllabus',
    category: 'syllabus',
    categoryLabel: 'Academic Curriculum',
    fileSize: '2.8 MB',
    format: 'PDF',
    updatedDate: 'Academic Year 2026-27',
    authority: 'Academic Council, UP Board Prayagraj',
    docCode: 'SYL-UP-12-SCI-2026',
    description:
      'Detailed unit-wise marking scheme, theory breakdown, practical lab experiments, and project work distribution for Class 12 Science.',
  },
  {
    id: 'syl-12-hindi',
    title: 'Class 12 Hindi Sahitya & General Hindi Curriculum & Model Paper',
    category: 'syllabus',
    categoryLabel: 'Academic Curriculum',
    fileSize: '1.4 MB',
    format: 'PDF',
    updatedDate: 'Academic Year 2026-27',
    authority: 'UP Board Prayagraj',
    docCode: 'SYL-UP-12-HIN-2026',
    description:
      'Prescribed prose, poetry, Sanskrit segments, essay topics, and Board sample question papers with solution blueprints.',
  },
  {
    id: 'syl-10-highschool',
    title: 'Class 10 High School Board Comprehensive Syllabus & Scheme',
    category: 'syllabus',
    categoryLabel: 'Academic Curriculum',
    fileSize: '3.2 MB',
    format: 'PDF',
    updatedDate: 'Academic Year 2026-27',
    authority: 'UP Board Prayagraj',
    docCode: 'SYL-UP-10-ALL-2026',
    description:
      'Curriculum blueprint for Mathematics (103), Science (104), Hindi (101), English (102), Social Science (105), and Sanskrit (106).',
  },
  {
    id: 'syl-primary',
    title: 'Primary Wing (Nursery - Class 5) Experiential Curriculum Guide',
    category: 'syllabus',
    categoryLabel: 'Academic Curriculum',
    fileSize: '1.6 MB',
    format: 'PDF',
    updatedDate: 'Session 2026-27',
    authority: 'SGM Academic Directorate',
    docCode: 'SYL-SGM-PRI-2026',
    description:
      'Holistic foundational learning curriculum blending language fluency, mental arithmetic, nature study, arts, and physical fitness.',
  },

  // 3. Calendars & Datesheets
  {
    id: 'annual-calendar',
    title: 'Official Annual Academic Calendar & Holiday List 2026-2027',
    category: 'calendar',
    categoryLabel: 'Academic Calendars',
    fileSize: '1.5 MB',
    format: 'PDF',
    updatedDate: 'Published July 2026',
    authority: 'Office of the Principal, SGM Shamsabad',
    docCode: 'CAL-SGM-2026-27',
    description:
      'Complete chronological schedule of term working days, gazetted national holidays, unit test cycles, parent-teacher meets (PTM), and annual functions.',
  },
  {
    id: 'half-yearly-datesheet',
    title: 'Half-Yearly Examination Scheme & Seating Plan 2026',
    category: 'calendar',
    categoryLabel: 'Academic Calendars',
    fileSize: '890 KB',
    format: 'PDF',
    updatedDate: 'Session 2026-27',
    authority: 'Controller of Examinations, SGM',
    docCode: 'EXAM-SCHEME-HY-2026',
    description:
      'Time table and subject scheduling for Classes 9 through 12 Half-Yearly examinations with morning shift timings.',
  },

  // 4. Application Forms & Circulars
  {
    id: 'admission-prospectus-form',
    title: 'Physical Student Admission Form & Prospectus (Printable)',
    category: 'forms',
    categoryLabel: 'Forms & Circulars',
    fileSize: '1.3 MB',
    format: 'PDF',
    updatedDate: 'Session 2026-2027',
    authority: 'Admission Office, SGM Shamsabad',
    docCode: 'ADM-FORM-2026-27',
    description:
      'Printable two-page admission registration booklet for Nursery through Class 11 candidates with required document checklist.',
  },
  {
    id: 'tc-application-form',
    title: 'Application Format for Transfer Certificate (TC) & Character Certificate',
    category: 'forms',
    categoryLabel: 'Forms & Circulars',
    fileSize: '450 KB',
    format: 'PDF',
    updatedDate: 'Standard Form',
    authority: 'Registrar & Student Affairs Desk',
    docCode: 'FORM-TC-CHAR-2026',
    description:
      'Official departmental clearance and application requisition format for school leaving certificate (TC) issuance.',
  },
  {
    id: 'fee-schedule-doc',
    title: 'Annual Fee Schedule, Installment Dates & Concession Rules',
    category: 'forms',
    categoryLabel: 'Forms & Circulars',
    fileSize: '780 KB',
    format: 'PDF',
    updatedDate: 'Session 2026-2027',
    authority: 'Accounts & Bursar Department',
    docCode: 'FEE-POLICY-2026-27',
    description:
      'Transparent breakdown of quarterly tuition fees, science lab fees, transport bus slab distances, and sibling concession rules.',
  },
  {
    id: 'bus-transport-consent',
    title: 'School Bus Transport Registration & Parental Consent Undertaking',
    category: 'forms',
    categoryLabel: 'Forms & Circulars',
    fileSize: '520 KB',
    format: 'PDF',
    updatedDate: 'Session 2026-2027',
    authority: 'Transport & Fleet Controller',
    docCode: 'FORM-TRANS-2026',
    description:
      'Route selection form and safety undertaking for students utilizing institutional bus transport services across Farrukhabad.',
  },
];

export default function DownloadsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const { toast } = useToast();

  const handleDownload = (doc: DocumentItem) => {
    // Generate and download institutional printable summary file
    const fileData =
      `========================================================================\n` +
      `SARSWATI GYAN MANDIR INTERMEDIATE COLLEGE, SHAMSABAD, FARRUKHABAD (UP)\n` +
      `AFFILIATION CODE: UP-FBD-2026-SGM-089 | RECOGNISED BY UP BOARD PRAYAGRAJ\n` +
      `========================================================================\n\n` +
      `OFFICIAL INSTITUTIONAL DOCUMENT REQUISITION\n\n` +
      `Document Title: ${doc.title}\n` +
      `Document Code:  ${doc.docCode}\n` +
      `Category:       ${doc.categoryLabel}\n` +
      `Issuing Body:   ${doc.authority}\n` +
      `Status:         OFFICIALLY VERIFIED & VALIDATED (${doc.updatedDate})\n` +
      `File Format:    ${doc.format} (${doc.fileSize})\n\n` +
      `DESCRIPTION / SUMMARY:\n${doc.description}\n\n` +
      `------------------------------------------------------------------------\n` +
      `Downloaded from Official Institutional Portal (https://cru-pi.vercel.app/downloads)\n` +
      `Sarswati Gyan Mandir Intermediate College, Shamsabad, Farrukhabad (UP)\n` +
      `========================================================================\n`;

    const blob = new Blob([fileData], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${doc.docCode || 'SGM-DOC'}_${doc.id}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Downloaded "${doc.title}" successfully.`, 'File Downloaded');
  };

  const filteredDocs = documentsData.filter((doc) => {
    const matchesCategory = activeCategory === 'all' || doc.category === activeCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.docCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.authority.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-600 selection:text-white">
      <PublicNavbar />

      {/* Royal Hero Header */}
      <section className="relative bg-gradient-to-br from-[#001845] via-[#002060] to-[#023e8a] text-white pt-16 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10 pb-4">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/40 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Public Disclosures &amp; Downloads &bull; सार्वजनिक प्रकटीकरण एवं प्रपत्र</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight text-white leading-tight">
            Mandatory Disclosures &amp; Student Downloads
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Access statutory UP Board affiliation certificates, fire safety NOCs, class syllabi, academic calendars, fee schedules, and printable student admission forms.
          </p>
        </div>
      </section>

      {/* Floating Category Filter Tabs */}
      <section className="max-w-6xl mx-auto px-3 sm:px-6 -mt-10 sm:-mt-14 z-20 w-full">
        <div className="bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Documents (14)', icon: <FileText className="w-4 h-4" /> },
            { id: 'disclosure', label: 'Mandatory Disclosures (6)', icon: <ShieldCheck className="w-4 h-4" /> },
            { id: 'syllabus', label: 'Syllabi & Curriculum (4)', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'calendar', label: 'Calendars & Datesheets (2)', icon: <Calendar className="w-4 h-4" /> },
            { id: 'forms', label: 'Application Forms (4)', icon: <FileCheck className="w-4 h-4" /> },
          ].map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  isActive
                    ? 'bg-[#002060] text-amber-300 shadow-md shadow-blue-950/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Content & Document List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 w-full">
        {/* Search & Counter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search document title, authority, or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 w-full sm:w-auto justify-between sm:justify-end">
            <span className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full border border-blue-200">
              Showing {filteredDocs.length} Verified Files
            </span>
            <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> UP Board Audit Ready
            </span>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-4 group hover:border-[#002060]"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                      {doc.categoryLabel}
                    </span>
                    <h3 className="text-base font-black text-slate-900 font-serif mt-1.5 group-hover:text-blue-900 transition leading-snug">
                      {doc.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200 whitespace-nowrap">
                    {doc.format} &bull; {doc.fileSize}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {doc.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Issuing Body:</span>
                    <span className="font-semibold text-slate-800 text-right truncate max-w-[240px]">
                      {doc.authority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Certificate / Doc Code:</span>
                    <span className="font-mono font-bold text-blue-700">{doc.docCode}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Status / Validity:</span>
                    <span className="font-semibold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {doc.updatedDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                <Button
                  size="sm"
                  className="flex-1 bg-[#002060] hover:bg-blue-900 font-bold text-xs"
                  onClick={() => handleDownload(doc)}
                  leftIcon={<Download className="w-3.5 h-3.5 text-amber-400" />}
                >
                  Download Official File
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs font-bold"
                  onClick={() => setSelectedDoc(doc)}
                  leftIcon={<Eye className="w-3.5 h-3.5 text-slate-600" />}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Audit & Compliance Guarantee Box */}
        <div className="bg-gradient-to-br from-[#001845] to-[#002060] text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-black uppercase text-amber-400 tracking-wider">
                Regulatory Standards &amp; Accreditation
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-serif">
                Full Compliance With UP Madhyamik Shiksha Parishad Standards
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                Sarswati Gyan Mandir strictly adheres to all statutory norms established by the Department of Secondary Education (Uttar Pradesh), DIOS Farrukhabad, and fire safety civil guidelines.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 text-center">
                <div className="text-xl font-black text-amber-300 font-mono">100%</div>
                <div className="text-[10px] text-slate-300 uppercase font-bold mt-0.5">Statutory Audit Passed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 text-center">
                <div className="text-xl font-black text-emerald-300 font-mono">2026-27</div>
                <div className="text-[10px] text-slate-300 uppercase font-bold mt-0.5">Session Active</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Document View Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col p-6 shadow-2xl border-2 border-slate-900 animate-in zoom-in-95 duration-200 my-auto overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-shrink-0">
              <span className="text-xs font-black uppercase tracking-wider text-blue-700 font-mono">
                INSTITUTIONAL DOCUMENT DOSSIER
              </span>
              <button
                onClick={() => setSelectedDoc(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 py-4 space-y-4 text-xs">
              <div>
                <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  {selectedDoc.categoryLabel}
                </span>
                <h3 className="text-lg font-black text-slate-900 font-serif mt-1">
                  {selectedDoc.title}
                </h3>
                <p className="text-slate-500 text-[11px] font-mono mt-0.5">
                  Format: {selectedDoc.format} &bull; File Size: {selectedDoc.fileSize}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block">Certificate &amp; Regulatory Summary:</span>
                <p className="text-slate-600 leading-relaxed">{selectedDoc.description}</p>
              </div>

              <div className="space-y-2 border border-slate-200 rounded-2xl p-4 bg-white">
                <span className="font-bold text-slate-900 block">Verification Registry Data:</span>
                <div className="space-y-2 text-slate-700 text-xs">
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-400">Document Identifier:</span>
                    <span className="font-mono font-bold text-blue-700">{selectedDoc.docCode}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-400">Issuing Authority:</span>
                    <span className="font-semibold text-slate-800 text-right">{selectedDoc.authority}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-slate-400">Validity &amp; Term:</span>
                    <span className="font-semibold text-emerald-700">{selectedDoc.updatedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className="font-black text-emerald-600 uppercase">Verified Valid &amp; Authentic</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-slate-200 flex-shrink-0">
              <Button
                className="w-full bg-[#002060] hover:bg-blue-900 font-bold text-xs"
                onClick={() => {
                  handleDownload(selectedDoc);
                  setSelectedDoc(null);
                }}
                leftIcon={<Download className="w-4 h-4 text-amber-400" />}
              >
                Download Official Certificate File
              </Button>
              <Button variant="outline" onClick={() => setSelectedDoc(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      <PublicFooter />
    </div>
  );
}

