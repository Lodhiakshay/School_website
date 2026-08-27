import { logger } from './logger.js';

export interface PaymentInitiateRequest {
  invoiceId: string;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
}

export interface PaymentInitiateResponse {
  gatewayOrderId: string;
  amount: number;
  currency: string;
  keyId?: string;
  paymentUrl?: string;
}

export interface PaymentVerifyRequest {
  gatewayOrderId: string;
  gatewayPaymentId: string;
  gatewaySignature?: string;
}

export interface PaymentGateway {
  initiateOrder(params: PaymentInitiateRequest): Promise<PaymentInitiateResponse>;
  verifyPayment(params: PaymentVerifyRequest): Promise<boolean>;
}

export class MockPaymentGateway implements PaymentGateway {
  async initiateOrder(params: PaymentInitiateRequest): Promise<PaymentInitiateResponse> {
    const mockOrderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    logger.info(`[Payment Gateway Mock] Order created: ${mockOrderId} for INR ${params.amount}`);
    return {
      gatewayOrderId: mockOrderId,
      amount: params.amount,
      currency: params.currency || 'INR',
      keyId: 'mock_key_sarswati_erp',
    };
  }

  async verifyPayment(params: PaymentVerifyRequest): Promise<boolean> {
    logger.info(`[Payment Gateway Mock] Verified payment ${params.gatewayPaymentId} for order ${params.gatewayOrderId}`);
    return true;
  }
}

export const paymentGateway: PaymentGateway = new MockPaymentGateway();

