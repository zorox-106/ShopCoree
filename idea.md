# ShopCore E-commerce System (sesd-ecommerce-system)
A premium tech accessories e-commerce platform built with modern software engineering practices.

## Grading Rubric Breakdown
- **75% Backend** (Node.js, Express, TypeScript)
- **25% Frontend** (React, Vite)

## Tech Stack
### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **Data Storage**: In-memory (mocked with singleton pattern)
### Frontend
- **Library**: React
- **Build Tool**: Vite
- **Styling**: Custom CSS (no external libraries)

## Architectural Principles
### 1. Layered Architecture
Strict separation of concerns:
```
src/
├── routes/          # HTTP routing layer
├── controllers/     # Request/response handling
├── services/        # Business logic layer
│   └── payment/     # Payment strategy implementations
├── repositories/    # Data access layer
├── models/          # Domain models (OOP)
├── config/          # Configuration (MockDatabase)
└── index.ts         # Entry point
```

### 2. OOP Principles
- **Encapsulation**: All model fields are private, accessed via getters/setters
- **Inheritance**: Abstract `User` base class → `Admin` and `Customer` subclasses
- **Polymorphism**: Both `Admin` and `Customer` implement `getDisplayInfo()`

### 3. Design Patterns
- **Strategy Pattern**: `PaymentProcessor` interface with `UPIPaymentProcessor` and `CreditCardPaymentProcessor`
- **Singleton Pattern**: `MockDatabase` class ensures only one data store instance
- **Repository Pattern**: Abstracts data access for User/Product/Order

## Domain Models
### User Hierarchy
- **User (abstract)**: Base class with id, name, email, role, createdAt
  - **Customer**: Adds shippingAddress, phoneNumber
  - **Admin**: Adds department
### Other Models
- **Product**: id, name, description, price, stockQuantity, category
- **Order**: id, customerId, items (OrderItem[]), status (OrderStatus enum), totalAmount, createdAt

## Mock Data
### Products (Premium Tech Accessories)
- Keychron K8 Pro QMK/VIA Mechanical Keyboard ($199)
- Anker 737 Power Bank (PowerCore 24K) ($149.99)
- Sony WH-1000XM5 Wireless Headphones ($399.99)
- CalDigit TS4 Thunderbolt 4 Dock ($399.99)
- Logitech MX Master 3S for Mac ($99.99)
- Satechi USB4 Pro Multiport Adapter ($79.99)

### Users
- **Admin**: Sarah Chen (Inventory & Operations)
- **Customers**: Marcus Johnson, Aisha Patel

## API Endpoints
### Root
- `GET /`: Health check + API documentation
### Users
- `GET /api/users`: Get all users
- `GET /api/users/:id`: Get user by ID
- `POST /api/users/login`: Mock login (email only)
### Products
- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get product by ID
### Orders
- `GET /api/orders`: Get all orders
- `GET /api/orders/:id`: Get order by ID
- `GET /api/orders/customer/:customerId`: Get orders by customer ID
- `POST /api/orders`: Create a new order (validates stock first)
- `POST /api/orders/payment`: Process payment for an order (uses Strategy Pattern)

## Frontend Features
- Product grid with modern card styling
- Interactive cart (add/remove items, update quantities)
- Live total calculation
- Checkout flow (order creation + payment processing)
- Responsive design (mobile-friendly)
- Modern UI: gradients, soft shadows, hover states

## Getting Started
### Backend
```bash
cd sesd
npm install
npm run dev
# Server runs at http://localhost:3000
```
### Frontend
```bash
cd frontend
npm install
npm run dev
# Frontend runs at http://localhost:5173
```
