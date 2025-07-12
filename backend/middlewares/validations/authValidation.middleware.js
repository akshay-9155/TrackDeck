// backend/middlewares/validate.middleware.js
import { body } from 'express-validator';

export const validateRegister = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('gender').isIn(['male', 'female', 'other']).withMessage('Valid gender is required'),
    body('phoneNumber')
        .matches(/^\d{10}$/)
        .withMessage('Phone number must be a 10-digit number'),
];

export const validateLogin = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ];
