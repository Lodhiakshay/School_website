import { ParentModel } from './models/parent.model.js';
import { StudentModel } from '../students/models/student.model.js';
import { NotFoundError } from '../../common/errors/app-error.js';

export class ParentService {
  async listParents(query: { search?: string; page?: number; limit?: number }) {
    const page = Math.max(1, query.page || 1);
    const limit = Math.min(100, Math.max(1, query.limit || 20));
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (query.search) {
      const searchRegex = new RegExp(query.search, 'i');
      filter.$or = [
        { fatherName: searchRegex },
        { motherName: searchRegex },
        { fatherPhone: searchRegex },
        { motherPhone: searchRegex },
      ];
    }

    const [parents, total] = await Promise.all([
      ParentModel.find(filter)
        .populate({
          path: 'students',
          populate: [
            { path: 'currentClassId', select: 'name code' },
            { path: 'currentSectionId', select: 'name' },
          ],
        })
        .sort({ fatherName: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ParentModel.countDocuments(filter),
    ]);

    return {
      parents,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getParentById(id: string) {
    const parent = await ParentModel.findById(id).populate({
      path: 'students',
      populate: [
        { path: 'currentClassId', select: 'name code' },
        { path: 'currentSectionId', select: 'name' },
      ],
    });
    if (!parent) throw new NotFoundError('Parent not found');
    return parent;
  }

  async getMyChildren(parentUserId: string) {
    const parent = await ParentModel.findOne({ userId: parentUserId }).populate({
      path: 'students',
      populate: [
        { path: 'currentClassId', select: 'name code' },
        { path: 'currentSectionId', select: 'name' },
      ],
    });
    if (!parent) throw new NotFoundError('Parent profile not found');
    return parent.students;
  }
}

export const parentService = new ParentService();

