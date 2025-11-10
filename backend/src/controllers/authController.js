import prisma from '../utils/prisma.js';
import { comparePassword } from '../utils/hash.js';
import { generateToken } from '../utils/jwt.js';
import { AuthError, ValidationError } from '../utils/errors.js';
import logger from '../utils/logger.js';

/**
 * Login user with email and password
 */
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      throw new ValidationError('Email and password are required');
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        password: true,
      },
    });

    if (!user) {
      throw new AuthError('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new AuthError('Invalid email or password');
    }

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    logger.success(`User logged in: ${user.email}`);

    res.json({
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Logout user (client-side token removal)
 */
export async function logout(req, res, next) {
  try {
    // In a stateless JWT system, logout is handled client-side
    // This endpoint exists for consistency and future session management
    logger.info(`User logged out: ${req.user?.email || 'unknown'}`);
    
    res.json({
      message: 'Logged out successfully',
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser(req, res, next) {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new AuthError('User not found');
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
}
