import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
// Enable CORS for both localhost and Vercel frontend
app.use(cors({ origin: ['http://localhost:5173', 'https://sesd-inky.vercel.app'] }));
app.use(express.json());

// Root health check endpoint with API documentation
app.get('/', (req, res) => {
  res.json({ 
    name: 'ShopCore API',
    description: 'Premium Tech Accessories E-commerce System',
    status: 'online',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      products: '/api/products',
      orders: '/api/orders'
    }
  });
});

// Mount API routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 ShopCore API running on http://localhost:${PORT}`);
});

export default app;
