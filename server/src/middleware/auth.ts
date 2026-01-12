import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { UserRole } from '../models/User';
import dotenv from 'dotenv';

dotenv.config(); // Ensure dotenv is loaded here

interface DecodedToken {
  id: string;
  role: UserRole;
  iat: number;
  exp: number;
}

// Extend the Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: UserRole;
      };
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  const JWT_SECRET = process.env.JWT_SECRET;
  console.log('Protect middleware triggered.');
  console.log('JWT_SECRET from env:', JWT_SECRET); // Log the secret from env

  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables.');
    return res.status(500).json({ message: 'Server configuration error: JWT_SECRET missing.' });
  }

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      console.log('Token received:', token);

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET as string) as DecodedToken;
      console.log('Token decoded:', decoded);

      // Attach user from token to the request
      req.user = { id: decoded.id, role: decoded.role };

      next();
    } catch (error: any) {
      console.error('Token verification failed:', error.message);
      res.status(401).json({ message: 'Not authorized, token failed: ' + error.message });
    }
  }

  if (!token) {
    console.log('No token received.');
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const authorize = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log('Authorize middleware triggered.');
    console.log('Required roles:', roles);
    console.log('User from req.user:', req.user); // Log the user object

    if (!req.user) {
      console.error('Authorization failed: No user attached to request.');
      return res.status(403).json({ message: 'Not authorized, user not authenticated.' });
    }
    
    if (!roles.includes(req.user.role)) {
      console.error(`Authorization failed: User role ${req.user.role} not in required roles ${roles.join(', ')}.`);
      return res.status(403).json({ message: `User role ${req.user.role} is not authorized to access this route` });
    }
    next();
  };
};
