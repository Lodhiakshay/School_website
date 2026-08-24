'use client';

import React, { useState, useEffect } from 'react';
import { FileCheck2, Printer, Plus, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Modal } from '../../../components/ui/modal';
import { LoadingSpinner } from '../../../components/ui/loading-spinner';
import { apiClient } from '../../../lib/api-client';
import { formatDate } from '../../../lib/utils';

export default function CertificatesAdminPage() {
  const [certs, setCerts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCert, setActiveCert] = useState<any>(null);
  const [showCertModal, setShowCertModal] = useState(false);

  useEffect(() => {
    apiClient.get('/certificates').then((res) => {
      setCerts(res.data?.data || []);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, []);

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Principal']}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FileCheck2 className="w-6 h-6 text-blue-600" /> Certificates &amp; Attestation Desk
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Generate and print verified Transfer Certificates (TC), Character Certificates, and Bonafide Letters.
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <LoadingSpinner label="Loading certificate registry..." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold tracking-wider">
                  <tr>
                    <th className="px-4 py-3.5">Certificate Serial</th>
                    <th className="px-4 py-3.5">Student Name</th>
                    <th className="px-4 py-3.5">Admission No</th>
                    <th className="px-4 py-3.5">Type</th>
                    <th className="px-4 py-3.5">Issued Date</th>
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {certs.map((c) => (
                    <tr key={c._id} className="hover:bg-slate-50/80">
                      <td className="px-4 py-3 font-mono font-bold text-blue-600">{c.certificateNumber}</td>
                      <td className="px-4 py-3 font-bold text-slate-900">{c.studentId?.firstName} {c.studentId?.lastName}</td>
                      <td className="px-4 py-3 font-mono">{c.studentId?.admissionNumber || 'SGM-2026-0001'}</td>
                      <td className="px-4 py-3">
                        <Badge size="sm" variant="purple">
                          {c.type}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">{formatDate(c.issueDate)}</td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          leftIcon={<Printer className="w-3.5 h-3.5" />}
                          onClick={() => {
                            setActiveCert(c);
                            setShowCertModal(true);
                          }}
                        >
                          Print Certificate
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Printable Certificate Modal with Official Crest Logo */}
      {activeCert && (
        <Modal isOpen={showCertModal} onClose={() => setShowCertModal(false)} title="Official Institutional Certificate" maxWidth="lg">
          <div className="p-8 bg-amber-50/40 border-4 border-double border-amber-900/50 rounded-3xl space-y-6 text-slate-900 text-xs shadow-md font-serif">
            <div className="flex items-center justify-between border-b-2 border-amber-900/40 pb-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-900 bg-white shadow-md flex-shrink-0">
                <img src="/logo.png" alt="SGM Logo" className="w-full h-full object-contain p-0.5" />
              </div>
              <div className="text-center flex-1 px-4">
                <h2 className="text-xl font-black tracking-wider uppercase text-amber-950">सरस्वती ज्ञान मन्दिर इण्टर कॉलेज</h2>
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-900">SARSWATI GYAN MANDIR INTERMEDIATE COLLEGE</h3>
                <p className="text-xs text-amber-900 font-bold">शमसाबाद, फर्रुखाबाद (उत्तर प्रदेश) • Affiliation No: UP-FBD-2026-SGM-089</p>
                <div className="mt-2 inline-block bg-amber-950 text-amber-50 px-5 py-1 rounded-full text-xs font-black uppercase tracking-widest font-sans">
                  {activeCert.type === 'transfer' ? 'TRANSFER CERTIFICATE (TC)' : activeCert.type === 'bonafide' ? 'BONAFIDE CERTIFICATE' : 'CHARACTER CERTIFICATE'}
                </div>
              </div>
              <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center border border-amber-800/40 rounded-xl text-[10px] text-amber-900 font-bold text-center p-1 bg-amber-100/50">
                Official Seal
              </div>
            </div>

            <div className="flex justify-between text-[11px] font-mono text-amber-950 border-b border-amber-300 pb-2">
              <span>Certificate Serial: <strong>{activeCert.certificateNumber}</strong></span>
              <span>Date of Issue: <strong>{formatDate(activeCert.issueDate)}</strong></span>
            </div>

            <div className="space-y-4 text-xs leading-relaxed text-slate-800">
              <p>
                This is to certify that <strong>{activeCert.studentId?.firstName} {activeCert.studentId?.lastName}</strong>, Admission No: <strong className="font-mono">{activeCert.studentId?.admissionNumber || 'SGM-2026-0001'}</strong>, son/daughter of <strong>{activeCert.studentId?.parentId?.fatherName || 'Rajesh Sharma'}</strong>, has been a bona fide student of Saraswati Gyan Mandir Intermediate College, Shamsabad, Farrukhabad.
              </p>
              <p>
                During the academic session 2026-2027, the student attended Class 10 with diligence, exemplary moral conduct, and satisfactory academic progress.
              </p>
              <p>
                All institutional dues up to the date of departure have been satisfactorily settled.
              </p>
            </div>

            <div className="pt-10 flex items-center justify-between text-xs text-slate-800 font-sans">
              <div className="text-center">
                <div className="w-36 border-b border-slate-600 mb-1"></div>
                <span>Prepared By (Clerk)</span>
              </div>
              <div className="text-center">
                <div className="w-36 border-b border-slate-600 mb-1"></div>
                <span className="font-bold">Principal &amp; Official Seal</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Button size="sm" variant="outline" onClick={() => setShowCertModal(false)}>Close</Button>
            <Button size="sm" variant="primary" leftIcon={<Printer className="w-4 h-4" />} onClick={() => window.print()}>Print Certificate</Button>
          </div>
        </Modal>
      )}
    </PortalLayout>
  );
}
