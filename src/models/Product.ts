// Product model for our premium tech accessories store
export class Product {
  private readonly id: string;
  private name: string;
  private description: string;
  private price: number; // in USD
  private stockQuantity: number;
  private category: string;

  constructor(
    id: string,
    name: string,
    description: string,
    price: number,
    stockQuantity: number,
    category: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stockQuantity = stockQuantity;
    this.category = category;
  }

  // Getters
  public getId(): string { return this.id; }
  public getName(): string { return this.name; }
  public getDescription(): string { return this.description; }
  public getPrice(): number { return this.price; }
  public getStockQuantity(): number { return this.stockQuantity; }
  public getCategory(): string { return this.category; }

  // Setters (with validation for business logic)
  public setName(name: string): void { this.name = name; }
  public setDescription(desc: string): void { this.description = desc; }
  public setPrice(price: number): void { 
    if (price < 0) throw new Error("Price cannot be negative");
    this.price = price; 
  }
  public setStockQuantity(quantity: number): void { 
    if (quantity < 0) throw new Error("Stock cannot be negative");
    this.stockQuantity = quantity; 
  }

  // Business method to reduce stock when an order is placed
  public reduceStock(quantity: number): boolean {
    if (this.stockQuantity >= quantity) {
      this.stockQuantity -= quantity;
      return true;
    }
    return false; // Not enough stock
  }
}
