'use client';

import React, { useState, useEffect } from 'react';
import {
  Layers,
  Plus,
  Users,
  Search,
  Printer,
  Building2,
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

const fallbackClasses = [
  {
    _id: 'cls_01',
    name: 'Class 12 (Intermediate)',
    code: 'CLS-12',
    wing: 'Senior Secondary',
    sections: [
      { name: 'A (Science - PCM)', room: 'Room 201', teacher: 'Dr. Ramesh Sharma', capacity: 45, enrolled: 42 },
      { name: 'B (Science - PCB)', room: 'Room 202', teacher: 'Smt. Sunita Verma', capacity: 45, enrolled: 40 },
      { name: 'C (Humanities/Arts)', room: 'Room 203', teacher: 'Acharya R. Dixit', capacity: 50, enrolled: 44 },
    ],
  },
  {
    _id: 'cls_02',
    name: 'Class 11 (Senior Wing)',
    code: 'CLS-11',
    wing: 'Senior Secondary',
    sections: [
      { name: 'A (Science - PCM)', room: 'Room 105', teacher: 'Er. Rajeshwar Singh', capacity: 45, enrolled: 43 },
      { name: 'B (Science - PCB)', room: 'Room 106', teacher: 'Dr. Anand Tiwari', capacity: 45, enrolled: 41 },
    ],
  },
  {
    _id: 'cls_03',
    name: 'Class 10 (High School Board)',
    code: 'CLS-10',
    wing: 'High School',
    sections: [
      { name: 'A (General Board)', room: 'Room 101', teacher: 'Shri Dinesh Gupta', capacity: 50, enrolled: 48 },
      { name: 'B (General Board)', room: 'Room 102', teacher: 'Mrs. Priya Mishra', capacity: 50, enrolled: 46 },
    ],
  },
  {
    _id: 'cls_04',
    name: 'Class 9 (High School Prep)',
    code: 'CLS-09',
    wing: 'High School',
    sections: [
      { name: 'A', room: 'Room 103', teacher: 'Acharya R. Dixit', capacity: 50, enrolled: 49 },
      { name: 'B', room: 'Room 104', teacher: 'Shri Manoj Pathak', capacity: 50, enrolled: 47 },
    ],
  },
  {
    _id: 'cls_05',
    name: 'Class 8 (Middle Wing)',
    code: 'CLS-08',
    wing: 'Middle School',
    sections: [{ name: 'A', room: 'Room 008', teacher: 'Smt. Anjali Sharma', capacity: 45, enrolled: 42 }],
  },
  {
    _id: 'cls_06',
    name: 'Class 7 (Middle Wing)',
    code: 'CLS-07',
    wing: 'Middle School',
    sections: [{ name: 'A', room: 'Room 007', teacher: 'Shri Vikramaditya', capacity: 45, enrolled: 40 }],
  },
  {
    _id: 'cls_07',
    name: 'Primary & Nursery Wing',
    code: 'CLS-PRI',
    wing: 'Foundational',
    sections: [
      { name: 'Nursery', room: 'Kid Wing A', teacher: 'Smt. Neha Tiwari', capacity: 30, enrolled: 28 },
      { name: 'LKG & UKG', room: 'Kid Wing B', teacher: 'Smt. Pooja Pandey', capacity: 35, enrolled: 32 },
    ],
  },
];

export default function ClassesAdminPage() {
  const [classes, setClasses] = useState<any[]>(fallbackClasses);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const { toast } = useToast();

  const [newClass, setNewClass] = useState({
    name: 'Class 6 (Middle Wing)',
    code: 'CLS-06',
    wing: 'Middle School',
    sectionName: 'A',
    room: 'Room 006',
    teacher: 'Assigned Faculty',
    capacity: '45',
  });

  useEffect(() => {
    apiClient
      .get('/academics/classes')
      .then((res) => {
        if (res.data?.data && res.data.data.length > 0) {
          setClasses(res.data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      _id: 'cls_' + Date.now(),
      name: newClass.name,
      code: newClass.code,
      wing: newClass.wing,
      sections: [
        {
          name: newClass.sectionName,
          room: newClass.room,
          teacher: newClass.teacher,
          capacity: Number(newClass.capacity) || 45,
          enrolled: 0,
        },
      ],
    };
    setClasses([...classes, created]);
    setShowAddModal(false);
    toast.success(`Created ${created.name} (${created.code}) successfully!`, 'Academic Setup');
  };

  const filtered = classes.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Principal']}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-serif">
              <Layers className="w-5 h-5 text-blue-600" /> Academic Wings, Classes &amp; Sections
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Structured class divisions, section capacities, and assigned class educators.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.print();
                toast.success('Generated printable Classes structure.', 'Print Ready');
              }}
              leftIcon={<Printer className="w-4 h-4 text-slate-600" />}
            >
              Print Matrix
            </Button>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 font-bold"
              onClick={() => setShowAddModal(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Class
            </Button>
          </div>
        </div>

        {/* Classes Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((cls) => {
            const totalEnrolled = cls.sections?.reduce(
              (acc: number, s: any) => acc + (s.enrolled || 0),
              0
            );
            const totalCap = cls.sections?.reduce(
              (acc: number, s: any) => acc + (s.capacity || 45),
              0
            );

            return (
              <Card
                key={cls._id}
                className="border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between"
              >
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-black text-slate-900">{cls.name}</h3>
                    <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                      {cls.code}
                    </span>
                  </div>
                  <Badge variant="purple" size="sm">
                    {cls.wing || 'UP Board'}
                  </Badge>
                </div>

                <CardContent className="p-4 space-y-3">
                  <div className="text-xs space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                      Classroom Sections ({cls.sections?.length || 1})
                    </span>
                    <div className="space-y-1.5">
                      {cls.sections?.map((sec: any, sIdx: number) => (
                        <div
                          key={sIdx}
                          className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs shadow-sm"
                        >
                          <div>
                            <div className="font-bold text-slate-800">
                              Section {sec.name} &bull; {sec.room}
                            </div>
                            <div className="text-[10px] text-slate-500 font-medium">
                              Incharge: {sec.teacher}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="font-black text-emerald-700 font-mono">
                              {sec.enrolled || 0}
                            </span>
                            <span className="text-slate-400 text-[10px]"> / {sec.capacity}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Total Strength:</span>
                    <span className="font-bold text-slate-900">
                      {totalEnrolled} / {totalCap} Students
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Add Class Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" /> Create Class &amp; Section
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddClass} className="space-y-3 text-xs">
              <Input
                label="Class Title *"
                required
                placeholder="e.g. Class 6 (Middle Wing)"
                value={newClass.name}
                onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Class Code *"
                  required
                  placeholder="e.g. CLS-06"
                  value={newClass.code}
                  onChange={(e) => setNewClass({ ...newClass, code: e.target.value })}
                />
                <Input
                  label="Initial Section"
                  placeholder="e.g. A"
                  value={newClass.sectionName}
                  onChange={(e) => setNewClass({ ...newClass, sectionName: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Room Number"
                  placeholder="e.g. Room 006"
                  value={newClass.room}
                  onChange={(e) => setNewClass({ ...newClass, room: e.target.value })}
                />
                <Input
                  label="Max Capacity"
                  type="number"
                  value={newClass.capacity}
                  onChange={(e) => setNewClass({ ...newClass, capacity: e.target.value })}
                />
              </div>

              <Input
                label="Assigned Class Teacher"
                placeholder="e.g. Shri Dinesh Gupta"
                value={newClass.teacher}
                onChange={(e) => setNewClass({ ...newClass, teacher: e.target.value })}
              />

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 font-bold">
                  Save Class Setup
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
