import { Request, Response } from 'express'
import { User } from '../entity/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validate } from 'class-validator'
import { AppError } from '../utils/appError'
import { AppDataSource } from '../data-source'

const userRepository = AppDataSource.getRepository(User)

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    const existingUser = await userRepository.findOne({ where: { email } })
    if (existingUser) {
        throw new AppError('User already exists', 400)
    }

    const user = new User()
    user.name = name
    user.email = email
    user.password = await bcrypt.hash(password, 10)

    const errors = await validate(user)
    if (errors.length > 0) {
        throw new AppError('Validation error', 400, errors)
    }

    await userRepository.save(user)

    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    })
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await userRepository.findOne({ where: { email } })
    if (!user) {
        throw new AppError('Invalid credentials', 401)
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
        throw new AppError('Invalid credentials', 401)
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1d' })

    res.json({
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        token,
    })
}

export const getCurrentUser = async (req: Request, res: Response) => {
    const user = await userRepository.findOne({ where: { id: req.user!.id } })

    if (!user) {
        throw new AppError('User not found', 404)
    }

    res.json({
        id: user.id,
        name: user.name,
        email: user.email,
    })
}

