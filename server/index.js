  import express from 'express';
  import cors from 'cors';
  import dotenv from 'dotenv';
  import cookieParser from 'cookie-parser';
  import path, { dirname } from 'path';
  import { fileURLToPath } from 'url';
  import morgan from 'morgan';
  // Import route files
  import connectDB from './config/db.js';
  import userRoutes from './routes/user.routes.js';
  import hotelRoutes from './routes/hotel.routes.js';
  import packageRoutes from './routes/package.routes.js';
  import routePlaces from './routes/places.routes.js';
  import feedBackRoutes from './routes/feedback.routes.js';
  import galleryRoutes from './routes/gallery.routes.js';
  import heroRoutes from './routes/herobanner.routes.js';
  import adminRoutes from './routes/admin.routes.js'
  import companyVerificationRoutes from './routes/company.verifiction.routes.js'
  import hotelVerificationRoutes from './routes/hotel.verification.js'
  import roomRoutes from './routes/room.routes.js'

  // Environment config
  dotenv.config();

  // Required for __dirname in ES modules
  const __filename = fileURLToPath(
      import.meta.url);
  const __dirname = dirname(__filename);

  // Create app
  const app = express();

  // Connect to MongoDB
  connectDB();

  // Middlewares
  app.use(cookieParser());
  app.use(morgan());
  app.use(cors({
      origin: 'http://localhost:5173',
      credentials: true
  }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Static folder to serve image files
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  // Basic API response
  app.get('/', (req, res) => {
      res.json({
          message: "Welcome to the API"
      });
  });

  // Routes
  app.use('/api', adminRoutes);
  app.use('/api', userRoutes);
  app.use('/api', hotelRoutes);
  app.use('/api', packageRoutes);
  app.use('/api', routePlaces);
  app.use('/api', feedBackRoutes);
  app.use('/api', galleryRoutes);
  app.use('/api', heroRoutes);
  app.use('/api', companyVerificationRoutes);
  app.use('/api', hotelVerificationRoutes);
  app.use('/api', roomRoutes);

  // Start server
  const port = process.env.PORT || 2000;
  app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
  });