'use client';

import React, { useState, useEffect } from 'react';
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
  FileCheck2,
} from 'lucide-react';
import { PublicNavbar } from '../../components/public/public-navbar';
import { PublicFooter } from '../../components/public/public-footer';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { apiClient } from '../../lib/api-client';

interface DocumentItem {
  _id?: string;
  id?: string;
  title: string;
  category: string;
  categoryLabel?: string;
  fileSize?: string;
  format?: string;
  updatedDate?: string;
  authority?: string;
  docCode?: string;
  description?: string;
  fileUrl?: string;
  downloadCount?: number;
}

const STARTER_DOCUMENTS: DocumentItem[] = [
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
    fileUrl: '/uploads/documents/UP_Board_Affiliation_Certificate_2026.pdf',
    downloadCount: 142,
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
    fileUrl: '/uploads/documents/Society_Registration_Trust_Deed.pdf',
    downloadCount: 89,
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
    fileUrl: '/uploads/documents/Fire_Safety_NOC_Farrukhabad_2026.pdf',
    downloadCount: 67,
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
    fileUrl: '/uploads/documents/Building_Safety_Certificate_2026.pdf',
    downloadCount: 54,
  },
  {
    id: 'water-sanitation',
    title: 'Safe Drinking Water & Sanitary Hygiene Certificate',
    category: 'disclosure',
    categoryLabel: 'Statutory Disclosures',
    fileSize: '780 KB',
    format: 'PDF',
    updatedDate: 'Certified 2026',
    authority: 'Chief Medical Officer (CMO) & Public Health Lab, Farrukhabad',
    docCode: 'WATER-HYG-2026-44',
    description:
      'Certified laboratory analysis report of multi-stage RO drinking water quality and hygiene standards across campus blocks.',
    fileUrl: '/uploads/documents/Water_Sanitation_Certificate_2026.pdf',
    downloadCount: 42,
  },

  // 2. Curricula & Syllabi
  {
    id: 'class10-syllabus',
    title: 'Class 10 High School Board Revised Syllabus & Exam Blueprint',
    category: 'syllabus',
    categoryLabel: 'Curricula & Syllabi',
    fileSize: '3.6 MB',
    format: 'PDF',
    updatedDate: 'Session 2026-27',
    authority: 'UP MSP Curriculum Directorate, Prayagraj',
    docCode: 'SYLL-CLASS10-2026',
    description:
      'Complete NCERT & UP MSP syllabus, chapter-wise marks distribution, and model question papers for High School candidates.',
    fileUrl: '/uploads/documents/Class10_HighSchool_Syllabus_2026.pdf',
    downloadCount: 310,
  },
  {
    id: 'class12-sci-syllabus',
    title: 'Class 12 Intermediate Science (PCM & PCB) Syllabus & Lab Manual',
    category: 'syllabus',
    categoryLabel: 'Curricula & Syllabi',
    fileSize: '4.8 MB',
    format: 'PDF',
    updatedDate: 'Session 2026-27',
    authority: 'UP MSP Curriculum Directorate, Prayagraj',
    docCode: 'SYLL-CLASS12-SCI-2026',
    description:
      'Comprehensive intermediate physics, chemistry, mathematics, and biology theory syllabus along with practical experiments manual.',
    fileUrl: '/uploads/documents/Class12_Intermediate_Science_Syllabus_2026.pdf',
    downloadCount: 285,
  },
  {
    id: 'class12-comm-syllabus',
    title: 'Class 12 Intermediate Commerce & Humanities Syllabus',
    category: 'syllabus',
    categoryLabel: 'Curricula & Syllabi',
    fileSize: '3.1 MB',
    format: 'PDF',
    updatedDate: 'Session 2026-27',
    authority: 'UP MSP Curriculum Directorate, Prayagraj',
    docCode: 'SYLL-CLASS12-COMM-2026',
    description:
      'Official syllabus for Accountancy, Business Organisation, Economics, Commercial Mathematics, and Civic Administration.',
    fileUrl: '/uploads/documents/Class12_Commerce_Arts_Syllabus_2026.pdf',
    downloadCount: 160,
  },

  // 3. Academic Calendar & Date Sheets
  {
    id: 'acad-calendar',
    title: 'Annual Institutional Academic Calendar & Gazetted Holidays (2026-27)',
    category: 'calendar',
    categoryLabel: 'Academic Calendars',
    fileSize: '1.4 MB',
    format: 'PDF',
    updatedDate: 'Session 2026-27',
    authority: 'Office of the Principal, Sarswati Gyan Mandir',
    docCode: 'ACAD-CAL-2026-27',
    description:
      'Detailed month-wise schedule of 240+ working days, monthly unit assessments, national festivals, vacation periods, and parent-teacher meetings.',
    fileUrl: '/uploads/documents/Academic_Calendar_Holiday_List_2026_27.pdf',
    downloadCount: 420,
  },
  {
    id: 'pre-board-datesheet',
    title: 'Pre-Board Examination Date Sheet & Seating Matrix (Jan 2027)',
    category: 'calendar',
    categoryLabel: 'Academic Calendars',
    fileSize: '890 KB',
    format: 'PDF',
    updatedDate: 'Released 2026',
    authority: 'Examination Controller, SGM Examination Center',
    docCode: 'DATE-SHEET-PREBOARD-2027',
    description:
      'Official routine and examination timings for Class 10 and Class 12 Pre-Board internal examinations.',
    fileUrl: '/uploads/documents/PreBoard_Date_Sheet_2027.pdf',
    downloadCount: 195,
  },

  // 4. Forms & Proformas
  {
    id: 'offline-adm-form',
    title: 'Physical Admission Registration Form & Medical Fitness Proforma',
    category: 'forms',
    categoryLabel: 'Admission & TC Proformas',
    fileSize: '1.1 MB',
    format: 'PDF',
    updatedDate: 'Session 2026-27',
    authority: 'Central Admissions Office, SGM & SSSD',
    docCode: 'FORM-ADM-OFFLINE-2026',
    description:
      'Printable offline admission application form for parents preferring physical submission at the administrative office counter.',
    fileUrl: '/uploads/documents/Offline_Admission_Registration_Form_2026.pdf',
    downloadCount: 230,
  },
  {
    id: 'tc-application-form',
    title: 'Transfer Certificate (TC) & Character Certificate Application Proforma',
    category: 'forms',
    categoryLabel: 'Admission & TC Proformas',
    fileSize: '650 KB',
    format: 'PDF',
    updatedDate: 'Session 2026-27',
    authority: 'Student Record Vault & Registrar Desk',
    docCode: 'FORM-TC-REQ-2026',
    description:
      'Standard institutional request application form for obtaining official School Leaving Transfer Certificates.',
    fileUrl: '/uploads/documents/TC_Character_Certificate_Application.pdf',
    downloadCount: 112,
  },
];

const CATEGORY_TABS = [
  { id: 'all', label: 'All Repository Files', icon: FileCheck },
  { id: 'disclosure', label: 'Statutory Disclosures', icon: ShieldCheck },
  { id: 'syllabus', label: 'Curricula & Syllabi', icon: BookOpen },
  { id: 'calendar', label: 'Academic Calendars & Dates', icon: Calendar },
  { id: 'forms', label: 'Admission & TC Proformas', icon: FileText },
];

export default function DownloadsPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>(STARTER_DOCUMENTS);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    apiClient
      .get('/documents/public')
      .then((res) => {
        if (res.data?.data && res.data.data.length > 0) {
          setDocuments(res.data.data);
        }
        if (res.data?.meta?.categories) {
          setCategoryCounts(res.data.meta.categories);
        }
      })
      .catch(() => {});
  }, []);

  const handleDownload = (doc: DocumentItem) => {
    if (doc._id) {
      apiClient.post(`/documents/${doc._id}/download-track`).catch(() => {});
    }
    const link = document.createElement('a');
    link.href = doc.fileUrl || '#';
    link.download = doc.title + '.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = documents.filter((doc) => {
    const matchCategory =
      activeTab === 'all' ||
      doc.category === activeTab ||
      (activeTab === 'calendar' && doc.category === 'date_sheet');
    const matchSearch =
      !searchQuery ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.description && doc.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (doc.docCode && doc.docCode.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (doc.authority && doc.authority.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
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
            <span>Official Document Center &bull; अनिवार्य प्रकटीकरण एवं प्रपत्र</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight text-white leading-tight">
            Mandatory Disclosures &amp; Downloads Hub
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Direct public access to UP Board recognition orders, fire safety clearances, official academic syllabi, holiday calendars, and offline admission proformas.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto pt-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search by keyword, doc code, or authority..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-blue-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Floating Category Filter Tabs */}
      <section className="max-w-6xl mx-auto px-3 sm:px-6 -mt-10 sm:-mt-14 z-20 w-full overflow-hidden">
        <div className="bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar max-w-full">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            const count =
              tab.id === 'all'
                ? documents.length
                : tab.id === 'calendar'
                ? (categoryCounts['calendar'] || 0) + (categoryCounts['date_sheet'] || 0) || documents.filter((d) => d.category === 'calendar' || d.category === 'date_sheet').length
                : categoryCounts[tab.id] || documents.filter((d) => d.category === tab.id).length;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  isActive
                    ? 'bg-[#002060] text-white shadow-md scale-100 ring-2 ring-blue-400/30'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    isActive ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Documents Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 flex-1">
        {filtered.length === 0 ? (
          <div className="p-16 text-center text-slate-500 space-y-3 bg-white rounded-3xl border border-slate-200 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No documents found matching your search.</h3>
            <p className="text-xs text-slate-400">Try clearing the search query or selecting another category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((doc, idx) => (
              <div
                key={doc._id || doc.id || idx}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-black uppercase tracking-wider text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                      {doc.docCode || 'OFFICIAL'}
                    </span>
                    <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      {doc.format || 'PDF'} &bull; {doc.fileSize || '1.5 MB'}
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-slate-900 font-serif leading-snug group-hover:text-blue-700 transition line-clamp-2">
                    {doc.title}
                  </h3>

                  {doc.description && (
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{doc.description}</p>
                  )}

                  {doc.authority && (
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Issuing Authority</span>
                      <p className="text-[11px] font-bold text-slate-700 line-clamp-1">{doc.authority}</p>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedDoc(doc)}
                    className="text-xs font-bold text-slate-600 hover:text-blue-700 flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition"
                  >
                    <Eye className="w-3.5 h-3.5" /> Details
                  </button>

                  <Button
                    size="sm"
                    className="bg-[#002060] hover:bg-blue-900 text-white font-bold"
                    onClick={() => handleDownload(doc)}
                    leftIcon={<Download className="w-3.5 h-3.5" />}
                  >
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* DOCUMENT DETAILS MODAL                                                    */}
      {/* ========================================================================= */}
      {selectedDoc && (
        <div
          onClick={() => setSelectedDoc(null)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-xl w-full bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-2xl p-6 my-auto animate-in zoom-in-95 duration-150 space-y-5 text-xs"
          >
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100">
              <div className="space-y-1">
                <span className="font-mono text-[10px] font-black uppercase text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                  {selectedDoc.docCode || 'OFFICIAL REPOSITORY'}
                </span>
                <h3 className="text-base font-black text-slate-900 font-serif">{selectedDoc.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-blue-800 block">Issuing Authority / Directorate</span>
                <p className="font-bold text-slate-900 text-xs">{selectedDoc.authority || 'Sarswati Gyan Mandir & SSSD'}</p>
              </div>

              {selectedDoc.description && (
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Official Summary &amp; Scope</span>
                  <p className="text-slate-700 leading-relaxed">{selectedDoc.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Format &amp; Size</span>
                  <span className="font-bold text-slate-900">{selectedDoc.format || 'PDF'} ({selectedDoc.fileSize || '1.5 MB'})</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Public Downloads</span>
                  <span className="font-bold text-emerald-700 font-mono">{selectedDoc.downloadCount || 0} Downloads</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setSelectedDoc(null)}>
                Close
              </Button>
              <Button
                size="sm"
                className="bg-[#002060] hover:bg-blue-900 text-white font-bold"
                onClick={() => {
                  handleDownload(selectedDoc);
                  setSelectedDoc(null);
                }}
                leftIcon={<Download className="w-4 h-4" />}
              >
                Download Official PDF ({selectedDoc.fileSize || '1.5 MB'})
              </Button>
            </div>
          </div>
        </div>
      )}

      <PublicFooter />
    </div>
  );
}
