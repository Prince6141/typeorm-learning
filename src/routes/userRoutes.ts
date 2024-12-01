import { Router } from 'express';
import { registerUser, loginUser, getCurrentUser } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';
import asyncHandler from 'express-async-handler';

export const userRouter = Router();

userRouter.post('/register', asyncHandler(registerUser));
userRouter.post('/login', asyncHandler(loginUser));
userRouter.get('/me', protect, asyncHandler(getCurrentUser));

