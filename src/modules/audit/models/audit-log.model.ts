import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLog extends Document {
  userId?: mongoose.Types.ObjectId;
  userName: string;
  userRole: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'PUBLISH' | 'COLLECT_FEE' | 'APPROVE' | 'STATUS_CHANGE';
  entity: string; // e.g. "Student", "FeePayment", "Mark", "Result", "User", "Role"
  entityId?: string;
  description: string;
  ipAddress: string;
  userAgent?: string;
  beforeState?: Record<string, any>;
  afterState?: Record<string, any>;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String, required: true },
    userRole: { type: String, required: true },
    action: {
      type: String,
      enum: ['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'PUBLISH', 'COLLECT_FEE', 'APPROVE', 'STATUS_CHANGE'],
      required: true,
      index: true,
    },
    entity: { type: String, required: true, index: true },
    entityId: { type: String, index: true },
    description: { type: String, required: true },
    ipAddress: { type: String, default: '127.0.0.1' },
    userAgent: { type: String, default: '' },
    beforeState: { type: Schema.Types.Mixed },
    afterState: { type: Schema.Types.Mixed },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

AuditLogSchema.index({ createdAt: -1 });

export const AuditLogModel = mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);

