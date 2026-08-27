import { DocumentModel, IDocument } from './models/document.model.js';
import { NotFoundError } from '../../common/errors/app-error.js';

const INITIAL_DOC_SEEDS: Partial<IDocument>[] = [
  // 1. Mandatory Statutory Disclosures
  {
    title: 'UP Board Recognition & Permanent Affiliation Order',
    description: 'Official recognition letter and permanent intermediate affiliation certificate issued by the UP Board of High School & Intermediate Education.',
    category: 'disclosure',
    docCode: 'UP-FBD-2026-SGM-089',
    authority: 'Board of High School & Intermediate Education UP, Prayagraj',
    fileUrl: '/uploads/documents/UP_Board_Affiliation_Certificate_2026.pdf',
    fileName: 'UP_Board_Affiliation_Certificate_2026.pdf',
    fileSize: '2.4 MB',
    format: 'PDF',
    academicYear: '2026-2027',
    isPublic: true,
    isFeatured: true,
    isActive: true,
    displayOrder: 1,
    downloadCount: 142,
  },
  {
    title: 'Society Registration & Institutional Trust Deed',
    description: 'Certified copy of the Society Registration Certificate and Educational Trust Bye-laws under Society Registration Act XXI of 1860.',
    category: 'disclosure',
    docCode: 'SOC-REG-1999-FBD-421',
    authority: 'Registrar of Societies & Chits, Bareilly/Kanpur Region',
    fileUrl: '/uploads/documents/Society_Registration_Trust_Deed.pdf',
    fileName: 'Society_Registration_Trust_Deed.pdf',
    fileSize: '1.8 MB',
    format: 'PDF',
    academicYear: '2026-2027',
    isPublic: true,
    isFeatured: false,
    isActive: true,
    displayOrder: 2,
    downloadCount: 89,
  },
  {
    title: 'District Fire Safety Clearance Certificate & NOC',
    description: 'Annual fire fighting installations inspection and structural fire safety clearance certificate for institutional multi-storey wings.',
    category: 'disclosure',
    docCode: 'FIRE-NOC-2026-FBD-114',
    authority: 'Chief Fire Officer (CFO), District Farrukhabad',
    fileUrl: '/uploads/documents/Fire_Safety_NOC_Farrukhabad_2026.pdf',
    fileName: 'Fire_Safety_NOC_Farrukhabad_2026.pdf',
    fileSize: '950 KB',
    format: 'PDF',
    academicYear: '2026-2027',
    isPublic: true,
    isFeatured: false,
    isActive: true,
    displayOrder: 3,
    downloadCount: 67,
  },
  {
    title: 'Building Safety & Structural Stability Certificate',
    description: 'Certified civil engineer structural audit certificate ensuring seismic stability and masonry safety compliance.',
    category: 'disclosure',
    docCode: 'PWD-STRUCT-2026-88',
    authority: 'Executive Engineer, Public Works Department (PWD) Farrukhabad',
    fileUrl: '/uploads/documents/Building_Safety_Certificate_2026.pdf',
    fileName: 'Building_Safety_Certificate_2026.pdf',
    fileSize: '1.2 MB',
    format: 'PDF',
    academicYear: '2026-2027',
    isPublic: true,
    isFeatured: false,
    isActive: true,
    displayOrder: 4,
    downloadCount: 54,
  },
  {
    title: 'Safe Drinking Water & Sanitary Hygiene Certificate',
    description: 'Potable water testing laboratory bacteriological analysis report and campus sanitation compliance certificate.',
    category: 'disclosure',
    docCode: 'WATER-HYG-2026-44',
    authority: 'Chief Medical Officer (CMO) & Public Health Lab, Farrukhabad',
    fileUrl: '/uploads/documents/Water_Sanitation_Certificate_2026.pdf',
    fileName: 'Water_Sanitation_Certificate_2026.pdf',
    fileSize: '780 KB',
    format: 'PDF',
    academicYear: '2026-2027',
    isPublic: true,
    isFeatured: false,
    isActive: true,
    displayOrder: 5,
    downloadCount: 42,
  },

  // 2. Curricula & Syllabi
  {
    title: 'Class 10 High School Board Revised Syllabus & Exam Blueprint',
    description: 'Complete NCERT & UP MSP syllabus, chapter-wise marks distribution, and model question papers for High School candidates.',
    category: 'syllabus',
    docCode: 'SYLL-CLASS10-2026',
    authority: 'UP MSP Curriculum Directorate, Prayagraj',
    fileUrl: '/uploads/documents/Class10_HighSchool_Syllabus_2026.pdf',
    fileName: 'Class10_HighSchool_Syllabus_2026.pdf',
    fileSize: '3.6 MB',
    format: 'PDF',
    academicYear: '2026-2027',
    isPublic: true,
    isFeatured: true,
    isActive: true,
    displayOrder: 6,
    downloadCount: 310,
  },
  {
    title: 'Class 12 Intermediate Science (PCM & PCB) Syllabus & Lab Manual',
    description: 'Comprehensive intermediate physics, chemistry, mathematics, and biology theory syllabus along with practical experiments manual.',
    category: 'syllabus',
    docCode: 'SYLL-CLASS12-SCI-2026',
    authority: 'UP MSP Curriculum Directorate, Prayagraj',
    fileUrl: '/uploads/documents/Class12_Intermediate_Science_Syllabus_2026.pdf',
    fileName: 'Class12_Intermediate_Science_Syllabus_2026.pdf',
    fileSize: '4.8 MB',
    format: 'PDF',
    academicYear: '2026-2027',
    isPublic: true,
    isFeatured: true,
    isActive: true,
    displayOrder: 7,
    downloadCount: 285,
  },
  {
    title: 'Class 12 Intermediate Commerce & Humanities Syllabus',
    description: 'Official syllabus for Accountancy, Business Organisation, Economics, Commercial Mathematics, and Civic Administration.',
    category: 'syllabus',
    docCode: 'SYLL-CLASS12-COMM-2026',
    authority: 'UP MSP Curriculum Directorate, Prayagraj',
    fileUrl: '/uploads/documents/Class12_Commerce_Arts_Syllabus_2026.pdf',
    fileName: 'Class12_Commerce_Arts_Syllabus_2026.pdf',
    fileSize: '3.1 MB',
    format: 'PDF',
    academicYear: '2026-2027',
    isPublic: true,
    isFeatured: false,
    isActive: true,
    displayOrder: 8,
    downloadCount: 160,
  },

  // 3. Academic Calendar & Date Sheets
  {
    title: 'Annual Institutional Academic Calendar & Gazetted Holidays (2026-27)',
    description: 'Detailed month-wise schedule of 240+ working days, monthly unit assessments, national festivals, vacation periods, and parent-teacher meetings.',
    category: 'calendar',
    docCode: 'ACAD-CAL-2026-27',
    authority: 'Office of the Principal, Sarswati Gyan Mandir',
    fileUrl: '/uploads/documents/Academic_Calendar_Holiday_List_2026_27.pdf',
    fileName: 'Academic_Calendar_Holiday_List_2026_27.pdf',
    fileSize: '1.4 MB',
    format: 'PDF',
    academicYear: '2026-2027',
    isPublic: true,
    isFeatured: true,
    isActive: true,
    displayOrder: 9,
    downloadCount: 420,
  },
  {
    title: 'Pre-Board Examination Date Sheet & Seating Matrix (Jan 2027)',
    description: 'Official routine and examination timings for Class 10 and Class 12 Pre-Board internal examinations.',
    category: 'date_sheet',
    docCode: 'DATE-SHEET-PREBOARD-2027',
    authority: 'Examination Controller, SGM Examination Center',
    fileUrl: '/uploads/documents/PreBoard_Date_Sheet_2027.pdf',
    fileName: 'PreBoard_Date_Sheet_2027.pdf',
    fileSize: '890 KB',
    format: 'PDF',
    academicYear: '2026-2027',
    isPublic: true,
    isFeatured: false,
    isActive: true,
    displayOrder: 10,
    downloadCount: 195,
  },

  // 4. Admission Forms & Proformas
  {
    title: 'Physical Admission Registration Form & Medical Fitness Proforma',
    description: 'Printable offline admission application form for parents preferring physical submission at the administrative office counter.',
    category: 'forms',
    docCode: 'FORM-ADM-OFFLINE-2026',
    authority: 'Central Admissions Office, SGM & SSSD',
    fileUrl: '/uploads/documents/Offline_Admission_Registration_Form_2026.pdf',
    fileName: 'Offline_Admission_Registration_Form_2026.pdf',
    fileSize: '1.1 MB',
    format: 'PDF',
    academicYear: '2026-2027',
    isPublic: true,
    isFeatured: true,
    isActive: true,
    displayOrder: 11,
    downloadCount: 230,
  },
  {
    title: 'Transfer Certificate (TC) & Character Certificate Application Proforma',
    description: 'Standard institutional request application form for obtaining official School Leaving Transfer Certificates.',
    category: 'forms',
    docCode: 'FORM-TC-REQ-2026',
    authority: 'Student Record Vault & Registrar Desk',
    fileUrl: '/uploads/documents/TC_Character_Certificate_Application.pdf',
    fileName: 'TC_Character_Certificate_Application.pdf',
    fileSize: '650 KB',
    format: 'PDF',
    academicYear: '2026-2027',
    isPublic: true,
    isFeatured: false,
    isActive: true,
    displayOrder: 12,
    downloadCount: 112,
  },
];

export class DocumentService {
  async seedInitialDocuments(): Promise<void> {
    const count = await DocumentModel.countDocuments();
    if (count === 0) {
      await DocumentModel.insertMany(INITIAL_DOC_SEEDS);
    }
  }

  async listPublic(query: { category?: string; search?: string; limit?: number; page?: number }) {
    await this.seedInitialDocuments();

    const filter: any = { isActive: true, isPublic: true };

    if (query.category && query.category !== 'all') {
      filter.category = query.category;
    }

    if (query.search) {
      filter.$or = [
        { title: { $regex: query.search, $options: 'i' } },
        { description: { $regex: query.search, $options: 'i' } },
        { docCode: { $regex: query.search, $options: 'i' } },
        { authority: { $regex: query.search, $options: 'i' } },
      ];
    }

    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(query.limit) || 50));
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      DocumentModel.find(filter)
        .sort({ displayOrder: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      DocumentModel.countDocuments(filter),
    ]);

    const categoryCounts = await DocumentModel.aggregate([
      { $match: { isActive: true, isPublic: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    return {
      items,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      categories: categoryCounts.reduce((acc: any, cur: any) => {
        acc[cur._id] = cur.count;
        return acc;
      }, {}),
    };
  }

  async listAdmin(query: { category?: string; status?: string; isPublic?: string; search?: string }) {
    await this.seedInitialDocuments();

    const filter: any = {};

    if (query.category && query.category !== 'all') {
      filter.category = query.category;
    }

    if (query.status === 'active') {
      filter.isActive = true;
    } else if (query.status === 'inactive') {
      filter.isActive = false;
    }

    if (query.isPublic === 'true') {
      filter.isPublic = true;
    } else if (query.isPublic === 'false') {
      filter.isPublic = false;
    }

    if (query.search) {
      filter.$or = [
        { title: { $regex: query.search, $options: 'i' } },
        { description: { $regex: query.search, $options: 'i' } },
        { docCode: { $regex: query.search, $options: 'i' } },
        { authority: { $regex: query.search, $options: 'i' } },
      ];
    }

    const [items, stats] = await Promise.all([
      DocumentModel.find(filter)
        .populate('uploadedBy', 'name role')
        .sort({ displayOrder: 1, createdAt: -1 })
        .lean(),
      this.getStats(),
    ]);

    return {
      items,
      stats,
    };
  }

  async getStats() {
    const [total, active, isPublic, disclosures, syllabi, calendars, forms, downloads] = await Promise.all([
      DocumentModel.countDocuments(),
      DocumentModel.countDocuments({ isActive: true }),
      DocumentModel.countDocuments({ isPublic: true }),
      DocumentModel.countDocuments({ category: 'disclosure' }),
      DocumentModel.countDocuments({ category: 'syllabus' }),
      DocumentModel.countDocuments({ category: { $in: ['calendar', 'date_sheet'] } }),
      DocumentModel.countDocuments({ category: 'forms' }),
      DocumentModel.aggregate([{ $group: { _id: null, totalDownloads: { $sum: '$downloadCount' } } }]),
    ]);

    return {
      total,
      active,
      isPublic,
      disclosures,
      syllabi,
      calendars,
      forms,
      totalDownloads: downloads[0]?.totalDownloads || 0,
    };
  }

  async create(data: Partial<IDocument>, userId?: string): Promise<IDocument> {
    const doc = new DocumentModel({
      ...data,
      uploadedBy: userId,
    });
    return await doc.save();
  }

  async getById(id: string): Promise<IDocument> {
    const doc = await DocumentModel.findById(id);
    if (!doc) {
      throw new NotFoundError('Document not found');
    }
    return doc;
  }

  async update(id: string, updateData: Partial<IDocument>): Promise<IDocument> {
    const doc = await DocumentModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!doc) {
      throw new NotFoundError('Document not found to update');
    }
    return doc;
  }

  async toggleActive(id: string): Promise<IDocument> {
    const doc = await DocumentModel.findById(id);
    if (!doc) {
      throw new NotFoundError('Document not found');
    }
    doc.isActive = !doc.isActive;
    return await doc.save();
  }

  async togglePublic(id: string): Promise<IDocument> {
    const doc = await DocumentModel.findById(id);
    if (!doc) {
      throw new NotFoundError('Document not found');
    }
    doc.isPublic = !doc.isPublic;
    return await doc.save();
  }

  async trackDownload(id: string): Promise<{ downloadCount: number }> {
    const doc = await DocumentModel.findByIdAndUpdate(
      id,
      { $inc: { downloadCount: 1 } },
      { new: true }
    );
    return { downloadCount: doc ? doc.downloadCount : 0 };
  }

  async delete(id: string): Promise<void> {
    const deleted = await DocumentModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundError('Document not found to delete');
    }
  }
}

export const documentService = new DocumentService();
