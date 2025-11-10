import { ForbiddenError } from '../utils/errors.js';

/**
 * Middleware to require specific role(s)
 * @param {...string} allowedRoles - Roles that are allowed to access the route
 * @returns {Function} Express middleware
 */
export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ForbiddenError('Authentication required'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ForbiddenError(`Access denied. Required roles: ${allowedRoles.join(', ')}`));
    }

    next();
  };
}

/**
 * Middleware to require admin role
 */
export function requireAdmin(req, res, next) {
  return requireRole('ADMIN')(req, res, next);
}

/**
 * Middleware to require maintenance role or admin
 */
export function requireMaintenance(req, res, next) {
  return requireRole('ADMIN', 'MAINTENANCE')(req, res, next);
}

/**
 * Middleware to require faculty role or above
 */
export function requireFaculty(req, res, next) {
  return requireRole('ADMIN', 'FACULTY')(req, res, next);
}

/**
 * Middleware to check if user is authorized to access their own resource
 * or if they are an admin
 */
export function requireOwnerOrAdmin(resourceUserIdField = 'userId') {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ForbiddenError('Authentication required'));
    }

    const resourceUserId = req.params[resourceUserIdField] || req.body[resourceUserIdField];
    
    if (req.user.role === 'ADMIN' || req.user.id === resourceUserId) {
      return next();
    }

    return next(new ForbiddenError('Access denied'));
  };
}
