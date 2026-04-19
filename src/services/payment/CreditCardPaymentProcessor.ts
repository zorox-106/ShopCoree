import { PaymentProcessor } from './PaymentProcessor';

// Concrete Strategy: Credit Card Payment implementation
export class CreditCardPaymentProcessor implements PaymentProcessor {
  private cardNumber: string;
  private cvv: string;
  private expiryDate: string;

  constructor(cardNumber: string, cvv: string, expiryDate: string) {
    this.cardNumber = cardNumber;
    this.cvv = cvv;
    this.expiryDate = expiryDate;
  }

  public async processPayment(amount: number): Promise<boolean> {
    // Simulate credit card payment processing (hiding full card number for security)
    const maskedCard = `****-****-****-${this.cardNumber.slice(-4)}`;
    console.log(`🔄 Processing credit card payment of $${amount.toFixed(2)} using card: ${maskedCard}`);
    await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate longer processing for credit card
    console.log(`✅ Credit card payment successful!`);
    return true;
  }

  public getPaymentMethodName(): string {
    return 'Credit Card';
  }
}
