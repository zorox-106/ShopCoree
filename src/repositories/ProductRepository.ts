import { Product } from '../models/Product';
import { MockDatabase } from '../config/MockDatabase';

export class ProductRepository {
  private db: MockDatabase;

  constructor() {
    this.db = MockDatabase.getInstance();
  }

  public findAll(): Product[] {
    return Array.from(this.db.getProducts().values());
  }

  public findById(id: string): Product | undefined {
    return this.db.getProducts().get(id);
  }

  public save(product: Product): Product {
    this.db.getProducts().set(product.getId(), product);
    return product;
  }

  public deleteById(id: string): boolean {
    return this.db.getProducts().delete(id);
  }
}
