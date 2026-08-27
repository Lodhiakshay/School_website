'use client';

import React, { useState } from 'react';
import {
  FileCheck2,
  Printer,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Search,
  X,
  FileText,
  Download,
  Loader2,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { useToast } from '../../../components/ui/toast';
import { downloadElementAsPdf, printIsolatedDocument } from '../../../lib/pdf-download';

const fallbackCertificates = [
  {
    _id: 'cert_01',
    certificateNumber: 'TC-2026-089-012',
    studentName: 'Aarav Sharma',
    admissionNumber: 'SGM-2026-1001',
    fatherName: 'Shri Rajesh Sharma',
    className: 'Class 10 (Section A)',
    type: 'Transfer Certificate (TC)',
    issueDate: '24 Aug 2026',
    character: 'Exemplary & Diligent',
    status: 'Issued & Stamped',
  },
  {
    _id: 'cert_02',
    certificateNumber: 'CC-2026-089-045',
    studentName: 'Sneha Tripathi',
    admissionNumber: 'SGM-2026-1202',
    fatherName: 'Dr. Alok Tripathi',
    className: 'Class 12 (Science PCB)',
    type: 'Character Certificate',
    issueDate: '22 Aug 2026',
    character: 'Outstanding Moral Standing',
    status: 'Issued & Stamped',
  },
  {
    _id: 'cert_03',
    certificateNumber: 'BF-2026-089-108',
    studentName: 'Divyanshu Singh',
    admissionNumber: 'SGM-2026-1003',
    fatherName: 'Shri Ram Singh',
    className: 'Class 10 (Section A)',
    type: 'Bonafide Certificate',
    issueDate: '20 Aug 2026',
    character: 'Regular Bonafide Student',
    status: 'Issued & Stamped',
  },
  {
    _id: 'cert_04',
    certificateNumber: 'MC-2026-089-009',
    studentName: 'Rohan Sharma',
    admissionNumber: 'SGM-2026-1201',
    fatherName: 'Shri Devendra Sharma',
    className: 'Class 12 (Science PCM)',
    type: 'Migration Certificate',
    issueDate: '18 Aug 2026',
    character: 'Good Conduct',
    status: 'Issued & Stamped',
  },
];

export default function CertificatesAdminPage() {
  const [certs, setCerts] = useState(fallbackCertificates);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCert, setActiveCert] = useState<any | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownloadCertPdf = async () => {
    if (!activeCert) return;
    setIsDownloading(true);
    toast.success(`Exporting Certificate PDF for ${activeCert.studentName}...`, 'Preparing Download');
    try {
      const fileName = `Certificate_${activeCert.certificateNumber}_${activeCert.studentName.replace(/\s+/g, '_')}.pdf`;
      const ok = await downloadElementAsPdf('certificate-preview-inner', fileName);
      if (ok) {
        toast.success(`Downloaded ${fileName} successfully!`, 'Certificate Downloaded');
      } else {
        printIsolatedDocument('certificate-preview-inner');
      }
    } catch {
      printIsolatedDocument('certificate-preview-inner');
    } finally {
      setIsDownloading(false);
    }
  };

  const [newCert, setNewCert] = useState({
    studentName: '',
    admissionNumber: '',
    fatherName: '',
    className: 'Class 10 (Section A)',
    type: 'Transfer Certificate (TC)',
  });

  const handleCreateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      _id: 'cert_' + Date.now(),
      certificateNumber: `TC-2026-089-${Math.floor(100 + Math.random() * 900)}`,
      studentName: newCert.studentName,
      admissionNumber: newCert.admissionNumber || `SGM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      fatherName: newCert.fatherName,
      className: newCert.className,
      type: newCert.type,
      issueDate: 'Today, 2026',
      character: 'Good Moral Conduct',
      status: 'Issued & Stamped',
    };
    setCerts([created, ...certs]);
    setShowCreateModal(false);
    toast.success(`Generated ${created.type} for ${created.studentName}!`, 'Certificate Issued');
  };

  const filteredCerts = certs.filter(
    (c) =>
      c.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Principal']}>
      <div className="space-y-6 pt-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <FileCheck2 className="w-5 h-5 text-blue-600" /> Certificates &amp; Attestation Desk
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Generate, verify, and print official Transfer Certificates (TC), Character Certificates, and Bonafide Letters.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.print();
                toast.success('Generated printable Certificate Registry.', 'Print Ready');
              }}
              leftIcon={<Printer className="w-4 h-4 text-slate-600" />}
            >
              Print Registry
            </Button>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 font-bold"
              onClick={() => setShowCreateModal(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Issue Certificate
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search student, certificate serial, or admission ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        {/* Mobile Scroll Hint */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 sm:hidden px-1">
          <span>👉 Swipe table sideways to inspect serials &amp; actions</span>
        </div>

        {/* Table */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-extrabold tracking-wider text-[10px]">
                  <tr>
                    <th className="px-4 py-3.5">Certificate Serial</th>
                    <th className="px-4 py-3.5">Student Name</th>
                    <th className="px-4 py-3.5">Admission No</th>
                    <th className="px-4 py-3.5">Document Type</th>
                    <th className="px-4 py-3.5">Issued Date</th>
                    <th className="px-4 py-3.5">Attestation Status</th>
                    <th className="px-4 py-3.5 text-right">Official Document</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredCerts.map((c) => (
                    <tr key={c._id} className="hover:bg-slate-50/80 transition">
                      <td className="px-4 py-3 font-mono font-bold text-blue-700 whitespace-nowrap">
                        {c.certificateNumber}
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-900 whitespace-nowrap">{c.studentName}</td>
                      <td className="px-4 py-3 font-mono whitespace-nowrap">{c.admissionNumber}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="bg-blue-50 text-blue-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-blue-200">
                          {c.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-mono">{c.issueDate}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-200">
                          {c.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <Button
                          size="sm"
                          variant="outline"
                          leftIcon={<Printer className="w-3.5 h-3.5 text-slate-600" />}
                          onClick={() => setActiveCert(c)}
                        >
                          Print Attestation
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Printable Certificate Modal (Scroll-Safe & Bounded) */}
      {activeCert && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col p-5 sm:p-6 shadow-2xl border-2 border-slate-900 animate-in zoom-in-95 duration-200 my-auto overflow-hidden">
            {/* Pinned Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-shrink-0">
              <span className="text-xs font-black uppercase tracking-wider text-blue-700 font-mono">
                OFFICIAL ATTESTED CERTIFICATE
              </span>
              <button
                onClick={() => setActiveCert(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Inner Certificate Body */}
            <div className="overflow-y-auto flex-1 py-4 space-y-4">
              <div id="certificate-preview-inner" className="printable-document p-6 sm:p-8 bg-amber-50/40 border-4 border-double border-amber-900/50 rounded-2xl space-y-5 text-slate-900 text-xs shadow-inner font-serif">
                <div className="flex items-center justify-between border-b-2 border-amber-900/40 pb-3">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-900 bg-white shadow-md flex-shrink-0">
                    <img src="/logo.png" alt="SGM Crest" className="w-full h-full object-contain p-0.5" />
                  </div>
                  <div className="text-center flex-1 px-3">
                    <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-amber-950 font-serif">
                      सरस्वती ज्ञान मन्दिर इण्टर कॉलेज
                    </h2>
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-900">
                      SARSWATI GYAN MANDIR INTERMEDIATE COLLEGE
                    </p>
                    <p className="text-[10px] text-amber-800 font-medium">
                      SHAMSABAD, FARRUKHABAD (UP) &bull; UP-FBD-2026-SGM-089
                    </p>
                    <div className="mt-2 inline-block bg-amber-950 text-amber-50 px-4 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest font-sans">
                      {activeCert.type.toUpperCase()}
                    </div>
                  </div>
                  <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center border border-amber-800/40 rounded-xl text-[9px] text-amber-900 font-bold text-center p-1 bg-amber-100/50">
                    Seal
                  </div>
                </div>

                <div className="flex justify-between text-[11px] font-mono text-amber-950 border-b border-amber-300 pb-1.5">
                  <span>Certificate Serial: <strong>{activeCert.certificateNumber}</strong></span>
                  <span>Issue Date: <strong>{activeCert.issueDate}</strong></span>
                </div>

                <div className="space-y-3 text-xs leading-relaxed text-slate-800">
                  <p>
                    This is to certify that <strong>{activeCert.studentName}</strong>, Admission No: <strong className="font-mono text-blue-900">{activeCert.admissionNumber}</strong>, son/daughter of <strong>{activeCert.fatherName}</strong>, has been a bona fide student of Saraswati Gyan Mandir Intermediate College, Shamsabad, Farrukhabad.
                  </p>
                  <p>
                    During the academic session 2026-2027, the student attended <strong>{activeCert.className}</strong> with diligence, exemplary moral character, and satisfactory academic progress.
                  </p>
                  <p>
                    All institutional fee installments and library books up to the date of issue have been fully cleared and accounted for.
                  </p>
                </div>

                <div className="pt-8 flex items-center justify-between text-xs text-slate-800 font-sans">
                  <div className="text-center">
                    <div className="w-32 border-b border-slate-600 mb-1 mx-auto"></div>
                    <span className="text-[10px] font-bold text-slate-600">Prepared By (Clerk)</span>
                  </div>
                  <div className="text-center">
                    <div className="w-32 border-b border-slate-600 mb-1 mx-auto"></div>
                    <span className="text-[10px] font-bold text-slate-900">Principal &amp; Official Seal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pinned Action Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap gap-2 pt-3 border-t border-slate-200 flex-shrink-0">
              <Button
                type="button"
                className="w-full sm:w-auto flex-1 bg-emerald-600 hover:bg-emerald-700 font-bold text-xs shadow-md"
                onClick={handleDownloadCertPdf}
                disabled={isDownloading}
                leftIcon={isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              >
                {isDownloading ? 'Exporting PDF...' : 'Download PDF Certificate'}
              </Button>
              <Button
                type="button"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 font-bold text-xs"
                onClick={() => {
                  printIsolatedDocument('certificate-preview-inner');
                  toast.success('Sent Certificate to printer.', 'Print Isolated');
                }}
                leftIcon={<Printer className="w-4 h-4" />}
              >
                Print
              </Button>
              <Button type="button" variant="outline" onClick={() => setActiveCert(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Generate Certificate Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" /> Issue Attested Certificate
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCertificate} className="space-y-3 text-xs">
              <Input
                label="Student Full Name *"
                required
                placeholder="e.g. Aarav Sharma"
                value={newCert.studentName}
                onChange={(e) => setNewCert({ ...newCert, studentName: e.target.value })}
              />

              <Input
                label="Admission Number"
                placeholder="e.g. SGM-2026-1001"
                value={newCert.admissionNumber}
                onChange={(e) => setNewCert({ ...newCert, admissionNumber: e.target.value })}
              />

              <Input
                label="Father / Guardian Name *"
                required
                placeholder="e.g. Shri Rajesh Sharma"
                value={newCert.fatherName}
                onChange={(e) => setNewCert({ ...newCert, fatherName: e.target.value })}
              />

              <div>
                <label className="block font-bold text-slate-700 mb-1">Certificate Type</label>
                <select
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={newCert.type}
                  onChange={(e) => setNewCert({ ...newCert, type: e.target.value })}
                >
                  <option value="Transfer Certificate (TC)">Transfer Certificate (TC)</option>
                  <option value="Character Certificate">Character Certificate</option>
                  <option value="Bonafide Certificate">Bonafide Certificate</option>
                  <option value="Migration Certificate">Migration Certificate</option>
                </select>
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 font-bold">
                  Generate Certificate
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
