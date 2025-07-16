import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoute.js';

import path from 'path';
import { fileURLToPath } from 'url';

// App Config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Required if using ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from Frontend/dist
app.use(express.static(path.join(__dirname, '../Frontend/dist')));

// Handle all other routes with index.html (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
});

// Middleware
app.use(cors({
  origin: ['https://e-commerce-frontend-3qva.onrender.com', 'https://e-commerce-admin-tamr.onrender.com'],
  credentials: true, // Only if you're using cookies or sessions
}));

app.use(express.json());

// api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// api endpoints
app.get('/', (req, res) => {
  res.send('Welcome to the Backend API');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});