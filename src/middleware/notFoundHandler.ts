import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    throw new AppError(`Not Found - ${req.originalUrl}`, 404);
};

