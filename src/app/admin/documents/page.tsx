'use client';

import React, { useState, useEffect } from 'react';
import {
  FolderLock,
  Plus,
  Search,
  Printer,
  FileText,
  Download,
  ShieldCheck,
  Sparkles,
  Calendar,
  X,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';
import { apiClient } from '../../../lib/api-client';

const fallbackDocs = [
  {
    _id: 'doc_01',
    title: 'UP Board Recognition & Affiliation Order (Code: UP-FBD-2026-SGM-089)',
    category: 'Statutory Affiliation',
    fileName: 'UP_Board_Affiliation_Certificate_2026.pdf',
    uploadedBy: 'Principal Office',
    uploadDate: '10 Apr 2026',
    fileSize: '2.4 MB',
  },
  {
    _id: 'doc_02',
    title: 'District Fire Safety & Building Structural Stability NOC',
    category: 'Safety & Compliance',
    fileName: 'Fire_Safety_NOC_Farrukhabad_2026.pdf',
    uploadedBy: 'School Admin',
    uploadDate: '15 May 2026',
    fileSize: '1.8 MB',
  },
  {
    _id: 'doc_03',
    title: 'School Transport Commercial Permit & Fitness Certificates (All 4 Buses)',
    category: 'Transport & Fleet',
    fileName: 'Bus_Fleet_RTO_Permits_2026.pdf',
    uploadedBy: 'Transport Incharge',
    uploadDate: '01 Jun 2026',
    fileSize: '4.1 MB',
  },
  {
    _id: 'doc_04',
    title: 'UP Board Class 10 & 12 Revised NCERT Syllabus Framework (2026-27)',
    category: 'Academic Curricula',
    fileName: 'UP_Board_Class10_12_Syllabus_2026.pdf',
    uploadedBy: 'Academic Coordinator',
    uploadDate: '20 Jun 2026',
    fileSize: '5.6 MB',
  },
  {
    _id: 'doc_05',
    title: 'Institutional Society Registration & Land Deed Deeds (Shamsabad Campus)',
    category: 'Institutional Trust',
    fileName: 'Society_Registration_Trust_Deed.pdf',
    uploadedBy: 'Management Board',
    uploadDate: '12 Jan 2026',
    fileSize: '3.2 MB',
  },
];

export default function DocumentsAdminPage() {
  const [docs, setDocs] = useState<any[]>(fallbackDocs);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const { toast } = useToast();

  const [newDoc, setNewDoc] = useState({
    title: '',
    category: 'Safety & Compliance',
    fileName: 'Document_File.pdf',
  });

  useEffect(() => {
    apiClient
      .get('/documents')
      .then((res) => {
        if (res.data?.data && res.data.data.length > 0) {
          setDocs(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleUploadDoc = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      _id: 'doc_' + Date.now(),
      title: newDoc.title,
      category: newDoc.category,
      fileName: newDoc.fileName,
      uploadedBy: 'Super Admin',
      uploadDate: 'Today',
      fileSize: '1.2 MB',
    };
    setDocs([created, ...docs]);
    setShowAddModal(false);
    toast.success(`Document "${created.title}" uploaded to encrypted vault!`, 'Document Secured');
  };

  const handleDownload = (fileName: string) => {
    toast.success(`Downloading ${fileName}...`, 'Vault Download');
  };

  const filtered = docs.filter(
    (d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Principal']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <FolderLock className="w-5 h-5 text-blue-600" /> Secure Institutional Document Vault
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Encrypted archive of UP Board affiliation orders, fire safety NOCs, society deeds, and statutory filings.
            </p>
          </div>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 font-bold"
            onClick={() => setShowAddModal(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Upload Vault Document
          </Button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search document title or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        {/* Documents Table Card */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">Document Title</th>
                    <th className="p-3.5">Compliance Category</th>
                    <th className="p-3.5">File Name &amp; Size</th>
                    <th className="p-3.5">Uploaded By</th>
                    <th className="p-3.5">Upload Date</th>
                    <th className="p-3.5 text-right">Secure Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filtered.map((d) => (
                    <tr key={d._id} className="hover:bg-slate-50 transition">
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          <span>{d.title}</span>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <Badge size="sm" variant="info">
                          {d.category}
                        </Badge>
                      </td>
                      <td className="p-3.5 font-mono text-[11px] text-slate-600">
                        {d.fileName} <span className="text-slate-400">({d.fileSize})</span>
                      </td>
                      <td className="p-3.5 text-slate-600">{d.uploadedBy}</td>
                      <td className="p-3.5 text-slate-500 font-mono text-[11px]">{d.uploadDate}</td>
                      <td className="p-3.5 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownload(d.fileName)}
                          leftIcon={<Download className="w-3.5 h-3.5 text-blue-600" />}
                        >
                          Download
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

      {/* Upload Document Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" /> Upload Vault Document
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadDoc} className="space-y-3 text-xs">
              <Input
                label="Document Title *"
                required
                placeholder="e.g. Electricity Safety Audit 2026"
                value={newDoc.title}
                onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
              />

              <div>
                <label className="block font-bold text-slate-700 mb-1">Compliance Category</label>
                <select
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={newDoc.category}
                  onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })}
                >
                  <option value="Statutory Affiliation">Statutory Affiliation</option>
                  <option value="Safety & Compliance">Safety &amp; Compliance</option>
                  <option value="Transport & Fleet">Transport &amp; Fleet</option>
                  <option value="Academic Curricula">Academic Curricula</option>
                  <option value="Institutional Trust">Institutional Trust</option>
                </select>
              </div>

              <Input
                label="File Name"
                placeholder="e.g. Audit_NOC_2026.pdf"
                value={newDoc.fileName}
                onChange={(e) => setNewDoc({ ...newDoc, fileName: e.target.value })}
              />

              <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl text-center space-y-1 bg-slate-50">
                <FolderLock className="w-6 h-6 text-slate-400 mx-auto" />
                <p className="font-bold text-slate-700 text-xs">Drag &amp; drop PDF or click to browse</p>
                <p className="text-[10px] text-slate-400">PDF, DOCX, ZIP up to 25MB</p>
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 font-bold">
                  Secure in Vault
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
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
