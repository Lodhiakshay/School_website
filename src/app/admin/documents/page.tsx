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
  Eye,
  EyeOff,
  Edit,
  Trash2,
  ExternalLink,
  Check,
  Globe,
  Lock,
  RefreshCw,
  Award,
  BookOpen,
  FileCheck2,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Modal } from '../../../components/ui/modal';
import { useToast } from '../../../components/ui/toast';
import { apiClient } from '../../../lib/api-client';
import { ConfirmDialog } from '../../../components/ui/confirm-dialog';

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All Categories' },
  { value: 'disclosure', label: '🏛️ Statutory Disclosures & NOCs' },
  { value: 'syllabus', label: '📚 Curricula & Board Syllabi' },
  { value: 'calendar', label: '📅 Academic Calendars & Holidays' },
  { value: 'date_sheet', label: '📊 Examination Date Sheets' },
  { value: 'forms', label: '📝 Admission & TC Proformas' },
  { value: 'circular', label: '📢 Official Circulars & Notices' },
  { value: 'general', label: '📁 General Documents' },
];

export default function DocumentsAdminPage() {
  const { toast } = useToast();
  const [docs, setDocs] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({
    total: 0,
    active: 0,
    isPublic: 0,
    disclosures: 0,
    syllabi: 0,
    calendars: 0,
    forms: 0,
    totalDownloads: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [publicFilter, setPublicFilter] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'disclosure',
    docCode: '',
    authority: '',
    fileUrl: '',
    fileName: 'Document.pdf',
    fileSize: '1.5 MB',
    format: 'PDF',
    academicYear: '2026-2027',
    isPublic: true,
    isFeatured: false,
    isActive: true,
    displayOrder: 0,
  });

  const fetchDocuments = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get('/documents', {
        params: {
          search: searchQuery || undefined,
          category: categoryFilter !== 'all' ? categoryFilter : undefined,
          isPublic: publicFilter !== 'all' ? publicFilter : undefined,
        },
      });
      if (res.data?.data) {
        setDocs(res.data.data);
      }
      if (res.data?.meta?.stats) {
        setStats(res.data.meta.stats);
      }
    } catch {
      toast.error('Failed to load documents vault.', 'Load Error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [categoryFilter, publicFilter]);

  const openCreateModal = () => {
    setEditingDoc(null);
    setFormData({
      title: '',
      description: '',
      category: 'disclosure',
      docCode: `DOC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      authority: 'Office of the Principal, Sarswati Gyan Mandir',
      fileUrl: '/uploads/documents/Official_Document.pdf',
      fileName: 'Official_Document.pdf',
      fileSize: '1.2 MB',
      format: 'PDF',
      academicYear: '2026-2027',
      isPublic: true,
      isFeatured: false,
      isActive: true,
      displayOrder: docs.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (doc: any) => {
    setEditingDoc(doc);
    setFormData({
      title: doc.title || '',
      description: doc.description || '',
      category: doc.category || 'disclosure',
      docCode: doc.docCode || '',
      authority: doc.authority || '',
      fileUrl: doc.fileUrl || '',
      fileName: doc.fileName || 'Document.pdf',
      fileSize: doc.fileSize || '1.2 MB',
      format: doc.format || 'PDF',
      academicYear: doc.academicYear || '2026-2027',
      isPublic: doc.isPublic !== undefined ? doc.isPublic : true,
      isFeatured: doc.isFeatured || false,
      isActive: doc.isActive !== undefined ? doc.isActive : true,
      displayOrder: doc.displayOrder || 0,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.fileUrl) {
      toast.error('Title and File URL are required.', 'Validation Error');
      return;
    }

    setIsSaving(true);
    try {
      if (editingDoc) {
        const res = await apiClient.put(`/documents/${editingDoc._id}`, formData);
        toast.success(`Updated "${formData.title}"`, 'Document Updated');
        setDocs((prev) => prev.map((d) => (d._id === editingDoc._id ? res.data.data : d)));
      } else {
        const res = await apiClient.post('/documents', formData);
        toast.success(`Published "${formData.title}" to vault`, 'Document Published');
        setDocs((prev) => [res.data.data, ...prev]);
        setStats((prev: any) => ({ ...prev, total: prev.total + 1 }));
      }
      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to save document.', 'Save Error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTogglePublic = async (id: string, currentPublic: boolean, title: string) => {
    try {
      await apiClient.patch(`/documents/${id}/toggle-public`);
      setDocs((prev) =>
        prev.map((d) => (d._id === id ? { ...d, isPublic: !currentPublic } : d))
      );
      toast.success(
        `"${title}" is now ${!currentPublic ? 'Publicly Visible on Downloads Hub' : 'Restricted to Admin Only'}`,
        'Access Changed'
      );
    } catch {
      toast.error('Failed to change access level.', 'Error');
    }
  };

  const [deletingDoc, setDeletingDoc] = useState<{ id: string; title: string } | null>(null);
  const [isDeletingDoc, setIsDeletingDoc] = useState(false);

  const handleDelete = (id: string, title: string) => {
    setDeletingDoc({ id, title });
  };

  const handleConfirmDeleteDoc = async () => {
    if (!deletingDoc) return;
    setIsDeletingDoc(true);
    try {
      await apiClient.delete(`/documents/${deletingDoc.id}`);
      setDocs((prev) => prev.filter((d) => String(d._id) !== String(deletingDoc.id)));
      toast.success(`"${deletingDoc.title}" removed from vault.`, 'Deleted');
      setStats((prev: any) => ({ ...prev, total: Math.max(0, prev.total - 1) }));
    } catch {
      toast.error('Failed to delete document.', 'Delete Error');
    } finally {
      setIsDeletingDoc(false);
      setDeletingDoc(null);
    }
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'disclosure':
        return <Badge variant="warning">🏛️ Statutory Disclosure</Badge>;
      case 'syllabus':
        return <Badge variant="info">📚 Board Syllabus</Badge>;
      case 'calendar':
        return <Badge variant="purple">📅 Academic Calendar</Badge>;
      case 'date_sheet':
        return <Badge variant="danger">📊 Exam Date Sheet</Badge>;
      case 'forms':
        return <Badge variant="success">📝 Admission Proforma</Badge>;
      case 'circular':
        return <Badge variant="default">📢 Official Circular</Badge>;
      default:
        return <Badge variant="outline">📁 General</Badge>;
    }
  };

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Principal', 'Teacher', 'Accountant']}>
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-1 border border-blue-200">
              <Sparkles className="w-3.5 h-3.5" /> Institutional Repository &bull; Compliance &amp; Syllabi Vault
            </div>
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 font-serif">
              Document Vault &amp; Public Downloads Hub
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Upload statutory affiliation orders, fire safety NOCs, board examination syllabi, academic holiday calendars, and admission proformas.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchDocuments}
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Refresh
            </Button>
            <Button
              size="sm"
              onClick={openCreateModal}
              leftIcon={<Plus className="w-4 h-4" />}
              className="bg-blue-600 hover:bg-blue-700 font-bold"
            >
              Upload Document / Circular
            </Button>
          </div>
        </div>

        {/* Telemetry KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Documents</span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">{stats.total || docs.length}</span>
            <span className="text-[10px] text-slate-400 block">All Files in Vault</span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-amber-800 block">Statutory Disclosures</span>
            <span className="text-xl sm:text-2xl font-black text-amber-950 font-mono">{stats.disclosures || 0}</span>
            <span className="text-[10px] text-amber-700 block">NOCs &amp; Affiliation</span>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-blue-800 block">Board Syllabi</span>
            <span className="text-xl sm:text-2xl font-black text-blue-950 font-mono">{stats.syllabi || 0}</span>
            <span className="text-[10px] text-blue-700 block">NCERT &amp; Exam Blueprints</span>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-purple-800 block">Calendars &amp; Dates</span>
            <span className="text-xl sm:text-2xl font-black text-purple-950 font-mono">{stats.calendars || 0}</span>
            <span className="text-[10px] text-purple-700 block">Routines &amp; Holidays</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 shadow-sm space-y-1 col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase font-bold text-emerald-800 block">Total Downloads</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-950 font-mono">{stats.totalDownloads || 0}</span>
            <span className="text-[10px] text-emerald-700 block">Public Download Clicks</span>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search by document title, code (e.g. UP-FBD-2026), authority..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchDocuments()}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                className="p-2 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:ring-2 focus:ring-blue-500"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <select
                className="p-2 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:ring-2 focus:ring-blue-500"
                value={publicFilter}
                onChange={(e) => setPublicFilter(e.target.value)}
              >
                <option value="all">All Access</option>
                <option value="true">Public (Downloads Hub)</option>
                <option value="false">Internal (Staff Only)</option>
              </select>

              <Button size="sm" onClick={fetchDocuments}>
                Filter
              </Button>
            </div>
          </div>
        </div>

        {/* Documents Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-700">
              Showing {docs.length} Official Repository Documents
            </span>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-slate-500 space-y-2">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-bold">Loading document vault...</p>
            </div>
          ) : docs.length === 0 ? (
            <div className="p-12 text-center text-slate-500 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <FolderLock className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-slate-700">No documents found in vault.</p>
              <p className="text-[11px] text-slate-400">Click &ldquo;Upload Document / Circular&rdquo; above to publish files.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-[11px] font-black uppercase text-slate-500 tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Document Title &amp; Authority</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Doc Code</th>
                    <th className="py-3.5 px-4">Format / Size</th>
                    <th className="py-3.5 px-4">Public Status</th>
                    <th className="py-3.5 px-4">Downloads</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {docs.map((doc) => (
                    <tr key={doc._id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4 max-w-sm">
                        <div className="flex items-start gap-2.5">
                          <div className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex-shrink-0 mt-0.5">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block text-xs">{doc.title}</span>
                            {doc.authority && (
                              <span className="text-[10px] text-slate-500 block">{doc.authority}</span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">{getCategoryBadge(doc.category)}</td>

                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200 text-[11px]">
                          {doc.docCode || 'N/A'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-800 block text-xs">{doc.format || 'PDF'}</span>
                        <span className="text-[10px] text-slate-400">{doc.fileSize || '1.2 MB'}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <button
                          type="button"
                          onClick={() => handleTogglePublic(doc._id, doc.isPublic, doc.title)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition flex items-center gap-1 ${
                            doc.isPublic ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                          }`}
                          title="Click to toggle public downloads hub visibility"
                        >
                          {doc.isPublic ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                          {doc.isPublic ? 'Public' : 'Internal'}
                        </button>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-slate-800 flex items-center gap-1">
                          <Download className="w-3 h-3 text-slate-400" /> {doc.downloadCount || 0}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={doc.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                            title="Preview File"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <button
                            type="button"
                            onClick={() => openEditModal(doc)}
                            className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 transition"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(doc._id, doc.title)}
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ADD / EDIT DOCUMENT MODAL                                                 */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingDoc ? `Edit: ${editingDoc.title}` : 'Publish New Official Document'}
        description="Upload official statutory clearances, board syllabi, date-sheets, or admission forms to the repository."
        maxWidth="xl"
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <Input
            label="Document Title *"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. UP Board Recognition & Permanent Affiliation Order"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Document Category *</label>
              <select
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:ring-2 focus:ring-blue-500"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="disclosure">🏛️ Statutory Disclosures &amp; NOCs</option>
                <option value="syllabus">📚 Curricula &amp; Board Syllabi</option>
                <option value="calendar">📅 Academic Calendars &amp; Holidays</option>
                <option value="date_sheet">📊 Examination Date Sheets</option>
                <option value="forms">📝 Admission &amp; TC Proformas</option>
                <option value="circular">📢 Official Circulars &amp; Notices</option>
                <option value="general">📁 General Documents</option>
              </select>
            </div>

            <Input
              label="Issuing Authority"
              value={formData.authority}
              onChange={(e) => setFormData({ ...formData, authority: e.target.value })}
              placeholder="e.g. Board of High School & Intermediate Education UP"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Document Verification Code"
              value={formData.docCode}
              onChange={(e) => setFormData({ ...formData, docCode: e.target.value })}
              placeholder="e.g. UP-FBD-2026-SGM-089"
            />

            <Input
              label="Academic Session Year"
              value={formData.academicYear}
              onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
              placeholder="2026-2027"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <Input
                label="File URL / Download Link Path *"
                value={formData.fileUrl}
                onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                placeholder="/uploads/documents/filename.pdf or https://..."
                required
              />
            </div>
            <Input
              label="File Size"
              value={formData.fileSize}
              onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
              placeholder="2.4 MB"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Document Summary / Legal Context
            </label>
            <textarea
              rows={2}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500"
              placeholder="Provide a brief summary of the order, applicability, validity period, and directives..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Visibility Switches */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 block">Public Downloads Hub Visibility</span>
              <span className="text-[10px] text-slate-400">Make this document available for public download on /downloads</span>
            </div>
            <input
              type="checkbox"
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              checked={formData.isPublic}
              onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 font-bold"
              isLoading={isSaving}
              leftIcon={<Check className="w-4 h-4" />}
            >
              {editingDoc ? 'Save Changes' : 'Publish Document'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Production Grade Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deletingDoc)}
        onClose={() => !isDeletingDoc && setDeletingDoc(null)}
        onConfirm={handleConfirmDeleteDoc}
        title="Delete Institutional Document"
        description="Are you sure you want to permanently remove this document from the official document vault? It will no longer be available for download."
        itemName={deletingDoc?.title}
        confirmText="Yes, Delete Document"
        cancelText="Keep Document"
        isLoading={isDeletingDoc}
        variant="danger"
      />
    </PortalLayout>
  );
}
