import logger from '../utils/logger.js';
import { ValidationError, AuthError, ForbiddenError, NotFoundError } from '../utils/errors.js';

/**
 * Global error handler middleware
 * Catches all errors and formats them consistently
 */
export function errorHandler(err, req, res, next) {
  // Log the error
  logger.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    userId: req.user?.id,
  });

  // Default error
  let statusCode = 500;
  let message = 'Internal server error';

  // Handle specific error types
  if (err instanceof ValidationError) {
    statusCode = 400;
    message = err.message;
  } else if (err instanceof AuthError) {
    statusCode = 401;
    message = err.message;
  } else if (err instanceof ForbiddenError) {
    statusCode = 403;
    message = err.message;
  } else if (err instanceof NotFoundError) {
    statusCode = 404;
    message = err.message;
  } else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  } else if (err.code === 'P2002') {
    // Prisma unique constraint violation
    statusCode = 409;
    message = 'Resource already exists';
  } else if (err.code === 'P2025') {
    // Prisma record not found
    statusCode = 404;
    message = 'Resource not found';
  } else if (err.message) {
    message = err.message;
  }

  // Send error response
  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

export default errorHandler;
