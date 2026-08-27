import { GalleryModel, IGallery } from './models/gallery.model.js';
import { NotFoundError } from '../../common/errors/app-error.js';

const INITIAL_SEEDS: Partial<IGallery>[] = [
  {
    title: 'Annual Sports Day 100m Sprint Finals',
    description: 'Senior boys 100m dash event at the annual sports tournament.',
    category: 'sports',
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    eventDate: new Date('2026-02-15'),
    academicYear: '2026-2027',
    isFeatured: true,
    isActive: true,
    displayOrder: 1,
    tags: ['sports', 'athletics', 'race', 'annual-day'],
  },
  {
    title: 'Science Innovation Fair & Robotics Demo',
    description: 'Working models of AI automation and hydraulic crane demonstrations.',
    category: 'academic',
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?auto=format&fit=crop&w=1200&q=80',
    eventDate: new Date('2026-01-28'),
    academicYear: '2026-2027',
    isFeatured: true,
    isActive: true,
    displayOrder: 2,
    tags: ['science', 'robotics', 'stem', 'innovation'],
  },
  {
    title: 'Republic Day Flag Hoisting & Patriotic Parade',
    description: 'Grand salute to the National Flag followed by parade by NCC cadettes.',
    category: 'cultural',
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1200&q=80',
    eventDate: new Date('2026-01-26'),
    academicYear: '2026-2027',
    isFeatured: true,
    isActive: true,
    displayOrder: 3,
    tags: ['republic-day', 'ncc', 'national', 'celebration'],
  },
  {
    title: 'Saraswati Puja & Classical Music Program',
    description: 'Traditional Vedic Vandana and classical sitar rendition by students.',
    category: 'cultural',
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    eventDate: new Date('2026-02-14'),
    academicYear: '2026-2027',
    isFeatured: false,
    isActive: true,
    displayOrder: 4,
    tags: ['puja', 'saraswati', 'vandana', 'music'],
  },
  {
    title: 'Chemistry Titration & Salt Analysis Practical Lab',
    description: 'Class 12th students performing acid-base qualitative analysis under guidance.',
    category: 'academic',
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80',
    eventDate: new Date('2026-02-05'),
    academicYear: '2026-2027',
    isFeatured: false,
    isActive: true,
    displayOrder: 5,
    tags: ['chemistry', 'lab', 'science', 'experiments'],
  },
  {
    title: 'Inter-House Volleyball Championship Match',
    description: 'Shivaji House vs Tagore House in the final championship clash.',
    category: 'sports',
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1200&q=80',
    eventDate: new Date('2026-01-20'),
    academicYear: '2026-2027',
    isFeatured: false,
    isActive: true,
    displayOrder: 6,
    tags: ['volleyball', 'sports', 'inter-house'],
  },
  {
    title: 'Primary Wing SSSD Storytelling & Origami Workshop',
    description: 'Creative clay modeling and paper craft show by foundational stage toddlers.',
    category: 'primary',
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    eventDate: new Date('2026-01-18'),
    academicYear: '2026-2027',
    isFeatured: true,
    isActive: true,
    displayOrder: 7,
    tags: ['sssd', 'primary', 'art', 'craft'],
  },
  {
    title: 'Smart IT & Computer Lab Programming Session',
    description: 'Python & Web development class in the high-tech computer workstation hall.',
    category: 'campus',
    type: 'image',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    eventDate: new Date('2026-01-12'),
    academicYear: '2026-2027',
    isFeatured: false,
    isActive: true,
    displayOrder: 8,
    tags: ['computer', 'it', 'smart-lab'],
  },
];

export class GalleryService {
  async seedInitialGallery(): Promise<void> {
    const count = await GalleryModel.countDocuments();
    if (count === 0) {
      await GalleryModel.insertMany(INITIAL_SEEDS);
    }
  }

  async create(data: Partial<IGallery>, userId?: string): Promise<IGallery> {
    const item = new GalleryModel({
      ...data,
      uploadedBy: userId,
    });
    return await item.save();
  }

  async listPublic(query: {
    category?: string;
    isFeatured?: boolean;
    search?: string;
    type?: string;
    limit?: number;
    page?: number;
  }) {
    await this.seedInitialGallery();

    const filter: any = { isActive: true };

    if (query.category && query.category !== 'all') {
      filter.category = query.category;
    }

    if (query.isFeatured !== undefined) {
      filter.isFeatured = query.isFeatured;
    }

    if (query.type && query.type !== 'all') {
      filter.type = query.type;
    }

    if (query.search) {
      filter.$or = [
        { title: { $regex: query.search, $options: 'i' } },
        { description: { $regex: query.search, $options: 'i' } },
        { tags: { $in: [new RegExp(query.search, 'i')] } },
      ];
    }

    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(query.limit) || 50));
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      GalleryModel.find(filter)
        .sort({ displayOrder: 1, eventDate: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      GalleryModel.countDocuments(filter),
    ]);

    // Categories aggregation count
    const categoryCounts = await GalleryModel.aggregate([
      { $match: { isActive: true } },
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

  async listAdmin(query: {
    category?: string;
    status?: string;
    type?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    await this.seedInitialGallery();

    const filter: any = {};

    if (query.category && query.category !== 'all') {
      filter.category = query.category;
    }

    if (query.status === 'active') {
      filter.isActive = true;
    } else if (query.status === 'inactive') {
      filter.isActive = false;
    }

    if (query.type && query.type !== 'all') {
      filter.type = query.type;
    }

    if (query.search) {
      filter.$or = [
        { title: { $regex: query.search, $options: 'i' } },
        { description: { $regex: query.search, $options: 'i' } },
        { tags: { $in: [new RegExp(query.search, 'i')] } },
      ];
    }

    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(query.limit) || 50));
    const skip = (page - 1) * limit;

    const [items, total, stats] = await Promise.all([
      GalleryModel.find(filter)
        .sort({ displayOrder: 1, eventDate: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      GalleryModel.countDocuments(filter),
      this.getStats(),
    ]);

    return {
      items,
      stats,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getStats() {
    const [total, active, featured, sports, academic, cultural, campus, primary] = await Promise.all([
      GalleryModel.countDocuments(),
      GalleryModel.countDocuments({ isActive: true }),
      GalleryModel.countDocuments({ isFeatured: true }),
      GalleryModel.countDocuments({ category: 'sports' }),
      GalleryModel.countDocuments({ category: 'academic' }),
      GalleryModel.countDocuments({ category: 'cultural' }),
      GalleryModel.countDocuments({ category: 'campus' }),
      GalleryModel.countDocuments({ category: 'primary' }),
    ]);

    return {
      total,
      active,
      inactive: total - active,
      featured,
      sports,
      academic,
      cultural,
      campus,
      primary,
    };
  }

  async getById(id: string): Promise<IGallery> {
    const item = await GalleryModel.findById(id);
    if (!item) {
      throw new NotFoundError('Gallery media item not found');
    }
    return item;
  }

  async update(id: string, updateData: Partial<IGallery>): Promise<IGallery> {
    const item = await GalleryModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!item) {
      throw new NotFoundError('Gallery media item not found to update');
    }
    return item;
  }

  async toggleActive(id: string): Promise<IGallery> {
    const item = await GalleryModel.findById(id);
    if (!item) {
      throw new NotFoundError('Gallery media item not found');
    }
    item.isActive = !item.isActive;
    return await item.save();
  }

  async delete(id: string): Promise<void> {
    const deleted = await GalleryModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundError('Gallery media item not found to delete');
    }
  }
}

export const galleryService = new GalleryService();
