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
  {
    id: 'sssd-cbse-prospectus',
    title: 'SSSD Public School (100% English Medium) CBSE Prospectus 2026-27',
    category: 'syllabus',
    categoryLabel: 'Academic Curriculum',
    fileSize: '3.6 MB',
    format: 'PDF',
    updatedDate: 'Session 2026-2027',
    authority: 'Academic Directorate, SSSD Public School',
    docCode: 'PROSP-SSSD-2026-CBSE',
    description:
      'Comprehensive institutional prospectus for SSSD English medium wing covering CBSE curriculum framework, STEM smart labs, and Montessori play-way pedagogy.',
  },
  {
    id: 'sssd-phonics-guide',
    title: 'SSSD Cambridge Phonics & Spoken English Foundation Guide',
    category: 'syllabus',
    categoryLabel: 'Academic Curriculum',
    fileSize: '2.1 MB',
    format: 'PDF',
    updatedDate: 'Academic Year 2026-27',
    authority: 'English & Phonics Department, SSSD',
    docCode: 'SSSD-PHONICS-GUIDE-26',
    description:
      'Foundation guide on conversational English drills, phonetic sounds, vocabulary building, and digital audio studio modules.',
  },
  {
    id: 'sssd-admission-form',
    title: 'SSSD Public School Scholar Admission & Bus Enrolment Form',
    category: 'forms',
    categoryLabel: 'Forms & Circulars',
    fileSize: '640 KB',
    format: 'PDF',
    updatedDate: 'Session 2026-27',
    authority: 'SSSD Admission & Counseling Wing',
    docCode: 'FORM-SSSD-ADM-2026',
    description:
      'Official printable admission registration form and document checklist for Nursery to Grade 10 English medium scholars.',
  },
];

export default function DownloadsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const { toast } = useToast();

  const handlePrintPdf = (doc: DocumentItem) => {
    const printWindow = window.open('', '_blank', 'width=900,height=1000');
    if (!printWindow) {
      toast.error('Pop-up blocked. Please allow popups to save the PDF.', 'Action Required');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>${doc.title} - Saraswati Gyan Mandir</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 12mm;
          }
          * {
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          }
          body {
            margin: 0;
            padding: 20px;
            color: #0f172a;
            background: #ffffff;
            font-size: 13px;
          }
          .certificate-container {
            border: 3px double #002060;
            padding: 24px;
            border-radius: 12px;
            position: relative;
            background: #ffffff;
          }
          .gold-inner-border {
            border: 1px solid #f59e0b;
            padding: 18px;
            border-radius: 8px;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #002060;
            padding-bottom: 14px;
            margin-bottom: 18px;
          }
          .logo {
            width: 70px;
            height: 70px;
            margin: 0 auto 8px;
            display: block;
            border-radius: 50%;
            border: 2px solid #002060;
            padding: 2px;
          }
          .school-hindi {
            font-size: 20px;
            font-weight: 900;
            color: #002060;
            margin: 0;
            font-family: 'Georgia', serif;
          }
          .school-eng {
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 1.5px;
            color: #92400e;
            text-transform: uppercase;
            margin: 3px 0;
          }
          .school-sub {
            font-size: 10px;
            color: #475569;
            margin: 0;
          }
          .badge {
            display: inline-block;
            background: #002060;
            color: #ffffff;
            padding: 4px 14px;
            font-size: 10px;
            font-weight: 800;
            border-radius: 20px;
            margin-top: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .doc-heading {
            font-size: 16px;
            font-weight: 900;
            color: #002060;
            text-align: center;
            margin: 18px 0 10px;
            text-transform: uppercase;
            font-family: 'Georgia', serif;
            border-bottom: 1px dashed #cbd5e1;
            padding-bottom: 8px;
          }
          .meta-table {
            width: 100%;
            border-collapse: collapse;
            margin: 16px 0;
            font-size: 12px;
          }
          .meta-table th, .meta-table td {
            border: 1px solid #cbd5e1;
            padding: 8px 12px;
            text-align: left;
          }
          .meta-table th {
            background: #f8fafc;
            color: #334155;
            font-weight: 700;
            width: 32%;
          }
          .meta-table td {
            color: #0f172a;
          }
          .desc-box {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            padding: 14px;
            border-radius: 8px;
            margin: 16px 0;
            font-size: 12px;
            line-height: 1.6;
            color: #334155;
          }
          .signatures {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: 40px;
            padding-top: 15px;
            border-top: 1px solid #e2e8f0;
          }
          .sig-block {
            text-align: center;
            width: 180px;
          }
          .sig-line {
            border-top: 1px solid #0f172a;
            margin-bottom: 4px;
          }
          .seal-box {
            width: 70px;
            height: 70px;
            border: 2px dashed #002060;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: 8px;
            font-weight: 800;
            color: #002060;
            text-transform: uppercase;
            margin: 0 auto;
          }
          .footer-note {
            text-align: center;
            font-size: 9px;
            color: #64748b;
            margin-top: 24px;
            border-top: 1px dashed #cbd5e1;
            padding-top: 8px;
          }
        </style>
      </head>
      <body>
        <div class="certificate-container">
          <div class="gold-inner-border">
            <div class="header">
              <img src="/logo.png" alt="SGM Logo" class="logo" />
              <h1 class="school-hindi">सरस्वती ज्ञान मन्दिर इण्टर कॉलेज</h1>
              <div class="school-eng">SARSWATI GYAN MANDIR INTERMEDIATE COLLEGE</div>
              <div class="school-sub">SHAMSABAD, FARRUKHABAD, UTTAR PRADESH &bull; PIN: 209503</div>
              <div class="badge">AFFILIATION CODE: UP-FBD-2026-SGM-089 &bull; UP BOARD PRAYAGRAJ</div>
            </div>

            <div class="doc-heading">${doc.title}</div>

            <table class="meta-table">
              <tr>
                <th>Document Classification:</th>
                <td><strong>${doc.categoryLabel}</strong></td>
              </tr>
              <tr>
                <th>Official Document Reference:</th>
                <td><span style="font-family: monospace; font-weight: bold; color: #002060;">${doc.docCode}</span></td>
              </tr>
              <tr>
                <th>Issuing / Regulating Body:</th>
                <td>${doc.authority}</td>
              </tr>
              <tr>
                <th>Validity & Standing:</th>
                <td><span style="color: #047857; font-weight: bold;">&#10003; ${doc.updatedDate} (Verified Authentic)</span></td>
              </tr>
              <tr>
                <th>File Format & Archive Size:</th>
                <td>${doc.format} Document (${doc.fileSize})</td>
              </tr>
            </table>

            <div class="desc-box">
              <strong>Official Record Summary &amp; Legal Declaration:</strong><br />
              ${doc.description}
            </div>

            <div class="signatures" style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 35px; padding-top: 15px; border-top: 1px solid #cbd5e1;">
              <div class="sig-block" style="text-align: center; width: 140px;">
                <img src="/images/stamps/school-seal.png" alt="SGM Institutional Seal" style="width: 100px; height: 100px; object-fit: contain; transform: rotate(-5deg); display: block; margin: 0 auto;" />
                <div style="font-size: 10px; color: #002060; font-weight: 800; margin-top: 2px; text-transform: uppercase; letter-spacing: 0.5px;">Institutional Emblem</div>
              </div>
              <div class="sig-block" style="text-align: center; width: 140px;">
                <img src="/images/stamps/principal-round-seal.png" alt="Principal SGM Seal" style="width: 95px; height: 95px; object-fit: contain; transform: rotate(3deg); display: block; margin: 0 auto;" />
                <div style="font-size: 10px; color: #002060; font-weight: 800; margin-top: 2px; text-transform: uppercase;">Principal &amp; Center Seal</div>
              </div>
              <div class="sig-block" style="text-align: center; width: 210px;">
                <img src="/images/stamps/principal-signature.png" alt="Principal Signature & School Name" style="width: 190px; height: 100px; object-fit: contain; display: block; margin: 0 auto;" />
              </div>
            </div>

            <div class="footer-note">
              This document is officially published and electronically verified from the central institutional portal.<br />
              Sarswati Gyan Mandir Intermediate College, Shamsabad, Farrukhabad (UP) &bull; https://cru-pi.vercel.app/downloads
            </div>
          </div>
        </div>
        <script>
          setTimeout(() => {
            window.print();
          }, 300);
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    toast.success(`Prepared official PDF for "${doc.title}". Select "Save as PDF" in print dialog.`, 'PDF Ready');
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
            Access statutory UP Board affiliation certificates, fire safety NOCs, class syllabi, academic calendars, fee schedules, and printable student admission forms in official stamped PDF format.
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
                  className="flex-1 bg-[#002060] hover:bg-blue-900 font-bold text-xs shadow-md"
                  onClick={() => handlePrintPdf(doc)}
                  leftIcon={<Download className="w-3.5 h-3.5 text-amber-400" />}
                >
                  Download Official PDF
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

      {/* Document View & PDF Preview Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col p-6 shadow-2xl border-2 border-slate-900 animate-in zoom-in-95 duration-200 my-auto overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-shrink-0">
              <span className="text-xs font-black uppercase tracking-wider text-blue-700 font-mono">
                INSTITUTIONAL PDF PREVIEW &bull; OFFICIAL STAMPED
              </span>
              <button
                onClick={() => setSelectedDoc(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 py-4 space-y-4 text-xs">
              {/* Formatted Certificate Box */}
              <div className="border-2 border-[#002060] p-5 rounded-2xl bg-white space-y-4 shadow-sm">
                <div className="text-center border-b-2 border-[#002060] pb-3 space-y-1">
                  <div className="w-14 h-14 mx-auto rounded-full overflow-hidden border-2 border-[#002060] p-0.5 bg-white shadow">
                    <img src="/logo.png" alt="SGM Logo" className="w-full h-full object-contain" />
                  </div>
                  <h3 className="font-serif font-black text-base text-[#002060]">सरस्वती ज्ञान मन्दिर इण्टर कॉलेज</h3>
                  <p className="text-[10px] uppercase tracking-wider font-extrabold text-amber-700">
                    SARSWATI GYAN MANDIR INTERMEDIATE COLLEGE &bull; SHAMSABAD (FBD)
                  </p>
                  <span className="inline-block bg-[#002060] text-white text-[9px] font-black px-3 py-0.5 rounded-full uppercase">
                    UP BOARD AFFILIATION CODE: UP-FBD-2026-SGM-089
                  </span>
                </div>

                <div className="text-center font-serif font-black text-sm text-slate-900 uppercase border-b border-dashed border-slate-300 pb-2">
                  {selectedDoc.title}
                </div>

                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px]">Reference Code:</span>
                    <p className="font-mono font-bold text-blue-700">{selectedDoc.docCode}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">Classification:</span>
                    <p className="font-bold text-slate-800">{selectedDoc.categoryLabel}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">Issuing Authority:</span>
                    <p className="font-semibold text-slate-800 truncate">{selectedDoc.authority}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">Status:</span>
                    <p className="font-bold text-emerald-700">&#10003; {selectedDoc.updatedDate}</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-700 text-xs leading-relaxed">
                  <strong>Regulatory Summary:</strong><br />
                  {selectedDoc.description}
                </div>

                <div className="pt-4 flex items-end justify-between border-t border-slate-200 text-xs">
                  {/* School Seal */}
                  <div className="text-center">
                    <img
                      src="/images/stamps/school-seal.png"
                      alt="School Seal"
                      className="w-16 h-16 object-contain transform -rotate-6 mx-auto drop-shadow-sm"
                    />
                    <span className="text-[10px] font-black text-[#002060] block mt-1 uppercase tracking-tight">
                      Official Seal
                    </span>
                  </div>

                  {/* Principal Round Seal with School Name */}
                  <div className="text-center hidden sm:block">
                    <img
                      src="/images/stamps/principal-round-seal.png"
                      alt="Principal Round Seal"
                      className="w-16 h-16 object-contain transform rotate-2 mx-auto drop-shadow-sm"
                    />
                    <span className="text-[9px] font-black text-[#002060] block mt-0.5 uppercase">
                      Principal Seal
                    </span>
                  </div>

                  {/* Principal Sig */}
                  <div className="text-center">
                    <img
                      src="/images/stamps/principal-signature.png"
                      alt="Principal Signature"
                      className="w-28 h-14 object-contain mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-slate-200 flex-shrink-0">
              <Button
                className="w-full bg-[#002060] hover:bg-blue-900 font-bold text-xs"
                onClick={() => {
                  const current = selectedDoc;
                  setSelectedDoc(null);
                  handlePrintPdf(current);
                }}
                leftIcon={<Printer className="w-4 h-4 text-amber-400" />}
              >
                Download / Save Official PDF
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
