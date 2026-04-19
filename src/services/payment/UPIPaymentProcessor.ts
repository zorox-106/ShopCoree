import { PaymentProcessor } from './PaymentProcessor';

// Concrete Strategy: UPI Payment implementation
export class UPIPaymentProcessor implements PaymentProcessor {
  private upiId: string;

  constructor(upiId: string) {
    this.upiId = upiId;
  }

  public async processPayment(amount: number): Promise<boolean> {
    // Simulate UPI payment processing (asynchronous to mimic real-world API call)
    console.log(`🔄 Processing UPI payment of $${amount.toFixed(2)} to UPI ID: ${this.upiId}`);
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
    console.log(`✅ UPI payment successful!`);
    return true;
  }

  public getPaymentMethodName(): string {
    return 'UPI';
  }
}
