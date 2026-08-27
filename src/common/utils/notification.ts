import { logger } from './logger.js';

export interface NotificationPayload {
  recipient: string; // Email, phone number, or user id
  title: string;
  body: string;
  channel?: 'email' | 'sms' | 'whatsapp' | 'in_app';
  data?: Record<string, any>;
}

export interface NotificationProvider {
  send(payload: NotificationPayload): Promise<boolean>;
}

export class MockNotificationProvider implements NotificationProvider {
  async send(payload: NotificationPayload): Promise<boolean> {
    logger.info(`[Notification - ${payload.channel || 'in_app'}] To: ${payload.recipient} | Title: "${payload.title}" | Body: "${payload.body}"`);
    return true;
  }
}

export class NotificationService {
  private provider: NotificationProvider;

  constructor(provider?: NotificationProvider) {
    this.provider = provider || new MockNotificationProvider();
  }

  async sendNotification(payload: NotificationPayload): Promise<boolean> {
    try {
      return await this.provider.send(payload);
    } catch (error) {
      logger.error('Failed to dispatch notification:', error);
      return false;
    }
  }
}

export const notificationService = new NotificationService();

