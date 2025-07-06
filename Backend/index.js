import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoute.js';

// App Config
const app = express();
const PORT = process.env.PORT || 4000;

// Connect to DB and Cloudinary
connectDB();
connectCloudinary();

// ✅ Allowed Frontend Origins
const allowedOrigins = [
  'https://e-commerce-frontend-seven-iota.vercel.app',
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

// ✅ CORS
app.use(cors(corsOptions));

// ✅ JSON Parser
app.use(express.json());

// ✅ API Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// ✅ Root Endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Backend API');
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
