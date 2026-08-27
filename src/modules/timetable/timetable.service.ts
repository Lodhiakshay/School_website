import { TimetableModel } from './models/timetable.model.js';
import { AcademicYearModel } from '../academics/models/academic-year.model.js';
import { BadRequestError, ConflictError } from '../../common/errors/app-error.js';

export class TimetableService {
  async getSectionTimetable(sectionId: string, academicYearId?: string) {
    const activeYear = academicYearId
      ? { _id: academicYearId }
      : await AcademicYearModel.findOne({ isCurrent: true });

    if (!activeYear) return [];

    return TimetableModel.find({
      sectionId,
      academicYearId: activeYear._id,
    })
      .populate('subjectId', 'name code')
      .populate('teacherId', 'name employeeId')
      .populate('classId', 'name code')
      .populate('sectionId', 'name')
      .sort({ periodNumber: 1 });
  }

  async getTeacherTimetable(teacherId: string, academicYearId?: string) {
    const activeYear = academicYearId
      ? { _id: academicYearId }
      : await AcademicYearModel.findOne({ isCurrent: true });

    if (!activeYear) return [];

    return TimetableModel.find({
      teacherId,
      academicYearId: activeYear._id,
    })
      .populate('subjectId', 'name code')
      .populate('classId', 'name code')
      .populate('sectionId', 'name')
      .sort({ periodNumber: 1 });
  }

  async saveSlot(data: any) {
    let academicYearId = data.academicYearId;
    if (!academicYearId) {
      const activeYear = await AcademicYearModel.findOne({ isCurrent: true });
      if (!activeYear) throw new BadRequestError('Active academic year not found');
      academicYearId = activeYear._id;
    }

    // 1. Clash Check: Is this Teacher already scheduled in another section at this same day & period?
    const teacherClash = await TimetableModel.findOne({
      academicYearId,
      dayOfWeek: data.dayOfWeek,
      periodNumber: data.periodNumber,
      teacherId: data.teacherId,
      sectionId: { $ne: data.sectionId },
    }).populate('classId sectionId');

    if (teacherClash) {
      throw new ConflictError(
        `Teacher Conflict: Teacher is already assigned to ${(teacherClash.classId as any)?.name} - ${(teacherClash.sectionId as any)?.name} on ${data.dayOfWeek}, Period ${data.periodNumber}`
      );
    }

    // 2. Clash Check: Room conflict if room is specified
    if (data.roomNumber && data.roomNumber.trim()) {
      const roomClash = await TimetableModel.findOne({
        academicYearId,
        dayOfWeek: data.dayOfWeek,
        periodNumber: data.periodNumber,
        roomNumber: data.roomNumber.trim(),
        sectionId: { $ne: data.sectionId },
      }).populate('classId sectionId');

      if (roomClash) {
        throw new ConflictError(
          `Room Conflict: Room ${data.roomNumber} is occupied by ${(roomClash.classId as any)?.name} - ${(roomClash.sectionId as any)?.name} on ${data.dayOfWeek}, Period ${data.periodNumber}`
        );
      }
    }

    // 3. Upsert slot for this section
    const slot = await TimetableModel.findOneAndUpdate(
      {
        academicYearId,
        sectionId: data.sectionId,
        dayOfWeek: data.dayOfWeek,
        periodNumber: data.periodNumber,
      },
      {
        academicYearId,
        classId: data.classId,
        sectionId: data.sectionId,
        dayOfWeek: data.dayOfWeek,
        periodNumber: data.periodNumber,
        startTime: data.startTime,
        endTime: data.endTime,
        subjectId: data.subjectId,
        teacherId: data.teacherId,
        roomNumber: data.roomNumber || '',
      },
      { upsert: true, new: true }
    )
      .populate('subjectId', 'name code')
      .populate('teacherId', 'name employeeId');

    return slot;
  }

  async deleteSlot(id: string) {
    await TimetableModel.findByIdAndDelete(id);
    return { message: 'Timetable slot removed' };
  }
}

export const timetableService = new TimetableService();

