'use client';

import React, { useState, useEffect } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Search,
  Filter,
  Eye,
  EyeOff,
  Sparkles,
  Trash2,
  Edit,
  ExternalLink,
  Calendar,
  Tag,
  Check,
  Video,
  Grid,
  List,
  RefreshCw,
  Trophy,
  FlaskConical,
  Palette,
  Building,
  Baby,
  PartyPopper,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Modal } from '../../../components/ui/modal';
import { useToast } from '../../../components/ui/toast';
import { ImageUploader } from '../../../components/ui/image-uploader';
import { apiClient } from '../../../lib/api-client';
import { ConfirmDialog } from '../../../components/ui/confirm-dialog';

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All Categories', icon: Grid },
  { value: 'sports', label: 'Sports & Athletics', icon: Trophy },
  { value: 'academic', label: 'Science & Academics', icon: FlaskConical },
  { value: 'cultural', label: 'Cultural & National', icon: Palette },
  { value: 'campus', label: 'Campus & Facilities', icon: Building },
  { value: 'primary', label: 'Primary Wing (SSSD)', icon: Baby },
  { value: 'celebrations', label: 'Celebrations & Events', icon: PartyPopper },
];

export default function AdminGalleryPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({
    total: 0,
    active: 0,
    inactive: 0,
    featured: 0,
    sports: 0,
    academic: 0,
    cultural: 0,
    campus: 0,
    primary: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'campus',
    type: 'image',
    imageUrl: '',
    videoUrl: '',
    eventDate: new Date().toISOString().slice(0, 10),
    academicYear: '2026-2027',
    isFeatured: false,
    isActive: true,
    displayOrder: 0,
    tags: '',
  });

  const fetchGallery = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.get('/gallery/admin/list', {
        params: {
          search: searchQuery || undefined,
          category: categoryFilter !== 'all' ? categoryFilter : undefined,
          status: statusFilter !== 'all' ? statusFilter : undefined,
        },
      });
      if (res.data?.data) {
        setItems(res.data.data);
      }
      if (res.data?.meta?.stats) {
        setStats(res.data.meta.stats);
      }
    } catch {
      toast.error('Failed to load gallery albums from server.', 'Load Error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [categoryFilter, statusFilter]);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      category: 'campus',
      type: 'image',
      imageUrl: '',
      videoUrl: '',
      eventDate: new Date().toISOString().slice(0, 10),
      academicYear: '2026-2027',
      isFeatured: false,
      isActive: true,
      displayOrder: items.length + 1,
      tags: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      description: item.description || '',
      category: item.category || 'campus',
      type: item.type || 'image',
      imageUrl: item.imageUrl || '',
      videoUrl: item.videoUrl || '',
      eventDate: item.eventDate ? new Date(item.eventDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
      academicYear: item.academicYear || '2026-2027',
      isFeatured: item.isFeatured || false,
      isActive: item.isActive !== undefined ? item.isActive : true,
      displayOrder: item.displayOrder || 0,
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : '',
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      toast.error('Title is required for the album photo.', 'Validation Error');
      return;
    }
    if (formData.type === 'image' && !formData.imageUrl) {
      toast.error('Please upload or provide an image for this item.', 'Validation Error');
      return;
    }

    setIsSaving(true);
    try {
      const payload: any = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        type: formData.type,
        imageUrl: formData.imageUrl,
        videoUrl: formData.videoUrl,
        eventDate: new Date(formData.eventDate),
        academicYear: formData.academicYear,
        isFeatured: formData.isFeatured,
        isActive: formData.isActive,
        displayOrder: Number(formData.displayOrder) || 0,
        tags: formData.tags
          ? formData.tags
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
      };

      if (editingItem) {
        const res = await apiClient.put(`/gallery/${editingItem._id}`, payload);
        toast.success(`Updated "${formData.title}"`, 'Gallery Updated');
        setItems((prev) => prev.map((item) => (item._id === editingItem._id ? res.data.data : item)));
      } else {
        const res = await apiClient.post('/gallery', payload);
        toast.success(`Published "${formData.title}" to gallery`, 'Photo Published');
        setItems((prev) => [res.data.data, ...prev]);
        setStats((prev: any) => ({ ...prev, total: prev.total + 1, active: prev.active + 1 }));
      }

      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to save gallery item.', 'Save Error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean, title: string) => {
    try {
      await apiClient.patch(`/gallery/${id}/toggle`);
      setItems((prev) =>
        prev.map((item) => (item._id === id ? { ...item, isActive: !currentStatus } : item))
      );
      toast.success(
        `"${title}" is now ${!currentStatus ? 'Visible on Website' : 'Hidden from Website'}`,
        'Status Changed'
      );
    } catch {
      toast.error('Failed to toggle status.', 'Error');
    }
  };

  const [deletingGalleryItem, setDeletingGalleryItem] = useState<{ id: string; title: string } | null>(null);
  const [isDeletingGalleryItem, setIsDeletingGalleryItem] = useState(false);

  const handleDelete = (id: string, title: string) => {
    setDeletingGalleryItem({ id, title });
  };

  const handleConfirmDeleteGallery = async () => {
    if (!deletingGalleryItem) return;
    setIsDeletingGalleryItem(true);
    try {
      await apiClient.delete(`/gallery/${deletingGalleryItem.id}`);
      setItems((prev) => prev.filter((item) => String(item._id) !== String(deletingGalleryItem.id)));
      toast.success(`"${deletingGalleryItem.title}" removed from gallery.`, 'Deleted');
      setStats((prev: any) => ({ ...prev, total: Math.max(0, prev.total - 1) }));
    } catch {
      toast.error('Failed to delete item.', 'Delete Error');
    } finally {
      setIsDeletingGalleryItem(false);
      setDeletingGalleryItem(null);
    }
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'sports':
        return <Badge variant="warning">🏆 Sports</Badge>;
      case 'academic':
        return <Badge variant="info">🔬 Science &amp; Academics</Badge>;
      case 'cultural':
        return <Badge variant="purple">🎨 Cultural</Badge>;
      case 'primary':
        return <Badge variant="success">👶 Primary SSSD</Badge>;
      case 'celebrations':
        return <Badge variant="danger">🎉 Celebrations</Badge>;
      default:
        return <Badge variant="default">🏛️ Campus</Badge>;
    }
  };

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Principal', 'Teacher']}>
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-1 border border-amber-200">
              <Sparkles className="w-3.5 h-3.5" /> Media Asset Management &bull; 100% Dynamic Cloudinary CDN
            </div>
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 font-serif">
              Campus Photo &amp; Video Media Gallery CMS
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Upload, curate, categorize, and control high-resolution campus photographs, event memories, and video showcases.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchGallery}
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
              Upload New Photo / Media
            </Button>
          </div>
        </div>

        {/* Telemetry KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Photos</span>
            <span className="text-xl font-black text-slate-900 font-mono">{stats.total || items.length}</span>
            <span className="text-[10px] text-slate-400 block">All Album Items</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-800 block">Active (Live)</span>
            <span className="text-xl font-black text-emerald-950 font-mono">{stats.active || 0}</span>
            <span className="text-[10px] text-emerald-700 block">Visible on Website</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-amber-800 block">Sports &amp; Athletics</span>
            <span className="text-xl font-black text-amber-950 font-mono">{stats.sports || 0}</span>
            <span className="text-[10px] text-amber-700 block">Tournament Highlights</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200 shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-blue-800 block">Science &amp; Labs</span>
            <span className="text-xl font-black text-blue-950 font-mono">{stats.academic || 0}</span>
            <span className="text-[10px] text-blue-700 block">Exhibitions &amp; Hackathons</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50/80 border border-purple-200 shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-purple-800 block">Cultural &amp; Fest</span>
            <span className="text-xl font-black text-purple-950 font-mono">{stats.cultural || 0}</span>
            <span className="text-[10px] text-purple-700 block">National Celebrations</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200 shadow-sm space-y-1">
            <span className="text-[10px] uppercase font-bold text-rose-800 block">Featured on Home</span>
            <span className="text-xl font-black text-rose-950 font-mono">{stats.featured || 0}</span>
            <span className="text-[10px] text-rose-700 block">Hero / Top Highlights</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search gallery albums by title, event, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchGallery()}
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
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active Only (Visible)</option>
                <option value="inactive">Inactive Only (Hidden)</option>
              </select>

              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-lg transition ${
                    viewMode === 'table' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Table View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <Button size="sm" onClick={fetchGallery}>
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Gallery Content Area */}
        {isLoading ? (
          <div className="p-16 text-center text-slate-500 space-y-2 bg-white rounded-3xl border border-slate-200">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold">Loading media gallery...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="p-16 text-center text-slate-500 space-y-3 bg-white rounded-3xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <ImageIcon className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-700">No media items found in this category.</p>
            <p className="text-xs text-slate-400">Click &ldquo;Upload New Photo / Media&rdquo; above to publish memories.</p>
            <Button size="sm" onClick={openCreateModal} leftIcon={<Plus className="w-4 h-4" />}>
              Upload First Photo
            </Button>
          </div>
        ) : viewMode === 'grid' ? (
          /* GRID VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div
                key={item._id}
                className={`group bg-white rounded-2xl border transition overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md ${
                  !item.isActive ? 'opacity-70 border-dashed border-slate-300' : 'border-slate-200'
                }`}
              >
                <div>
                  {/* Photo Container with overlay */}
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                      {getCategoryBadge(item.category)}
                      {item.isFeatured && (
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase bg-rose-500 text-white shadow-sm">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="absolute top-2 right-2">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(item._id, item.isActive, item.title)}
                        className={`p-1.5 rounded-lg text-xs font-bold transition shadow-sm ${
                          item.isActive ? 'bg-emerald-600 text-white' : 'bg-slate-900/80 text-white'
                        }`}
                        title={item.isActive ? 'Click to Hide from website' : 'Click to Make Visible on website'}
                      >
                        {item.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-3.5 space-y-1.5">
                    <h3 className="font-bold text-slate-900 text-xs line-clamp-2">{item.title}</h3>
                    {item.description && (
                      <p className="text-slate-500 text-[11px] line-clamp-2">{item.description}</p>
                    )}
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />{' '}
                        {item.eventDate ? new Date(item.eventDate).toLocaleDateString('en-IN') : 'N/A'}
                      </span>
                      <span className="font-mono">{item.academicYear}</span>
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-1.5">
                  <button
                    type="button"
                    onClick={() => openEditModal(item)}
                    className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-100/60 transition"
                    title="Edit Item"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item._id, item.title)}
                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-100/60 transition"
                    title="Delete Item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* TABLE VIEW */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-[11px] font-black uppercase text-slate-500 tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Photo Preview</th>
                    <th className="py-3.5 px-4">Title &amp; Description</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Event Date</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {items.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4">
                        <div className="w-14 h-10 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0">
                          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 block">{item.title}</span>
                        {item.description && <span className="text-[11px] text-slate-500 line-clamp-1">{item.description}</span>}
                      </td>
                      <td className="py-3 px-4">{getCategoryBadge(item.category)}</td>
                      <td className="py-3 px-4 text-slate-500 text-[11px]">
                        {item.eventDate ? new Date(item.eventDate).toLocaleDateString('en-IN') : 'N/A'}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => handleToggleActive(item._id, item.isActive, item.title)}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase transition ${
                            item.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {item.isActive ? 'Active' : 'Hidden'}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEditModal(item)}
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item._id, item.title)}
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
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* ADD / EDIT GALLERY ITEM MODAL                                             */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? `Edit: ${editingItem.title}` : 'Upload & Publish New Media'}
        description="Add high-definition photographs and video showcases to the public campus gallery."
        maxWidth="xl"
      >
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <Input
            label="Media Title / Event Caption *"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Annual Sports Day 100m Sprint Finals"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Gallery Category *</label>
              <select
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:ring-2 focus:ring-blue-500"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="sports">🏆 Sports &amp; Athletics</option>
                <option value="academic">🔬 Science &amp; Academics</option>
                <option value="cultural">🎨 Cultural &amp; National</option>
                <option value="campus">🏛️ Campus &amp; Infrastructure</option>
                <option value="primary">👶 Primary Wing (SSSD)</option>
                <option value="celebrations">🎉 Celebrations &amp; Events</option>
                <option value="other">📁 Other Activities</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Event Date</label>
              <input
                type="date"
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium bg-white focus:ring-2 focus:ring-blue-500"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
              />
            </div>
          </div>

          {/* Cloudinary Live Image Uploader */}
          <ImageUploader
            label="Photograph (Cloudinary Live Upload) *"
            value={formData.imageUrl}
            onChange={(url) => setFormData({ ...formData, imageUrl: url })}
            aspectRatio="wide"
            helperText="Upload vibrant high-resolution photograph. Automatically optimized via Cloudinary CDN."
          />

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Event Narrative / Descriptive Caption
            </label>
            <textarea
              rows={2}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-blue-500"
              placeholder="Provide context about the students, achievements, prizes, or activities depicted..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Academic Session Year"
              value={formData.academicYear}
              onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
              placeholder="2026-2027"
            />
            <Input
              label="Tags (comma-separated)"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="sports, race, annual-day"
            />
          </div>

          {/* Switches */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 block">Featured on Homepage</span>
              <span className="text-[10px] text-slate-400">Display prominently on the website homepage carousel</span>
            </div>
            <input
              type="checkbox"
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
            />
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 block">Active Status (Visible to Public)</span>
              <span className="text-[10px] text-slate-400">Control public visibility immediately</span>
            </div>
            <input
              type="checkbox"
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
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
              {editingItem ? 'Save Changes' : 'Publish to Gallery'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Production Grade Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deletingGalleryItem)}
        onClose={() => !isDeletingGalleryItem && setDeletingGalleryItem(null)}
        onConfirm={handleConfirmDeleteGallery}
        title="Delete Gallery Item"
        description="Are you sure you want to permanently delete this photo / album item from the public gallery showcase?"
        itemName={deletingGalleryItem?.title}
        confirmText="Yes, Delete Photo"
        cancelText="Keep Photo"
        isLoading={isDeletingGalleryItem}
        variant="danger"
      />
    </PortalLayout>
  );
}

