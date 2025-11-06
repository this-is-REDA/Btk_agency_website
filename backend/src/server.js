import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contact.js';
import projectRoutes from './routes/projects.js';

// Import middleware
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Import security middleware
import {
  corsOptions,
  apiLimiter,
  inputValidation,
  attackDetection,
  headerValidation,
  bruteForceProtection,
  contentTypeValidation,
  requestSizeValidation,
  securityLogging,
  helmetConfig
} from './middleware/security.js';

// Import database connection
import connectDB from './config/database.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Security middleware - Configuration avancée
app.use(helmetConfig);

// CORS sécurisé
app.use(cors(corsOptions));

// Middleware de sécurité
app.use(securityLogging);
app.use(headerValidation);
app.use(inputValidation);
app.use(attackDetection);
app.use(bruteForceProtection);
app.use(contentTypeValidation);
app.use(requestSizeValidation);

// Rate limiting avancé
app.use('/api/', apiLimiter);



// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Static files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'BTK Agency API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
}); 