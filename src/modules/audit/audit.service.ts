import { AuditLogModel } from './models/audit-log.model.js';

export class AuditService {
  async logAction(data: {
    userId?: string;
    userName: string;
    userRole: string;
    action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'PUBLISH' | 'COLLECT_FEE' | 'APPROVE' | 'STATUS_CHANGE';
    entity: string;
    entityId?: string;
    description: string;
    ipAddress: string;
    userAgent?: string;
    beforeState?: any;
    afterState?: any;
  }) {
    try {
      const log = new AuditLogModel(data);
      await log.save();
      return log;
    } catch (err) {
      // Non-blocking log failure
      console.error('Failed to persist audit log:', err);
    }
  }

  async listLogs(query: {
    action?: string;
    entity?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const page = Math.max(1, query.page || 1);
    const limit = Math.min(100, Math.max(1, query.limit || 25));
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (query.action) filter.action = query.action;
    if (query.entity) filter.entity = query.entity;
    if (query.search) {
      const regex = new RegExp(query.search, 'i');
      filter.$or = [{ userName: regex }, { description: regex }, { entityId: regex }];
    }

    const [logs, total] = await Promise.all([
      AuditLogModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      AuditLogModel.countDocuments(filter),
    ]);

    return {
      logs,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }
}

export const auditService = new AuditService();

