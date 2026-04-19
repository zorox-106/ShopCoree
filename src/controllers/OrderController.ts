import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';
import { ProductService } from '../services/ProductService';
import { UPIPaymentProcessor } from '../services/payment/UPIPaymentProcessor';
import { CreditCardPaymentProcessor } from '../services/payment/CreditCardPaymentProcessor';
import { OrderItem } from '../models/Order';

// OrderController - handles HTTP requests for Order operations, including checkout & payment
export class OrderController {
  private orderService: OrderService;
  private productService: ProductService;

  constructor() {
    this.orderService = new OrderService();
    this.productService = new ProductService();
  }

  // Get all orders
  public getAllOrders = (req: Request, res: Response): void => {
    const orders = this.orderService.getAllOrders();
    res.json(orders.map(o => ({
      id: o.getId(),
      customerId: o.getCustomerId(),
      items: o.getItems().map(i => ({
        productId: i.product.getId(),
        productName: i.product.getName(),
        quantity: i.quantity,
        price: i.product.getPrice()
      })),
      totalAmount: o.getTotalAmount(),
      status: o.getStatus(),
      createdAt: o.getCreatedAt()
    })));
  };

  // Get order by ID
  public getOrderById = (req: Request, res: Response): void => {
    const order = this.orderService.getOrderById(req.params.id as string);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.json({
      id: order.getId(),
      customerId: order.getCustomerId(),
      items: order.getItems().map(i => ({
        productId: i.product.getId(),
        productName: i.product.getName(),
        quantity: i.quantity,
        price: i.product.getPrice()
      })),
      totalAmount: order.getTotalAmount(),
      status: order.getStatus(),
      createdAt: order.getCreatedAt()
    });
  };

  // Get orders by customer ID
  public getOrdersByCustomerId = (req: Request, res: Response): void => {
    const orders = this.orderService.getOrdersByCustomerId(req.params.customerId as string);
    res.json(orders.map(o => ({
      id: o.getId(),
      totalAmount: o.getTotalAmount(),
      status: o.getStatus(),
      createdAt: o.getCreatedAt()
    })));
  };

  // Create a new order
  public createOrder = (req: Request, res: Response): void => {
    const { customerId, items } = req.body;
    if (!customerId || !items || items.length === 0) {
      res.status(400).json({ message: 'Customer ID and items are required' });
      return;
    }

    // Convert request items to OrderItem format
    const orderItems: OrderItem[] = [];
    for (const item of items) {
      const product = this.productService.getProductById(item.productId);
      if (!product) {
        res.status(404).json({ message: `Product ${item.productId} not found` });
        return;
      }
      orderItems.push({ product, quantity: item.quantity });
    }

    const order = this.orderService.createOrder(customerId, orderItems);
    if (!order) {
      res.status(400).json({ message: 'Order creation failed (insufficient stock or product not found)' });
      return;
    }

    res.status(201).json({
      message: 'Order created successfully',
      order: {
        id: order.getId(),
        totalAmount: order.getTotalAmount(),
        status: order.getStatus()
      }
    });
  };

  // Process payment for an order (uses Strategy Pattern!)
  public processPayment = async (req: Request, res: Response): Promise<void> => {
    const { orderId, paymentMethod, paymentDetails } = req.body;
    if (!orderId || !paymentMethod) {
      res.status(400).json({ message: 'Order ID and payment method are required' });
      return;
    }

    // Choose the appropriate PaymentProcessor based on paymentMethod (Strategy selection)
    let paymentProcessor;
    if (paymentMethod === 'upi') {
      if (!paymentDetails?.upiId) {
        res.status(400).json({ message: 'UPI ID is required for UPI payment' });
        return;
      }
      paymentProcessor = new UPIPaymentProcessor(paymentDetails.upiId);
    } else if (paymentMethod === 'creditcard') {
      if (!paymentDetails?.cardNumber || !paymentDetails?.cvv || !paymentDetails?.expiryDate) {
        res.status(400).json({ message: 'Card number, CVV, and expiry date are required for credit card payment' });
        return;
      }
      paymentProcessor = new CreditCardPaymentProcessor(
        paymentDetails.cardNumber,
        paymentDetails.cvv,
        paymentDetails.expiryDate
      );
    } else {
      res.status(400).json({ message: 'Invalid payment method (use "upi" or "creditcard")' });
      return;
    }

    const success = await this.orderService.processPayment(orderId, paymentProcessor);
    if (!success) {
      res.status(400).json({ message: 'Payment processing failed' });
      return;
    }

    res.json({ message: 'Payment processed successfully!' });
  };
}
