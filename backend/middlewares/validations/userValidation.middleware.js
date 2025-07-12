// backend/middlewares/validateUpdateProfile.js
import { body } from 'express-validator';

export const validateUpdateProfile = [
    body('name')
        .optional()
        .isString()
        .trim()
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),

    body('gender')
        .optional()
        .isIn(['male', 'female', 'other'])
        .withMessage('Gender must be male, female, or other'),

    body('phoneNumber')
        .optional()
        .matches(/^\d{10}$/)
        .withMessage('Phone number must be a valid 10-digit number')
];

export const validateUpdatePassword = [
    body('currentPassword')
        .notEmpty()
        .withMessage('Current password is required'),

    body('newPassword')
        .isLength({ min: 6 })
        .withMessage('New password must be at least 6 characters long')
];
