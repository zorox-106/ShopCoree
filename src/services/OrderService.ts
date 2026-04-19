import { Order, OrderItem, OrderStatus } from '../models/Order';
import { OrderRepository } from '../repositories/OrderRepository';
import { ProductRepository } from '../repositories/ProductRepository';
import { PaymentProcessor } from './payment/PaymentProcessor';

// OrderService - core business logic for orders, including payment processing with Strategy Pattern
export class OrderService {
  private orderRepository: OrderRepository;
  private productRepository: ProductRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
    this.productRepository = new ProductRepository();
  }

  public getAllOrders(): Order[] {
    return this.orderRepository.findAll();
  }

  public getOrderById(id: string): Order | undefined {
    return this.orderRepository.findById(id);
  }

  public getOrdersByCustomerId(customerId: string): Order[] {
    return this.orderRepository.findByCustomerId(customerId);
  }

  // Create a new order - includes stock validation
  public createOrder(customerId: string, items: OrderItem[]): Order | undefined {
    // First, validate stock for ALL items before making any changes
    for (const item of items) {
      const product = this.productRepository.findById(item.product.getId());
      if (!product) {
        console.error(`Product ${item.product.getId()} not found`);
        return undefined;
      }
      if (product.getStockQuantity() < item.quantity) {
        console.error(`Insufficient stock for product ${product.getName()}`);
        return undefined;
      }
    }

    // If all stock is available, reduce stock quantities
    for (const item of items) {
      const product = this.productRepository.findById(item.product.getId());
      if (product) {
        product.reduceStock(item.quantity);
        this.productRepository.save(product);
      }
    }

    // Create and save the order
    const orderId = 'order-' + Date.now();
    const order = new Order(orderId, customerId, items);
    return this.orderRepository.save(order);
  }

  // Process payment using ANY PaymentProcessor (Strategy Pattern in action!)
  public async processPayment(
    orderId: string, 
    paymentProcessor: PaymentProcessor
  ): Promise<boolean> {
    const order = this.orderRepository.findById(orderId);
    if (!order) {
      console.error(`Order ${orderId} not found`);
      return false;
    }
    if (order.getStatus() !== OrderStatus.PENDING) {
      console.error(`Order ${orderId} is already ${order.getStatus()}`);
      return false;
    }

    // Use the provided payment strategy to process payment
    const paymentSuccess = await paymentProcessor.processPayment(order.getTotalAmount());
    
    if (paymentSuccess) {
      order.updateStatus(OrderStatus.PAID);
      this.orderRepository.save(order);
      return true;
    }
    
    return false;
  }

  public updateOrderStatus(orderId: string, status: OrderStatus): Order | undefined {
    const order = this.orderRepository.findById(orderId);
    if (!order) return undefined;
    order.updateStatus(status);
    return this.orderRepository.save(order);
  }

  public deleteOrder(id: string): boolean {
    return this.orderRepository.deleteById(id);
  }
}
