// backend/controllers/order.controller.js
import { validationResult } from 'express-validator';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { validateObjectId } from '../utils/helper.js';
import { Order } from '../models/order.model.js';

export const createOrder = asyncHandler(async (req, res) => {
    // 1️⃣ Validate inputs from express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(422, errors.array()[0].msg);
    }

    const {
        productName,
        productOriginalName,
        productLink,
        platform,
        price,
        less,
        orderDate,
        orderFormDate,
        deliveryDate,
        reviewStatus,
        ratingStatus,
        refundFormDate
    } = req.body;

    // 2️⃣ Create and save order
    const newOrder = await Order.create({
        user: req.user._id, // set by authenticate middleware
        productName,
        productOriginalName,
        productLink,
        platform,
        price,
        less,
        orderDate,
        orderFormDate,
        deliveryDate,
        reviewStatus,
        ratingStatus,
        refundFormDate
    });

    // 3️⃣ Return response
    return res.status(201).json(
        new ApiResponse(201, newOrder, "Order created successfully")
    );
});


export const getAllOrders = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    // ✅ Query params for filtering & pagination
    const {
        platform,
        refundStatus,
        reviewStatus,
        ratingStatus,
        sort = 'desc',
        page = 1,
        limit = 10,
        startDate,
        endDate
    } = req.query;

    const filter = { user: userId };

    // Apply filters
    if (platform) filter.platform = platform;
    if (refundStatus) filter.refundStatus = refundStatus;
    if (reviewStatus) filter.reviewStatus = reviewStatus;
    if (ratingStatus) filter.ratingStatus = ratingStatus;

    // Date range filter
    if (startDate || endDate) {
        filter.orderDate = {};
        if (startDate) filter.orderDate.$gte = new Date(startDate);
        if (endDate) filter.orderDate.$lte = new Date(endDate);
    }

    const parsedPage = Math.max(1, parseInt(page) || 1);
    const parsedLimit = Math.max(1, parseInt(limit) || 10);
    const skip = (parsedPage - 1) * parsedLimit;

    // Fetch orders & total
    const [orders, total] = await Promise.all([
        Order.find(filter)
            .sort({ createdAt: sort === 'asc' ? 1 : -1 })
            .skip(skip)
            .limit(parsedLimit),
        Order.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / parsedLimit);

    return res.status(200).json(
        new ApiResponse(200, {
            orders,
            pagination: {
                total,
                page: parsedPage,
                totalPages,
                limit: parsedLimit
            }
        }, "Orders fetched successfully")
    );
});

  
export const getOrderById = asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const userId = req.user._id;

    // ✅ Validate MongoDB ObjectId format
    if (!validateObjectId(orderId)) {
        throw new ApiError(400, "Invalid Order ID");
    }

    const order = await Order.findOne({ _id: orderId, user: userId });

    if (!order) {
        throw new ApiError(404, "Order not found or access denied");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, order, "Order retrieved successfully"));
});

export const updateOrder = asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const userId = req.user._id;

    // 🔍 Validate ObjectId
    if (!validateObjectId(orderId)) {
        throw new ApiError(400, "Invalid Order ID");
    }

    // ✅ Validate request body using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(422, errors.array()[0].msg);
    }

    // 🔐 Find the order belonging to the current user
    const order = await Order.findOne({ _id: orderId, user: userId });
    if (!order) {
        throw new ApiError(404, "Order not found or access denied");
    }

    // 🔁 Update only the allowed fields
    const updatableFields = [
        'deliveryDate', 'isDelivered',
        'reviewStatus', 'reviewText', 'reviewScreenshot',
        'ratingStatus', 'ratingScreenshot',
        'refundStatus', 'refundAmount', 'refundFormDate',
        'refundAppliedDate', 'refundReceivedDate', 'refundProof',
        'notes'
    ];

    updatableFields.forEach(field => {
        if (req.body[field] !== undefined) {
            order[field] = req.body[field];
        }
    });

    await order.save();

    return res.status(200).json(
        new ApiResponse(200, order, "Order updated successfully")
    );
});

export const deleteOrder = asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const currentUser = req.user; // Set by verifyJWT middleware

    // 🔍 Validate ObjectId
    if (!validateObjectId(orderId)) {
        throw new ApiError(400, "Invalid Order ID");
    }

    // 🔐 Fetch the order
    const order = await Order.findById(orderId);
    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    // 🔐 Check permission: either the owner or an admin
    if (order.user.toString() !== currentUser._id.toString() && currentUser.role !== 'admin') {
        throw new ApiError(403, "You are not authorized to delete this order");
    }

    // ❌ Delete
    await order.deleteOne();

    return res.status(200).json(
        new ApiResponse(200, {}, "Order deleted successfully")
    );
});

export const getOrderSummary = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const isAdmin = req.user.role === 'admin';

    const matchCriteria = isAdmin ? {} : { user: userId };

    const [
        totalOrders,
        deliveredOrders,
        pendingReviews,
        pendingRatings,
        refundApplied,
        refundReceived,
        refundSummary
    ] = await Promise.all([
        Order.countDocuments(matchCriteria),
        Order.countDocuments({ ...matchCriteria, isDelivered: true }),
        Order.countDocuments({ ...matchCriteria, reviewStatus: 'Pending' }),
        Order.countDocuments({ ...matchCriteria, ratingStatus: 'Pending' }),
        Order.countDocuments({ ...matchCriteria, refundStatus: 'Applied' }),
        Order.countDocuments({ ...matchCriteria, refundStatus: 'Received' }),
        Order.aggregate([
            { $match: { ...matchCriteria, refundStatus: 'Received' } },
            {
                $group: {
                    _id: null,
                    totalRefundAmount: { $sum: '$refundAmount' }
                }
            }
        ])
    ]);

    const totalRefundAmount = refundSummary[0]?.totalRefundAmount || 0;

    return res.status(200).json(
        new ApiResponse(200, {
            totalOrders,
            deliveredOrders,
            pendingReviews,
            pendingRatings,
            refundApplied,
            refundReceived,
            totalRefundAmount
        }, "Order summary fetched successfully")
    );
});
