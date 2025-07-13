// middlewares/validations/orderValidation.middleware.js
import { body } from 'express-validator';

export const validateCreateOrder = [
    body('productName')
        .notEmpty().withMessage('Product name is required'),

    body('productOriginalName')
        .notEmpty().withMessage('Original product name is required'),

    body('productLink')
        .optional()
        .isURL().withMessage('Product link must be a valid URL'),

    body('platform')
        .isIn(['Amazon', 'Flipkart', 'Meesho', 'Other'])
        .withMessage('Invalid platform'),

    body('price')
        .isFloat({ min: 0 }).withMessage('Price must be a positive number'),

    body('less')
        .isFloat({ min: 0 }).withMessage('Less must be a positive number'),

    body('orderDate')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Valid order date required'),

    body('orderFormDate')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Valid order form date is required'),

    body('deliveryDate')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Delivery date must be a valid date'),

    body('reviewStatus')
        .optional()
        .isIn(['Pending', 'Completed', 'Not Required'])
        .withMessage('Invalid review status'),

    body('ratingStatus')
        .optional()
        .isIn(['Pending', 'Completed', 'Not Required'])
        .withMessage('Invalid rating status'),

    body('refundFormDate')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Refund form date must be a valid date')
];



export const validateUpdateOrder = [
    body('deliveryDate')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Invalid delivery date'),

    body('isDelivered')
        .optional()
        .isBoolean()
        .withMessage('isDelivered must be true or false'),

    body('reviewStatus')
        .optional()
        .isIn(['Pending', 'Completed', 'Not Required'])
        .withMessage('Invalid review status'),

    body('reviewText')
        .optional()
        .isString()
        .withMessage('Review text must be a string'),

    body('reviewScreenshot')
        .optional()
        .isURL()
        .withMessage('Review screenshot must be a valid URL'),

    body('ratingStatus')
        .optional()
        .isIn(['Pending', 'Completed', 'Not Required'])
        .withMessage('Invalid rating status'),

    body('ratingScreenshot')
        .optional()
        .isURL()
        .withMessage('Rating screenshot must be a valid URL'),

    body('refundStatus')
        .optional()
        .isIn(['Not Applied', 'Applied', 'Received', 'Rejected'])
        .withMessage('Invalid refund status'),

    body('refundAmount')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Refund amount must be positive'),

    body('refundFormDate')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Refund form date must be a valid date'),

    body('refundAppliedDate')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Refund applied date must be a valid date'),

    body('refundReceivedDate')
        .optional()
        .isISO8601()
        .toDate()
        .withMessage('Refund received date must be a valid date'),

    body('refundProof')
        .optional()
        .isURL()
        .withMessage('Refund proof must be a valid URL'),

    body('notes')
        .optional()
        .isString()
        .withMessage('Notes must be a string')
];
