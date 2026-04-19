import express from 'express';
import { OrderController } from '../controllers/OrderController';

const router = express.Router();
const orderController = new OrderController();

// Order routes
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.get('/customer/:customerId', orderController.getOrdersByCustomerId);
router.post('/', orderController.createOrder);
router.post('/payment', orderController.processPayment);

export default router;
