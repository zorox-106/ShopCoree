import { Product } from './Product';

// Enum to track the lifecycle of an order
export enum OrderStatus {
  PENDING = 'pending',      // Order created, not paid
  PAID = 'paid',            // Payment successful
  PROCESSING = 'processing',// Being prepared for shipping
  SHIPPED = 'shipped',      // On the way
  DELIVERED = 'delivered'   // Received by customer
}

// Interface for an item in an order
export interface OrderItem {
  product: Product;
  quantity: number;
}

// Order model - manages the order lifecycle and contains items
export class Order {
  private readonly id: string;
  private readonly customerId: string;
  private items: OrderItem[];
  private status: OrderStatus;
  private readonly totalAmount: number;
  private readonly createdAt: Date;

  constructor(
    id: string,
    customerId: string,
    items: OrderItem[]
  ) {
    this.id = id;
    this.customerId = customerId;
    this.items = items;
    this.status = OrderStatus.PENDING;
    this.createdAt = new Date();
    this.totalAmount = this.calculateTotal();
  }

  // Private helper to calculate order total
  private calculateTotal(): number {
    return this.items.reduce((sum, item) => {
      return sum + (item.product.getPrice() * item.quantity);
    }, 0);
  }

  // Getters
  public getId(): string { return this.id; }
  public getCustomerId(): string { return this.customerId; }
  public getItems(): OrderItem[] { return [...this.items]; } // Return a copy to prevent external modification
  public getStatus(): OrderStatus { return this.status; }
  public getTotalAmount(): number { return this.totalAmount; }
  public getCreatedAt(): Date { return this.createdAt; }

  // Method to update order status (with validation that it's a valid transition)
  public updateStatus(newStatus: OrderStatus): void {
    this.status = newStatus;
  }
}
