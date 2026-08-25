'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  Search,
  Filter,
  Plus,
  Download,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  Mail,
  GraduationCap,
  Calendar,
  Building2,
  Sparkles,
  FileText,
  X,
  Send,
  Printer,
  ChevronRight,
} from 'lucide-react';
import { PortalLayout } from '../../../components/layout/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useToast } from '../../../components/ui/toast';

interface JobApplication {
  id: string;
  applicantId: string;
  fullName: string;
  email: string;
  phone: string;
  appliedPost: string;
  department: string;
  qualification: string;
  experienceYears: number;
  expectedSalary: string;
  appliedDate: string;
  status: 'new' | 'shortlisted' | 'interview_scheduled' | 'hired' | 'rejected';
  coverNote: string;
  resumeFileName: string;
}

interface JobPosting {
  id: string;
  title: string;
  department: string;
  vacancies: number;
  experienceReq: string;
  qualificationReq: string;
  salaryRange: string;
  status: 'active' | 'closed';
  postedDate: string;
}

const mockApplications: JobApplication[] = [
  {
    id: 'app-1',
    applicantId: 'REC-2026-0891',
    fullName: 'Dr. Alok Kumar Tiwari',
    email: 'alok.tiwari.physics@gmail.com',
    phone: '+91 9451882233',
    appliedPost: 'PGT Physics (Classes 11th - 12th)',
    department: 'Science & Senior Secondary',
    qualification: 'M.Sc. Physics (Gold Medalist), B.Ed., Ph.D.',
    experienceYears: 7,
    expectedSalary: '₹ 45,000 / mo',
    appliedDate: '24 Aug 2026',
    status: 'shortlisted',
    coverNote:
      '7 years experience preparing senior intermediate students for UP Board distinction and JEE Main foundation physics.',
    resumeFileName: 'Dr_Alok_Tiwari_Physics_CV.pdf',
  },
  {
    id: 'app-2',
    applicantId: 'REC-2026-0892',
    fullName: 'Shailesh Verma',
    email: 'shailesh.maths.fbd@gmail.com',
    phone: '+91 9839124455',
    appliedPost: 'PGT Mathematics (Classes 11th - 12th)',
    department: 'Science & Senior Secondary',
    qualification: 'M.Sc. Mathematics (IIT Kanpur), B.Ed.',
    experienceYears: 5,
    expectedSalary: '₹ 42,000 / mo',
    appliedDate: '23 Aug 2026',
    status: 'interview_scheduled',
    coverNote:
      'Passionate mathematics educator specialized in Calculus, Coordinate Geometry, and Board score enhancement.',
    resumeFileName: 'Shailesh_Verma_Mathematics.pdf',
  },
  {
    id: 'app-3',
    applicantId: 'REC-2026-0893',
    fullName: 'Pooja Srivastava',
    email: 'pooja.srivastava.tgt@outlook.com',
    phone: '+91 9125678901',
    appliedPost: 'TGT Science (Classes 9th - 10th)',
    department: 'Science & Senior Secondary',
    qualification: 'B.Sc. Chemistry & Biology, B.Ed., UPTET Qualified',
    experienceYears: 4,
    expectedSalary: '₹ 32,000 / mo',
    appliedDate: '22 Aug 2026',
    status: 'new',
    coverNote:
      'Hands-on experimental science teacher with extensive lab practical training experience for High School boards.',
    resumeFileName: 'Pooja_Srivastava_TGT_Science.pdf',
  },
  {
    id: 'app-4',
    applicantId: 'REC-2026-0894',
    fullName: 'Pandit Ramakant Mishra',
    email: 'ramakant.hindi.sahitya@gmail.com',
    phone: '+91 9415443322',
    appliedPost: 'PGT Hindi Sahitya & Sanskrit',
    department: 'Languages & Humanities',
    qualification: 'M.A. Hindi & Sanskrit, B.Ed.',
    experienceYears: 9,
    expectedSalary: '₹ 40,000 / mo',
    appliedDate: '21 Aug 2026',
    status: 'shortlisted',
    coverNote:
      'Senior Hindi teacher with deep roots in UP Board curriculum, Vyakaran, and Sanskrit shloka recitations.',
    resumeFileName: 'Ramakant_Mishra_Hindi_CV.pdf',
  },
  {
    id: 'app-5',
    applicantId: 'REC-2026-0895',
    fullName: 'Sneha Chandel',
    email: 'sneha.chandel.prt@gmail.com',
    phone: '+91 8853112244',
    appliedPost: 'PRT Mother Teacher (Classes 1 - 5)',
    department: 'Primary Education',
    qualification: 'B.A. English, D.El.Ed., CTET Level 1',
    experienceYears: 3,
    expectedSalary: '₹ 22,000 / mo',
    appliedDate: '20 Aug 2026',
    status: 'new',
    coverNote:
      'Creative activity-based primary educator adept at phonics, playful learning, and child behavioral guidance.',
    resumeFileName: 'Sneha_Chandel_PRT_Resume.pdf',
  },
];

const mockVacancies: JobPosting[] = [
  {
    id: 'vac-1',
    title: 'PGT Physics (Classes 11th - 12th)',
    department: 'Science & Senior Secondary',
    vacancies: 2,
    experienceReq: '3+ Years',
    qualificationReq: 'M.Sc. Physics + B.Ed.',
    salaryRange: '₹ 35,000 - ₹ 48,000',
    status: 'active',
    postedDate: '01 Aug 2026',
  },
  {
    id: 'vac-2',
    title: 'PGT Mathematics (Classes 11th - 12th)',
    department: 'Science & Senior Secondary',
    vacancies: 1,
    experienceReq: '3+ Years',
    qualificationReq: 'M.Sc. Mathematics + B.Ed.',
    salaryRange: '₹ 35,000 - ₹ 48,000',
    status: 'active',
    postedDate: '01 Aug 2026',
  },
  {
    id: 'vac-3',
    title: 'TGT Science & Biology (Classes 9th - 10th)',
    department: 'Science & Senior Secondary',
    vacancies: 2,
    experienceReq: '2+ Years',
    qualificationReq: 'B.Sc. / M.Sc. + B.Ed.',
    salaryRange: '₹ 28,000 - ₹ 36,000',
    status: 'active',
    postedDate: '05 Aug 2026',
  },
  {
    id: 'vac-4',
    title: 'PGT Hindi Sahitya & Sanskrit',
    department: 'Languages & Humanities',
    vacancies: 1,
    experienceReq: '3+ Years',
    qualificationReq: 'M.A. Hindi / Sanskrit + B.Ed.',
    salaryRange: '₹ 30,000 - ₹ 42,000',
    status: 'active',
    postedDate: '10 Aug 2026',
  },
];

export default function AdminCareersPage() {
  const [activeTab, setActiveTab] = useState<'applications' | 'vacancies'>('applications');
  const [applications, setApplications] = useState<JobApplication[]>(mockApplications);
  const [vacancies, setVacancies] = useState<JobPosting[]>(mockVacancies);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);
  const [showAddVacancyModal, setShowAddVacancyModal] = useState(false);
  const { toast } = useToast();

  // New Vacancy Form State
  const [newVacancy, setNewVacancy] = useState({
    title: '',
    department: 'Science & Senior Secondary',
    vacancies: 1,
    experienceReq: '2+ Years',
    qualificationReq: '',
    salaryRange: '₹ 30,000 - ₹ 40,000',
  });

  const handleUpdateStatus = (appId: string, newStatus: JobApplication['status']) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
    );
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp({ ...selectedApp, status: newStatus });
    }
    toast.success(`Application status updated to "${newStatus}".`, 'Status Updated');
  };

  const handleCreateVacancy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVacancy.title || !newVacancy.qualificationReq) {
      toast.error('Please enter position title and qualification requirements.', 'Missing Fields');
      return;
    }

    const created: JobPosting = {
      id: `vac-${Date.now()}`,
      title: newVacancy.title,
      department: newVacancy.department,
      vacancies: Number(newVacancy.vacancies) || 1,
      experienceReq: newVacancy.experienceReq,
      qualificationReq: newVacancy.qualificationReq,
      salaryRange: newVacancy.salaryRange,
      status: 'active',
      postedDate: 'Just Now',
    };

    setVacancies([created, ...vacancies]);
    setShowAddVacancyModal(false);
    setNewVacancy({
      title: '',
      department: 'Science & Senior Secondary',
      vacancies: 1,
      experienceReq: '2+ Years',
      qualificationReq: '',
      salaryRange: '₹ 30,000 - ₹ 40,000',
    });
    toast.success(`New faculty opening "${created.title}" published successfully!`, 'Vacancy Published');
  };

  const handleDownloadRoster = () => {
    const csvHeader = 'ApplicantID,FullName,AppliedPost,Department,Qualification,ExperienceYears,Phone,Email,Status,AppliedDate\n';
    const csvRows = applications
      .map(
        (a) =>
          `"${a.applicantId}","${a.fullName}","${a.appliedPost}","${a.department}","${a.qualification}","${a.experienceYears}","${a.phone}","${a.email}","${a.status}","${a.appliedDate}"`
      )
      .join('\n');

    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Faculty_Applications_Roster_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Downloaded candidate applications roster CSV.', 'Export Complete');
  };

  const filteredApps = applications.filter((app) => {
    const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.applicantId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.appliedPost.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  return (
    <PortalLayout allowedRoles={['SuperAdmin', 'Admin', 'Principal']}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 flex-shrink-0">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900 font-serif">
                  Faculty Recruitment &amp; Careers Desk
                </h1>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200 text-[10px]">
                  Hiring Portal Active
                </Badge>
              </div>
              <p className="text-xs text-slate-500">
                Manage online faculty job openings, review candidate resumes, shortlist teachers, and schedule interviews.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadRoster}
              leftIcon={<Download className="w-4 h-4 text-slate-600" />}
            >
              Export CSV
            </Button>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 font-bold"
              onClick={() => setShowAddVacancyModal(true)}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Post New Vacancy
            </Button>
          </div>
        </div>

        {/* View Switcher Tabs & Quick Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 font-bold uppercase">Total Applicants</span>
              <p className="text-xl font-black text-slate-900 font-mono">{applications.length}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 font-bold uppercase">Shortlisted</span>
              <p className="text-xl font-black text-emerald-700 font-mono">
                {applications.filter((a) => a.status === 'shortlisted').length}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 font-bold uppercase">Interviews Slated</span>
              <p className="text-xl font-black text-purple-700 font-mono">
                {applications.filter((a) => a.status === 'interview_scheduled').length}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 font-bold uppercase">Active Openings</span>
              <p className="text-xl font-black text-blue-900 font-mono">{vacancies.length}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'applications'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Online Candidate Applications ({applications.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('vacancies')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'vacancies'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Manage Job Vacancies ({vacancies.length})</span>
          </button>
        </div>

        {/* Tab 1: Candidate Applications Table */}
        {activeTab === 'applications' && (
          <div className="space-y-4">
            {/* Filter Toolbar */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search candidate name, reference ID, applied post, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full sm:w-48 p-2 text-xs rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="all">All Application Statuses</option>
                <option value="new">New Applications</option>
                <option value="shortlisted">Shortlisted for Review</option>
                <option value="interview_scheduled">Interview Scheduled</option>
                <option value="hired">Hired Candidates</option>
                <option value="rejected">Rejected / Archived</option>
              </select>
            </div>

            {/* Applications Table */}
            <Card className="border-slate-200 shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs min-w-[850px]">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-extrabold tracking-wider text-[10px]">
                      <tr>
                        <th className="px-4 py-3.5">Ref ID</th>
                        <th className="px-4 py-3.5">Candidate Name</th>
                        <th className="px-4 py-3.5">Applied Post</th>
                        <th className="px-4 py-3.5">Qualification &amp; Exp</th>
                        <th className="px-4 py-3.5">Contact Details</th>
                        <th className="px-4 py-3.5">Status</th>
                        <th className="px-4 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-medium">
                      {filteredApps.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50 transition">
                          <td className="px-4 py-3.5 font-mono font-bold text-blue-700">{app.applicantId}</td>
                          <td className="px-4 py-3.5">
                            <span className="font-bold text-slate-900 block">{app.fullName}</span>
                            <span className="text-[10px] text-slate-400">{app.appliedDate}</span>
                          </td>
                          <td className="px-4 py-3.5 font-bold text-slate-800">{app.appliedPost}</td>
                          <td className="px-4 py-3.5">
                            <span className="block truncate max-w-[200px] text-slate-700">{app.qualification}</span>
                            <span className="text-[10px] text-emerald-700 font-bold">{app.experienceYears} Years Exp</span>
                          </td>
                          <td className="px-4 py-3.5 space-y-0.5">
                            <div className="flex items-center gap-1 font-mono text-[11px] text-slate-700">
                              <Phone className="w-3 h-3 text-slate-400" /> {app.phone}
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-slate-500">
                              <Mail className="w-3 h-3 text-slate-400" /> {app.email}
                            </div>
                          </td>
                          <td className="px-4 py-3.5">
                            <span
                              className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                                app.status === 'shortlisted'
                                  ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                  : app.status === 'interview_scheduled'
                                  ? 'bg-purple-100 text-purple-800 border-purple-200'
                                  : app.status === 'hired'
                                  ? 'bg-blue-100 text-blue-800 border-blue-200'
                                  : app.status === 'rejected'
                                  ? 'bg-rose-100 text-rose-800 border-rose-200'
                                  : 'bg-amber-100 text-amber-800 border-amber-200'
                              }`}
                            >
                              {app.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-right">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedApp(app)}
                              leftIcon={<Eye className="w-3.5 h-3.5 text-slate-600" />}
                            >
                              Review
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
        )}

        {/* Tab 2: Manage Job Vacancies Grid */}
        {activeTab === 'vacancies' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vacancies.map((vac) => (
              <div
                key={vac.id}
                className="bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-blue-700 transition"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                        {vac.department}
                      </span>
                      <h3 className="text-base font-black text-slate-900 font-serif mt-1">{vac.title}</h3>
                    </div>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200 font-mono text-[10px]">
                      {vac.vacancies} Open Posts
                    </Badge>
                  </div>

                  <div className="space-y-1 text-xs text-slate-600">
                    <p><strong className="text-slate-900">Required Qualification:</strong> {vac.qualificationReq}</p>
                    <p><strong className="text-slate-900">Experience:</strong> {vac.experienceReq}</p>
                    <p><strong className="text-slate-900">Salary Scale:</strong> {vac.salaryRange}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                  <span className="text-slate-400 text-[11px]">Posted: {vac.postedDate}</span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => toast.success(`Updated status for ${vac.title}.`, 'Status Updated')}
                    >
                      Toggle Status
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Candidate Review Modal */}
        {selectedApp && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col p-6 shadow-2xl border-2 border-slate-900 animate-in zoom-in-95 duration-200 my-auto overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-shrink-0">
                <span className="text-xs font-black uppercase tracking-wider text-blue-700 font-mono">
                  CANDIDATE DOSSIER &bull; {selectedApp.applicantId}
                </span>
                <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-slate-600 p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 py-4 space-y-4 text-xs">
                <div>
                  <h3 className="text-lg font-black text-slate-900 font-serif">{selectedApp.fullName}</h3>
                  <p className="text-blue-700 font-bold mt-0.5">{selectedApp.appliedPost}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 text-[10px]">Mobile Phone:</span>
                    <p className="font-mono font-bold text-slate-800">{selectedApp.phone}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">Email Address:</span>
                    <p className="font-mono font-bold text-slate-800 truncate">{selectedApp.email}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">Total Experience:</span>
                    <p className="font-bold text-emerald-700">{selectedApp.experienceYears} Years</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">Expected Remuneration:</span>
                    <p className="font-bold text-slate-900">{selectedApp.expectedSalary}</p>
                  </div>
                </div>

                <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block">Degrees &amp; Qualifications:</span>
                  <p className="text-slate-700">{selectedApp.qualification}</p>
                </div>

                <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block">Candidate Statement &amp; Cover Profile:</span>
                  <p className="text-slate-600 leading-relaxed">{selectedApp.coverNote}</p>
                </div>

                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-blue-900 font-bold">
                    <FileText className="w-4 h-4 text-blue-700" />
                    <span>{selectedApp.resumeFileName}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white text-blue-700 border-blue-300 font-bold text-xs"
                    onClick={() => toast.success(`Simulating download of ${selectedApp.resumeFileName}`, 'Resume Downloaded')}
                    leftIcon={<Download className="w-3.5 h-3.5" />}
                  >
                    Download CV
                  </Button>
                </div>

                {/* Change Status Buttons */}
                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-800 block text-xs">Recruitment Action:</span>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 font-bold text-[11px]"
                      onClick={() => handleUpdateStatus(selectedApp.id, 'shortlisted')}
                    >
                      Shortlist
                    </Button>
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 font-bold text-[11px]"
                      onClick={() => handleUpdateStatus(selectedApp.id, 'interview_scheduled')}
                    >
                      Call Interview
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-rose-600 border-rose-300 hover:bg-rose-50 font-bold text-[11px]"
                      onClick={() => handleUpdateStatus(selectedApp.id, 'rejected')}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end flex-shrink-0">
                <Button variant="outline" onClick={() => setSelectedApp(null)}>
                  Close Dossier
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Post New Vacancy Modal */}
        {showAddVacancyModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-slate-900 space-y-4 animate-in zoom-in-95 duration-200 my-auto">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 font-serif">
                  <Plus className="w-4 h-4 text-blue-600" /> Post New Faculty Opening
                </h3>
                <button onClick={() => setShowAddVacancyModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateVacancy} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Position / Subject Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PGT Chemistry (11th-12th)"
                    value={newVacancy.title}
                    onChange={(e) => setNewVacancy({ ...newVacancy, title: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Department</label>
                    <select
                      value={newVacancy.department}
                      onChange={(e) => setNewVacancy({ ...newVacancy, department: e.target.value })}
                      className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                    >
                      <option value="Science & Senior Secondary">Science &amp; Senior Sec</option>
                      <option value="Languages & Humanities">Languages &amp; Arts</option>
                      <option value="Primary Education">Primary Wing (1-5)</option>
                      <option value="Information Technology">IT &amp; Systems</option>
                      <option value="Administration & Accounts">Administration</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">No. of Openings</label>
                    <input
                      type="number"
                      min="1"
                      value={newVacancy.vacancies}
                      onChange={(e) => setNewVacancy({ ...newVacancy, vacancies: Number(e.target.value) })}
                      className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Required Degrees &amp; Qualifications *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. M.Sc. Chemistry + B.Ed."
                    value={newVacancy.qualificationReq}
                    onChange={(e) => setNewVacancy({ ...newVacancy, qualificationReq: e.target.value })}
                    className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Experience</label>
                    <input
                      type="text"
                      placeholder="e.g. 2+ Years"
                      value={newVacancy.experienceReq}
                      onChange={(e) => setNewVacancy({ ...newVacancy, experienceReq: e.target.value })}
                      className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Salary Scale</label>
                    <input
                      type="text"
                      placeholder="e.g. ₹ 32,000 - ₹ 42,000"
                      value={newVacancy.salaryRange}
                      onChange={(e) => setNewVacancy({ ...newVacancy, salaryRange: e.target.value })}
                      className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-slate-200">
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 font-bold">
                    Publish Vacancy
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddVacancyModal(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}

