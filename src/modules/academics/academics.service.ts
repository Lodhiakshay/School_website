import { AcademicYearModel, IAcademicYear } from './models/academic-year.model.js';
import { ClassModel, IClass } from './models/class.model.js';
import { SectionModel, ISection } from './models/section.model.js';
import { SubjectModel, ISubject } from './models/subject.model.js';
import { NotFoundError } from '../../common/errors/app-error.js';

class AcademicsService {
  // Academic Years
  async createAcademicYear(data: Partial<IAcademicYear>): Promise<IAcademicYear> {
    if (data.isCurrent) {
      await AcademicYearModel.updateMany({}, { isCurrent: false });
    }
    return AcademicYearModel.create(data);
  }

  async listAcademicYears(): Promise<IAcademicYear[]> {
    return AcademicYearModel.find().sort({ startDate: -1 });
  }

  async getCurrentAcademicYear(): Promise<IAcademicYear | null> {
    return AcademicYearModel.findOne({ isCurrent: true });
  }

  async setCurrentAcademicYear(id: string): Promise<IAcademicYear> {
    await AcademicYearModel.updateMany({}, { isCurrent: false });
    const year = await AcademicYearModel.findByIdAndUpdate(id, { isCurrent: true, status: 'active' }, { new: true });
    if (!year) throw new NotFoundError('Academic year not found');
    return year;
  }

  // Classes
  async createClass(data: Partial<IClass>): Promise<IClass> {
    return ClassModel.create(data);
  }

  async listClasses(): Promise<any[]> {
    const classes = await ClassModel.find().sort({ orderIndex: 1 }).lean();
    const sections = await SectionModel.find().populate('classTeacherId', 'name email employeeId').lean();

    return classes.map((cls) => ({
      ...cls,
      sections: sections.filter((s) => s.classId.toString() === cls._id.toString()),
    }));
  }

  async getClassById(id: string): Promise<IClass> {
    const cls = await ClassModel.findById(id);
    if (!cls) throw new NotFoundError('Class not found');
    return cls;
  }

  async updateClass(id: string, data: Partial<IClass>): Promise<IClass> {
    const cls = await ClassModel.findByIdAndUpdate(id, data, { new: true });
    if (!cls) throw new NotFoundError('Class not found');
    return cls;
  }

  async deleteClass(id: string): Promise<any> {
    const cls = await ClassModel.findByIdAndDelete(id);
    if (!cls) throw new NotFoundError('Class not found');
    return { success: true, message: 'Class deleted' };
  }

  // Sections
  async createSection(data: Partial<ISection>): Promise<ISection> {
    return SectionModel.create(data);
  }

  async listSections(classId?: string): Promise<ISection[]> {
    const filter = classId ? { classId } : {};
    return SectionModel.find(filter).populate('classId').populate('classTeacherId', 'name email employeeId');
  }

  async updateSection(id: string, data: Partial<ISection>): Promise<ISection> {
    const section = await SectionModel.findByIdAndUpdate(id, data, { new: true });
    if (!section) throw new NotFoundError('Section not found');
    return section;
  }

  async deleteSection(id: string): Promise<any> {
    const section = await SectionModel.findByIdAndDelete(id);
    if (!section) throw new NotFoundError('Section not found');
    return { success: true, message: 'Section deleted' };
  }

  // Subjects
  async createSubject(data: Partial<ISubject>): Promise<ISubject> {
    return SubjectModel.create(data);
  }

  async listSubjects(classId?: string): Promise<ISubject[]> {
    const filter = classId ? { classId } : {};
    return SubjectModel.find(filter).populate('classId');
  }

  async updateSubject(id: string, data: Partial<ISubject>): Promise<ISubject> {
    const subject = await SubjectModel.findByIdAndUpdate(id, data, { new: true });
    if (!subject) throw new NotFoundError('Subject not found');
    return subject;
  }

  async deleteSubject(id: string): Promise<any> {
    const subject = await SubjectModel.findByIdAndDelete(id);
    if (!subject) throw new NotFoundError('Subject not found');
    return { success: true, message: 'Subject deleted' };
  }
}

export const academicsService = new AcademicsService();
