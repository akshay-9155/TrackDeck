// middlewares/validations/orderValidation.middleware.js
import { body } from 'express-validator';

export const validateCreateOrder = [
    // body('feedbackType')
    //     .notEmpty().withMessage('Feedback type is required')
    //     .isIn(['Rating', 'ReviewLive', 'Review', 'Other'])
    //     .withMessage('Invalid feedback type'),

    // body('productOrderId').notEmpty().withMessage('Order ID is required'),
    // body('productDisplayName').notEmpty().withMessage('Display name is required'),
    // body('productOriginalName').notEmpty().withMessage('Original name is required'),
    // body('productLink').optional().isURL().withMessage('Invalid product link'),

    // body('productPlatform')
    //     .notEmpty()
    //     .isIn(['Amazon', 'Flipkart', 'Meesho', 'Other'])
    //     .withMessage('Invalid product platform'),

    // body('productCondition')
    //     .notEmpty()
    //     .isIn(['Original', 'Exchange', 'Semi Empty', 'Empty', 'Other'])
    //     .withMessage('Invalid product condition'),

    // body('productPrice').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    // body('productLess').isFloat().withMessage('Less must be a number'),

    // body('dealerName').notEmpty().withMessage('Dealer name is required'),
    // body('dealerPhoneNumber').optional().isString(),
    // body('dealerTelegramId').optional().isString(),
    // body('dealerPlatform').notEmpty().isIn(['Telegram', 'Whatsapp']).withMessage('Invalid dealer platform'),

    // body('orderPlacedAt').optional().isISO8601().toDate(),
    // body('formSubmittedAt').optional().isISO8601().toDate(),
    // body('deliveryDate').optional().isISO8601().toDate(),
    // body('isDelivered').optional().isBoolean(),

    // body('reviewStatus').optional().isIn(['Pending', 'Completed', 'Not Required']),
    // body('reviewText').optional().isString(),
    // body('reviewScreenshot').optional().isURL(),

    // body('ratingStatus').optional().isIn(['Pending', 'Completed', 'Not Required']),
    // body('ratingScreenshot').optional().isURL(),

    // body('sellerFeedbackStatus').optional().isIn(['Pending', 'Completed', 'Not Required']),
    // body('sellerFeedbackScreenshot').optional().isURL(),

    // body('refundStatus').optional().isIn(['Pending', 'Received', 'Rejected']),
    // body('refundAmount').optional().isFloat({ min: 0 }),
    // body('refundFormSubmittedAt').optional().isISO8601().toDate(),
    // body('refundReceivedAt').optional().isISO8601().toDate(),
    // body('refundProof').optional().isURL(),

    // body('notes').optional().isString()
];

export const validateUpdateOrder = [
    body('feedbackType')
        .optional()
        .isIn(['Rating', 'ReviewLive', 'Review', 'Other'])
        .withMessage('Invalid feedback type'),

    body('productPlatform')
        .optional()
        .isIn(['Amazon', 'Flipkart', 'Meesho', 'Other'])
        .withMessage('Invalid product platform'),

    body('productCondition')
        .optional()
        .isIn(['Original', 'Exchange', 'Semi Empty', 'Empty', 'Other'])
        .withMessage('Invalid product condition'),

    body('productPrice')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),

    body('productLess')
        .isFloat()
        .withMessage('Less must be a number'),

    body('dealerInfoName')
        .optional()
        .isString()
        .withMessage('Dealer name must be a string'),

    body('dealerInfoPhoneNumber')
        .optional()
        .isMobilePhone()
        .withMessage('Invalid dealer phone number'),

    body('dealerInfoTelegramId')
        .optional()
        .isString()
        .withMessage('Telegram ID must be a string'),

    body('dealerPlatform')
        .optional()
        .isIn(['Telegram', 'Whatsapp'])
        .withMessage('Invalid dealer platform'),

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

    body('sellerFeedbackStatus')
        .optional()
        .isIn(['Pending', 'Completed', 'Not Required'])
        .withMessage('Invalid seller feedback status'),

    body('sellerFeedbackScreenshot')
        .optional()
        .isURL()
        .withMessage('Seller feedback screenshot must be a valid URL'),

    body('refundStatus')
        .optional()
        .isIn(['Pending', 'Received', 'Rejected'])
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


