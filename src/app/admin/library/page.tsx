'use client';

import React, { useState } from 'react';
import {
  Library,
  Plus,
  BookCheck,
  Search,
  BookOpen,
  Printer,
  CheckCircle2,
  Clock,
  Filter,
  Sparkles,
  X,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';

const fallbackBooks = [
  {
    _id: 'b_01',
    isbn: '978-81-7450-494-4',
    title: 'NCERT Physics (Class 12 - Part 1 & 2)',
    author: 'NCERT Editorial Board',
    category: 'Physics Science',
    shelfLocation: 'Shelf-PHY-04',
    totalCopies: 45,
    availableCopies: 38,
  },
  {
    _id: 'b_02',
    isbn: '978-93-5283-712-0',
    title: 'Mathematics for Class 10 (High School)',
    author: 'Dr. R.D. Sharma',
    category: 'Mathematics',
    shelfLocation: 'Shelf-MTH-02',
    totalCopies: 60,
    availableCopies: 52,
  },
  {
    _id: 'b_03',
    isbn: '978-81-219-0005-8',
    title: 'High School English Grammar & Composition',
    author: 'P.C. Wren & H. Martin',
    category: 'English Literature',
    shelfLocation: 'Shelf-ENG-01',
    totalCopies: 40,
    availableCopies: 34,
  },
  {
    _id: 'b_04',
    isbn: '978-81-7450-705-1',
    title: 'NCERT Chemistry (Class 11 - Theory & Lab)',
    author: 'NCERT Textbook Committee',
    category: 'Chemistry Science',
    shelfLocation: 'Shelf-CHE-03',
    totalCopies: 50,
    availableCopies: 44,
  },
  {
    _id: 'b_05',
    isbn: '978-93-8632-411-9',
    title: 'संस्कृत मञ्जूषा (व्याकरण एवं साहित्य)',
    author: 'आचार्य रामेश्वर प्रसाद शास्त्री',
    category: 'Sanskrit & Vedic',
    shelfLocation: 'Shelf-SAN-01',
    totalCopies: 35,
    availableCopies: 31,
  },
  {
    _id: 'b_06',
    isbn: '978-01-4303-103-1',
    title: 'Wings of Fire (An Autobiography)',
    author: 'Dr. A.P.J. Abdul Kalam',
    category: 'Inspirational / Biographies',
    shelfLocation: 'Shelf-BIO-05',
    totalCopies: 25,
    availableCopies: 19,
  },
  {
    _id: 'b_07',
    isbn: '978-81-7450-512-5',
    title: 'NCERT Biology (Class 12)',
    author: 'Prof. M.C. Sharma',
    category: 'Biology Science',
    shelfLocation: 'Shelf-BIO-02',
    totalCopies: 40,
    availableCopies: 36,
  },
];

export default function LibraryAdminPage() {
  const [books, setBooks] = useState<any[]>(fallbackBooks);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const { toast } = useToast();

  const [newBook, setNewBook] = useState({
    title: '',
    isbn: '',
    author: '',
    category: 'Physics Science',
    shelfLocation: 'Shelf-A1',
    totalCopies: '20',
  });

  const [issueForm, setIssueForm] = useState({
    bookTitle: 'NCERT Physics (Class 12 - Part 1 & 2)',
    studentName: 'Aarav Sharma (Class 10-A • SGM-2026-1001)',
    dueDate: '2026-09-08',
  });

  const handleCreateBook = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      _id: 'b_' + Date.now(),
      title: newBook.title,
      isbn: newBook.isbn || `978-81-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(100 + Math.random() * 900)}`,
      author: newBook.author,
      category: newBook.category,
      shelfLocation: newBook.shelfLocation,
      totalCopies: Number(newBook.totalCopies) || 10,
      availableCopies: Number(newBook.totalCopies) || 10,
    };
    setBooks([created, ...books]);
    setShowAddModal(false);
    toast.success(`"${created.title}" cataloged in library master register.`, 'Book Added');
  };

  const handleIssueBook = (e: React.FormEvent) => {
    e.preventDefault();
    setShowIssueModal(false);
    toast.success(
      `Issued "${issueForm.bookTitle}" to ${issueForm.studentName}. Due: ${issueForm.dueDate}.`,
      'Book Issued'
    );
  };

  const filteredBooks = books.filter((b) => {
    const matchSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.isbn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCat === 'all' || b.category.includes(selectedCat);
    return matchSearch && matchCat;
  });

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Librarian']}>
      <div className="space-y-6 pt-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <Library className="w-5 h-5 text-blue-600" /> Central Library Repository &amp; Books
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              5,240 volumes cataloged &bull; Track shelf allocations, book availability, and student circulation.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.print();
                toast.success('Generated printable Library Catalog.', 'Print Ready');
              }}
              leftIcon={<Printer className="w-4 h-4 text-slate-600" />}
            >
              Print Catalog
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowIssueModal(true)}
              leftIcon={<BookCheck className="w-4 h-4 text-emerald-600" />}
            >
              Issue Book
            </Button>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 font-bold"
              onClick={() => setShowAddModal(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Volume
            </Button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Total Catalog</span>
            <div className="text-xl font-black text-slate-900 mt-1">5,240 Books</div>
          </div>
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 shadow-sm">
            <span className="text-[10px] font-bold text-emerald-700 uppercase">Available Copies</span>
            <div className="text-xl font-black text-emerald-800 mt-1">4,892 Copies</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 shadow-sm">
            <span className="text-[10px] font-bold text-blue-700 uppercase">Currently Issued</span>
            <div className="text-xl font-black text-blue-800 mt-1">348 Issued</div>
          </div>
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 shadow-sm">
            <span className="text-[10px] font-bold text-amber-700 uppercase">Overdue Returns</span>
            <div className="text-xl font-black text-amber-800 mt-1">12 Pending</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search title, author, or ISBN number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {['all', 'Physics', 'Mathematics', 'Chemistry', 'English', 'Sanskrit', 'Biographies'].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    selectedCat === cat
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat === 'all' ? 'All Shelves' : cat}
                </button>
              )
            )}
          </div>
        </div>

        {/* Mobile Scroll Hint */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 sm:hidden px-1">
          <span>👉 Swipe table sideways to view stocks &amp; shelf codes</span>
        </div>

        {/* Books Table */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-extrabold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-4 py-3.5">ISBN Number</th>
                    <th className="px-4 py-3.5">Book Title &amp; Edition</th>
                    <th className="px-4 py-3.5">Author / Publisher</th>
                    <th className="px-4 py-3.5">Discipline</th>
                    <th className="px-4 py-3.5">Shelf Location</th>
                    <th className="px-4 py-3.5">Stock Status</th>
                    <th className="px-4 py-3.5 text-right">Quick Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredBooks.map((b) => (
                    <tr key={b._id} className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3.5 font-mono font-bold text-blue-700 whitespace-nowrap">{b.isbn}</td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="font-bold text-slate-900">{b.title}</div>
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">{b.author}</td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <Badge size="sm" variant="info">
                          {b.category}
                        </Badge>
                      </td>
                      <td className="px-4 py-3.5 font-mono font-semibold text-slate-700 whitespace-nowrap">
                        {b.shelfLocation}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="font-black text-emerald-700">{b.availableCopies}</span>
                        <span className="text-slate-400"> / {b.totalCopies} Available</span>
                      </td>
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setIssueForm((prev) => ({ ...prev, bookTitle: b.title }));
                            setShowIssueModal(true);
                          }}
                        >
                          Issue Copy
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

      {/* Add Book Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" /> Catalog New Book Volume
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateBook} className="space-y-3 text-xs">
              <Input
                label="Book Title *"
                required
                placeholder="e.g. NCERT Chemistry Practical Manual"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              />
              <Input
                label="Author / Publisher *"
                required
                placeholder="e.g. Dr. P.K. Agrawal"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject Discipline</label>
                  <select
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={newBook.category}
                    onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                  >
                    <option value="Physics Science">Physics</option>
                    <option value="Chemistry Science">Chemistry</option>
                    <option value="Biology Science">Biology</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Sanskrit & Vedic">Sanskrit</option>
                    <option value="English Literature">English</option>
                  </select>
                </div>
                <Input
                  label="Shelf Code"
                  placeholder="e.g. Shelf-CHE-05"
                  value={newBook.shelfLocation}
                  onChange={(e) => setNewBook({ ...newBook, shelfLocation: e.target.value })}
                />
              </div>
              <Input
                label="Total Copies Purchased"
                type="number"
                value={newBook.totalCopies}
                onChange={(e) => setNewBook({ ...newBook, totalCopies: e.target.value })}
              />

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 font-bold">
                  Save to Library Stock
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Issue Book Modal */}
      {showIssueModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <BookCheck className="w-4 h-4 text-emerald-600" /> Issue Book Copy
              </h3>
              <button onClick={() => setShowIssueModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleIssueBook} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Selected Book Volume</label>
                <input
                  type="text"
                  readOnly
                  value={issueForm.bookTitle}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-800 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Student Member *</label>
                <select
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={issueForm.studentName}
                  onChange={(e) => setIssueForm({ ...issueForm, studentName: e.target.value })}
                >
                  <option value="Aarav Sharma (Class 10-A • SGM-2026-1001)">Aarav Sharma (Class 10-A • SGM-2026-1001)</option>
                  <option value="Ananya Gupta (Class 10-A • SGM-2026-1002)">Ananya Gupta (Class 10-A • SGM-2026-1002)</option>
                  <option value="Rohan Verma (Class 12-A • SGM-2026-1201)">Rohan Verma (Class 12-A • SGM-2026-1201)</option>
                  <option value="Priya Singh (Class 11-B • SGM-2026-1102)">Priya Singh (Class 11-B • SGM-2026-1102)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Return Due Date (14 Days)</label>
                <input
                  type="date"
                  value={issueForm.dueDate}
                  onChange={(e) => setIssueForm({ ...issueForm, dueDate: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 font-bold">
                  Confirm Book Issue
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowIssueModal(false)}>
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
