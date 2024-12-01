import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            statusCode: err.statusCode,
            message: err.message,
            errors: err.errors,
        });
    }

    console.error(err);

    res.status(500).json({
        status: 'error',
        statusCode: 500,
        message: 'Internal server error',
    });
};

