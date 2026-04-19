import { Order } from '../models/Order';
import { MockDatabase } from '../config/MockDatabase';

export class OrderRepository {
  private db: MockDatabase;

  constructor() {
    this.db = MockDatabase.getInstance();
  }

  public findAll(): Order[] {
    return Array.from(this.db.getOrders().values());
  }

  public findById(id: string): Order | undefined {
    return this.db.getOrders().get(id);
  }

  public findByCustomerId(customerId: string): Order[] {
    return Array.from(this.db.getOrders().values()).filter(o => o.getCustomerId() === customerId);
  }

  public save(order: Order): Order {
    this.db.getOrders().set(order.getId(), order);
    return order;
  }

  public deleteById(id: string): boolean {
    return this.db.getOrders().delete(id);
  }
}
