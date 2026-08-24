'use client';

import React, { useState, useEffect } from 'react';
import {
  BookMarked,
  Plus,
  Search,
  Printer,
  Sparkles,
  Award,
  BookOpen,
  X,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';
import { apiClient } from '../../../lib/api-client';

const fallbackSubjects = [
  {
    _id: 'sub_01',
    name: 'Hindi (हिंदी साहित्य एवं व्याकरण)',
    code: 'HIN-101',
    classes: 'Class 9, 10, 11, 12',
    type: 'theory',
    maxMarks: 100,
    passingMarks: 33,
    department: 'Languages',
  },
  {
    _id: 'sub_02',
    name: 'English (General & Literature)',
    code: 'ENG-102',
    classes: 'Class 9, 10, 11, 12',
    type: 'theory',
    maxMarks: 100,
    passingMarks: 33,
    department: 'Languages',
  },
  {
    _id: 'sub_03',
    name: 'Mathematics (गणित)',
    code: 'MTH-103',
    classes: 'Class 9, 10, 11, 12',
    type: 'theory',
    maxMarks: 100,
    passingMarks: 33,
    department: 'Mathematics',
  },
  {
    _id: 'sub_04',
    name: 'Physics (भौतिक विज्ञान)',
    code: 'PHY-111',
    classes: 'Class 11, 12 (Science)',
    type: 'both',
    theoryMax: 70,
    practicalMax: 30,
    maxMarks: 100,
    passingMarks: 33,
    department: 'Science',
  },
  {
    _id: 'sub_05',
    name: 'Chemistry (रसायन विज्ञान)',
    code: 'CHE-112',
    classes: 'Class 11, 12 (Science)',
    type: 'both',
    theoryMax: 70,
    practicalMax: 30,
    maxMarks: 100,
    passingMarks: 33,
    department: 'Science',
  },
  {
    _id: 'sub_06',
    name: 'Biology (जीव विज्ञान)',
    code: 'BIO-113',
    classes: 'Class 11, 12 (Medical)',
    type: 'both',
    theoryMax: 70,
    practicalMax: 30,
    maxMarks: 100,
    passingMarks: 33,
    department: 'Science',
  },
  {
    _id: 'sub_07',
    name: 'Sanskrit (संस्कृत)',
    code: 'SAN-106',
    classes: 'Class 6 - 12',
    type: 'theory',
    maxMarks: 100,
    passingMarks: 33,
    department: 'Vedic Studies',
  },
  {
    _id: 'sub_08',
    name: 'Computer Applications & AI',
    code: 'CS-108',
    classes: 'Class 9, 10, 11, 12',
    type: 'both',
    theoryMax: 60,
    practicalMax: 40,
    maxMarks: 100,
    passingMarks: 33,
    department: 'IT & Computing',
  },
];

export default function SubjectsAdminPage() {
  const [subjects, setSubjects] = useState<any[]>(fallbackSubjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const { toast } = useToast();

  const [newSub, setNewSub] = useState({
    name: '',
    code: '',
    classes: 'Class 10, 11, 12',
    type: 'theory',
    maxMarks: '100',
    passingMarks: '33',
    department: 'Science',
  });

  useEffect(() => {
    apiClient
      .get('/academics/subjects')
      .then((res) => {
        if (res.data?.data && res.data.data.length > 0) {
          setSubjects(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      _id: 'sub_' + Date.now(),
      name: newSub.name,
      code: newSub.code,
      classes: newSub.classes,
      type: newSub.type,
      maxMarks: Number(newSub.maxMarks) || 100,
      passingMarks: Number(newSub.passingMarks) || 33,
      department: newSub.department,
    };
    setSubjects([...subjects, created]);
    setShowAddModal(false);
    toast.success(`Subject ${created.name} (${created.code}) created successfully!`, 'Subject Cataloged');
  };

  const filtered = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Principal']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <BookMarked className="w-5 h-5 text-blue-600" /> Subject Catalog &amp; Mark Framework
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Subject codes, NCERT theory / practical breakdown, and board passing thresholds.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.print();
                toast.success('Generated printable Subject Catalog.', 'Print Ready');
              }}
              leftIcon={<Printer className="w-4 h-4 text-slate-600" />}
            >
              Print List
            </Button>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 font-bold"
              onClick={() => setShowAddModal(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Subject
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search subject name, code, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        {/* Subjects Table Card */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">Subject Code</th>
                    <th className="p-3.5">Subject Name</th>
                    <th className="p-3.5">Department</th>
                    <th className="p-3.5">Assigned Classes</th>
                    <th className="p-3.5 text-center">Theory / Practical</th>
                    <th className="p-3.5 text-center">Max Marks</th>
                    <th className="p-3.5 text-center">Passing Minimum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filtered.map((s) => (
                    <tr key={s._id} className="hover:bg-slate-50 transition">
                      <td className="p-3.5 font-mono font-bold text-blue-600">{s.code}</td>
                      <td className="p-3.5 font-bold text-slate-900">{s.name}</td>
                      <td className="p-3.5">
                        <Badge size="sm" variant="info">
                          {s.department}
                        </Badge>
                      </td>
                      <td className="p-3.5 text-slate-600">{s.classes}</td>
                      <td className="p-3.5 text-center">
                        {s.type === 'both' ? (
                          <span className="text-purple-700 font-bold text-[11px]">
                            {s.theoryMax} Th + {s.practicalMax} Pr
                          </span>
                        ) : (
                          <span className="text-slate-600 font-medium">100 Theory</span>
                        )}
                      </td>
                      <td className="p-3.5 text-center font-mono font-black text-slate-900">
                        {s.maxMarks}
                      </td>
                      <td className="p-3.5 text-center font-mono font-bold text-emerald-700">
                        {s.passingMarks} Marks
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Subject Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" /> Catalog New Subject
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubject} className="space-y-3 text-xs">
              <Input
                label="Subject Title *"
                required
                placeholder="e.g. Physics (भौतिक विज्ञान)"
                value={newSub.name}
                onChange={(e) => setNewSub({ ...newSub, name: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Subject Code *"
                  required
                  placeholder="e.g. PHY-111"
                  value={newSub.code}
                  onChange={(e) => setNewSub({ ...newSub, code: e.target.value })}
                />
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department</label>
                  <select
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={newSub.department}
                    onChange={(e) => setNewSub({ ...newSub, department: e.target.value })}
                  >
                    <option value="Science">Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Languages">Languages</option>
                    <option value="Vedic Studies">Vedic Studies</option>
                    <option value="IT & Computing">IT & Computing</option>
                  </select>
                </div>
              </div>

              <Input
                label="Assigned Classes"
                placeholder="e.g. Class 11, 12 (Science)"
                value={newSub.classes}
                onChange={(e) => setNewSub({ ...newSub, classes: e.target.value })}
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Max Total Marks"
                  type="number"
                  value={newSub.maxMarks}
                  onChange={(e) => setNewSub({ ...newSub, maxMarks: e.target.value })}
                />
                <Input
                  label="Passing Threshold"
                  type="number"
                  value={newSub.passingMarks}
                  onChange={(e) => setNewSub({ ...newSub, passingMarks: e.target.value })}
                />
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 font-bold">
                  Catalog Subject
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                >
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
