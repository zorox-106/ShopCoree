import { User, UserRole } from './User';

// Customer inherits from User - adds customer-specific fields
export class Customer extends User {
  private shippingAddress: string;
  private phoneNumber: string;

  constructor(
    id: string, 
    name: string, 
    email: string, 
    shippingAddress: string, 
    phoneNumber: string
  ) {
    // Call super constructor to initialize base User fields
    super(id, name, email, UserRole.CUSTOMER);
    this.shippingAddress = shippingAddress;
    this.phoneNumber = phoneNumber;
  }

  // Getters and setters for Customer-specific fields
  public getShippingAddress(): string { return this.shippingAddress; }
  public getPhoneNumber(): string { return this.phoneNumber; }
  public setShippingAddress(address: string): void { this.shippingAddress = address; }
  public setPhoneNumber(phone: string): void { this.phoneNumber = phone; }

  // Implementation of abstract method from User
  public getDisplayInfo(): string {
    return `Customer: ${this.getName()} (${this.getEmail()}) - Phone: ${this.phoneNumber}`;
  }
}
