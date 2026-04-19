import { User } from '../models/User';
import { Customer } from '../models/Customer';
import { Admin } from '../models/Admin';
import { Product } from '../models/Product';
import { Order } from '../models/Order';

// Singleton pattern for MockDatabase - only one instance throughout the app
export class MockDatabase {
  private static instance: MockDatabase;
  
  // In-memory data stores using Maps for O(1) lookups by ID
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private orders: Map<string, Order>;

  private constructor() {
    this.users = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.initializeMockData();
  }

  // Get the singleton instance
  public static getInstance(): MockDatabase {
    if (!MockDatabase.instance) {
      MockDatabase.instance = new MockDatabase();
    }
    return MockDatabase.instance;
  }

  // Populate with realistic, human-like mock data
  private initializeMockData(): void {
    // 1. Users (Admin + Customer)
    const admin = new Admin(
      'admin-001',
      'Sarah Chen',
      'sarah.chen@shopcore.com',
      'Inventory & Operations'
    );
    this.users.set(admin.getId(), admin);

    const customer1 = new Customer(
      'cust-001',
      'Marcus Johnson',
      'marcus.j@protonmail.com',
      '452 Oak St, Apt 12, San Francisco, CA 94102',
      '+1 (415) 555-1234'
    );
    this.users.set(customer1.getId(), customer1);

    const customer2 = new Customer(
      'cust-002',
      'Aisha Patel',
      'aisha.patel@gmail.com',
      '128 Pine Ave, Brooklyn, NY 11201',
      '+1 (718) 555-5678'
    );
    this.users.set(customer2.getId(), customer2);

    // 2. Products (Premium Tech Accessories - Realistic names, prices, categories)
    const products = [
      new Product(
        'prod-001',
        'Keychron K8 Pro QMK/VIA',
        'Hot-swappable wireless mechanical keyboard with aluminum frame, Gateron G Pro switches, and per-key RGB',
        199.00,
        12,
        'Keyboards'
      ),
      new Product(
        'prod-002',
        'Anker 737 Power Bank (PowerCore 24K)',
        '24,000mAh portable charger with 140W output, 3 ports, and digital display',
        149.99,
        25,
        'Power'
      ),
      new Product(
        'prod-003',
        'Sony WH-1000XM5 Wireless Headphones',
        'Industry-leading noise cancellation, 30hr battery, premium comfort, and crystal-clear call quality',
        399.99,
        8,
        'Audio'
      ),
      new Product(
        'prod-004',
        'CalDigit TS4 Thunderbolt 4 Dock',
        '18 ports, 98W charging, dual 4K@60Hz display support for ultimate workstation setup',
        399.99,
        6,
        'Docks'
      ),
      new Product(
        'prod-005',
        'Logitech MX Master 3S for Mac',
        'Ergonomic wireless mouse with 8000 DPI sensor, MagSpeed scrolling, and macOS optimizations',
        99.99,
        18,
        'Mice'
      ),
      new Product(
        'prod-006',
        'Satechi USB4 Pro Multiport Adapter',
        'Compact USB4 adapter with 8K HDMI, 2.5G Ethernet, 100W PD, and card reader',
        79.99,
        22,
        'Adapters'
      )
    ];
    products.forEach(p => this.products.set(p.getId(), p));
  }

  // Public getters for the data stores (encapsulated access)
  public getUsers(): Map<string, User> { return this.users; }
  public getProducts(): Map<string, Product> { return this.products; }
  public getOrders(): Map<string, Order> { return this.orders; }
}
