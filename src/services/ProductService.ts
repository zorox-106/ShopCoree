import { Product } from '../models/Product';
import { ProductRepository } from '../repositories/ProductRepository';

// ProductService - business logic for Product operations
export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  public getAllProducts(): Product[] {
    return this.productRepository.findAll();
  }

  public getProductById(id: string): Product | undefined {
    return this.productRepository.findById(id);
  }

  public createProduct(product: Product): Product {
    return this.productRepository.save(product);
  }

  public deleteProduct(id: string): boolean {
    return this.productRepository.deleteById(id);
  }
}
