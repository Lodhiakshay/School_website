'use client';

import React, { useState, useEffect } from 'react';
import { Library, Plus, BookCheck } from 'lucide-react';
import { PortalLayout } from '../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Modal } from '../../components/ui/modal';
import { LoadingSpinner } from '../../components/ui/loading-spinner';
import { apiClient } from '../../lib/api-client';

export default function LibrarianDashboardPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);

  const [newBook, setNewBook] = useState({
    title: '',
    isbn: '',
    author: '',
    category: 'Literature',
    shelfLocation: 'Shelf-B2',
    totalCopies: 10,
  });

  const [issueForm, setIssueForm] = useState({
    bookId: '',
    studentId: '',
  });

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const [resB, resS] = await Promise.all([
        apiClient.get('/library/books'),
        apiClient.get('/students'),
      ]);
      setBooks(resB.data?.data || []);
      setStudents(resS.data?.data || []);
      if (resB.data?.data?.length > 0) setIssueForm((prev) => ({ ...prev, bookId: resB.data.data[0]._id }));
      if (resS.data?.data?.length > 0) setIssueForm((prev) => ({ ...prev, studentId: resS.data.data[0]._id }));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleCreateBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/library/books', {
        ...newBook,
        totalCopies: Number(newBook.totalCopies),
      });
      setShowAddModal(false);
      fetchBooks();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to add book');
    }
  };

  const handleIssueBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post('/library/issue', issueForm);
      alert('✅ Book issued successfully to student!');
      setShowIssueModal(false);
      fetchBooks();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to issue book');
    }
  };

  return (
    <PortalLayout allowedRoles={['Librarian', 'SuperAdmin', 'Admin']}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Library className="w-6 h-6 text-blue-600" /> Librarian Circulation &amp; Inventory Desk
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage cataloged titles, shelf locations, book issues, and returns.
          </p>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" leftIcon={<BookCheck className="w-4 h-4" />} onClick={() => setShowIssueModal(true)}>
            Issue Book
          </Button>
          <Button size="sm" variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>
            Add Book
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <LoadingSpinner label="Loading books catalog..." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                  <tr>
                    <th className="px-4 py-3.5">ISBN Number</th>
                    <th className="px-4 py-3.5">Book Title</th>
                    <th className="px-4 py-3.5">Author</th>
                    <th className="px-4 py-3.5">Category</th>
                    <th className="px-4 py-3.5">Shelf Location</th>
                    <th className="px-4 py-3.5">Available Copies</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {books.map((b) => (
                    <tr key={b._id} className="hover:bg-slate-50/80">
                      <td className="px-4 py-3 font-mono font-bold text-blue-600">{b.isbn}</td>
                      <td className="px-4 py-3 font-bold text-slate-900">{b.title}</td>
                      <td className="px-4 py-3">{b.author}</td>
                      <td className="px-4 py-3">
                        <Badge size="sm" variant="info">
                          {b.category}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 font-mono">{b.shelfLocation}</td>
                      <td className="px-4 py-3">
                        <span className="font-extrabold text-emerald-600">{b.availableCopies}</span>
                        <span className="text-slate-400"> / {b.totalCopies}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal 1: Add Book */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add Book" maxWidth="md">
        <form onSubmit={handleCreateBook} className="space-y-4">
          <Input
            label="Book Title"
            required
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          />
          <Input
            label="ISBN Number"
            required
            value={newBook.isbn}
            onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
          />
          <Input
            label="Author"
            required
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          />
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Book
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal 2: Issue Book */}
      <Modal isOpen={showIssueModal} onClose={() => setShowIssueModal(false)} title="Issue Book" maxWidth="md">
        <form onSubmit={handleIssueBook} className="space-y-4">
          <Select
            label="Select Book"
            required
            options={books.map((b) => ({ value: b._id, label: `${b.title} (${b.availableCopies} copies)` }))}
            value={issueForm.bookId}
            onChange={(e) => setIssueForm({ ...issueForm, bookId: e.target.value })}
          />
          <Select
            label="Select Student"
            required
            options={students.map((s) => ({ value: s._id, label: `${s.firstName} ${s.lastName} (${s.admissionNumber})` }))}
            value={issueForm.studentId}
            onChange={(e) => setIssueForm({ ...issueForm, studentId: e.target.value })}
          />
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button type="button" variant="outline" onClick={() => setShowIssueModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Issue Book
            </Button>
          </div>
        </form>
      </Modal>
    </PortalLayout>
  );
}

