import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5174',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'KUSMS API is running',
    timestamp: new Date().toISOString(),
  });
});

// API routes
import authRoutes from './routes/auth.js';
import bookingRoutes from './routes/bookings.js';
import facilityRoutes from './routes/facilities.js';
import eventRoutes from './routes/events.js';
import maintenanceRoutes from './routes/maintenance.js';
import userRoutes from './routes/users.js';
import dashboardRoutes from './routes/dashboard.js';
import notificationRoutes from './routes/notifications.js';

app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/facilities', facilityRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/notifications', notificationRoutes);

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to KUSMS API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      users: '/api/users',
      bookings: '/api/bookings',
      facilities: '/api/facilities',
      events: '/api/events',
      maintenance: '/api/maintenance',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.url} not found`,
  });
});

// Global error handler
import errorHandler from './middleware/errorHandler.js';
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 KUSMS Backend API running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
