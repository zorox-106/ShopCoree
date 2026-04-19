import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';

// ProductController - handles HTTP requests for Product operations
export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  // Get all products
  public getAllProducts = (req: Request, res: Response): void => {
    const products = this.productService.getAllProducts();
    res.json(products.map(p => ({
      id: p.getId(),
      name: p.getName(),
      description: p.getDescription(),
      price: p.getPrice(),
      stockQuantity: p.getStockQuantity(),
      category: p.getCategory()
    })));
  };

  // Get product by ID
  public getProductById = (req: Request, res: Response): void => {
    const product = this.productService.getProductById(req.params.id as string);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json({
      id: product.getId(),
      name: product.getName(),
      description: product.getDescription(),
      price: product.getPrice(),
      stockQuantity: product.getStockQuantity(),
      category: product.getCategory()
    });
  };
}
