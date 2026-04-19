import express from 'express';
import { ProductController } from '../controllers/ProductController';

const router = express.Router();
const productController = new ProductController();

// Product routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

export default router;
