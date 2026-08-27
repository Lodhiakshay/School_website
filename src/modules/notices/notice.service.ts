import { NoticeModel } from './models/notice.model.js';
import { NotificationModel } from './models/notification.model.js';
import { NotFoundError } from '../../common/errors/app-error.js';

export class NoticeService {
  async listNotices(audience?: string, classId?: string) {
    const filter: any = {};
    if (audience && audience !== 'all') {
      filter.$or = [{ targetAudience: 'all' }, { targetAudience: audience }];
    }
    if (classId) {
      filter.$or = [{ targetAudience: 'all' }, { targetClassId: classId }];
    }

    return NoticeModel.find(filter)
      .populate('publishedBy', 'name role')
      .populate('targetClassId', 'name code')
      .populate('targetSectionId', 'name')
      .sort({ publishDate: -1 });
  }

  async createNotice(data: any) {
    const notice = new NoticeModel(data);
    await notice.save();
    return notice.populate('publishedBy', 'name role');
  }

  async deleteNotice(id: string) {
    await NoticeModel.findByIdAndDelete(id);
    return { message: 'Notice deleted' };
  }

  // Notifications
  async getUserNotifications(userId: string) {
    return NotificationModel.find({ userId }).sort({ createdAt: -1 }).limit(30);
  }

  async markNotificationAsRead(id: string, userId: string) {
    await NotificationModel.findOneAndUpdate({ _id: id, userId }, { isRead: true });
    return { message: 'Marked as read' };
  }

  async markAllAsRead(userId: string) {
    await NotificationModel.updateMany({ userId }, { isRead: true });
    return { message: 'All notifications marked as read' };
  }
}

export const noticeService = new NoticeService();

