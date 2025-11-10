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
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
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

// API routes will be added here
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to KUSMS API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
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

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.name || 'Internal Server Error',
    message: err.message || 'Something went wrong',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 KUSMS Backend API running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
