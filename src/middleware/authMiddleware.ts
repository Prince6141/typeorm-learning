import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/appError';

export const protect = (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        throw new AppError('Not authorized, no token', 401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        req.user = { id: decoded.id };
        next();
    } catch (error) {
        throw new AppError('Not authorized, token failed', 401);
    }
};

