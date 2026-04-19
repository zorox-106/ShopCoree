// Strategy Pattern: PaymentProcessor interface - defines common contract for all payment methods
export interface PaymentProcessor {
  processPayment(amount: number): Promise<boolean>;
  getPaymentMethodName(): string;
}
