import { SchoolModel } from './models/school.model.js';
import { InquiryModel, IInquiry } from './models/inquiry.model.js';
import { NotFoundError } from '../../common/errors/app-error.js';

export class SchoolService {
  async getSchoolProfile() {
    let school = await SchoolModel.findOne().populate({
      path: 'currentAcademicYear',
      strictPopulate: false,
    });
    if (!school) {
      // Create initial default school record
      school = await SchoolModel.create({
        name: 'Sarswati Gyan Mandir',
        nameHindi: 'सरस्वती ज्ञान मन्दिर इण्टर कॉलेज',
        tagline: 'Excellence in Education & Character Building',
        address: {
          street: 'Main Road, Near Bus Stand',
          city: 'Shamsabad',
          district: 'Farrukhabad',
          state: 'Uttar Pradesh',
          pincode: '209503',
          country: 'India',
        },
      });
    }
    return school;
  }

  async updateSchoolProfile(data: any) {
    const updateData = { ...data };
    delete updateData._id;
    delete updateData.__v;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    // Use findOneAndUpdate with $set to prevent Mongoose VersionError on concurrent/rapid edits
    const school = await SchoolModel.findOneAndUpdate(
      {},
      { $set: updateData },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );
    return school;
  }

  async toggleSection(sectionKey: string, isActive: boolean) {
    const school = await SchoolModel.findOneAndUpdate(
      {},
      { $set: { [sectionKey]: isActive } },
      { new: true, upsert: true }
    );
    return school;
  }

  // Inquiry Management
  async submitInquiry(data: Partial<IInquiry>, ipAddress?: string): Promise<IInquiry> {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceNumber = `INQ-${new Date().getFullYear()}-${randomSuffix}`;

    const inquiry = new InquiryModel({
      ...data,
      referenceNumber,
      ipAddress,
      status: 'new',
    });

    return await inquiry.save();
  }

  async listInquiries(query: { status?: string; search?: string; limit?: number; page?: number }) {
    const filter: any = {};

    if (query.status && query.status !== 'all') {
      filter.status = query.status;
    }

    if (query.search) {
      filter.$or = [
        { fullName: { $regex: query.search, $options: 'i' } },
        { phone: { $regex: query.search, $options: 'i' } },
        { email: { $regex: query.search, $options: 'i' } },
        { referenceNumber: { $regex: query.search, $options: 'i' } },
        { message: { $regex: query.search, $options: 'i' } },
      ];
    }

    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(query.limit) || 20));
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      InquiryModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      InquiryModel.countDocuments(filter),
    ]);

    const stats = await Promise.all([
      InquiryModel.countDocuments(),
      InquiryModel.countDocuments({ status: 'new' }),
      InquiryModel.countDocuments({ status: 'contacted' }),
      InquiryModel.countDocuments({ status: 'converted' }),
    ]);

    return {
      items,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        total: stats[0],
        new: stats[1],
        contacted: stats[2],
        converted: stats[3],
      },
    };
  }

  async updateInquiryStatus(id: string, status: string, adminNotes?: string): Promise<IInquiry> {
    const inquiry = await InquiryModel.findByIdAndUpdate(
      id,
      {
        $set: {
          status,
          ...(adminNotes !== undefined ? { adminNotes } : {}),
        },
      },
      { new: true }
    );
    if (!inquiry) {
      throw new NotFoundError('Inquiry record not found');
    }
    return inquiry;
  }
}

export const schoolService = new SchoolService();
