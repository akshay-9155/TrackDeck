// backend/controllers/order.controller.js
import { validationResult } from "express-validator";
import asyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { getBeforeDate, validateObjectId } from "../utils/helper.js";
import { Order } from "../models/order.model.js";

export const createOrder = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(422, errors.array()[0].msg);
  }

  const {
    feedbackType,
    productOrderId,
    productDisplayName,
    productOriginalName,
    productAccountInfo,
    productLink,
    productPlatform,
    productCondition,
    productPrice,
    productLess,
    dealerName,
    dealerPhoneNumber,
    dealerTelegramId,
    dealerPlatform,
    orderPlacedAt,
    formSubmittedAt,
    deliveryDate,
    isDelivered,
    reviewStatus,
    reviewText,
    reviewScreenshot,
    ratingStatus,
    ratingScreenshot,
    sellerFeedbackStatus,
    sellerFeedbackScreenshot,
    refundStatus,
    refundFormSubmittedAt,
    refundReceivedAt,
    refundProof,
    notes,
  } = req.body;

  const existingOrder = await Order.findOne({
    "product.orderId": productOrderId,
    user: req.user._id,
    status: { $ne: "deleted" },
  });
  if (existingOrder && existingOrder.status === "bin") {
    throw new ApiError(
      409,
      "An order with this ID is in the bin. Please check your bin or choose a different Order ID.",
    );
  }
  if (existingOrder) {
    throw new ApiError(409, "Order with this ID already exists.");
  }
  // Calculate refund amount
  const price = Number(productPrice);
  const less = Number(productLess);

  // If price or less is not a valid number, default to 0 for calculation
  const refundAmount = isNaN(price) || isNaN(less) ? 0 : price - less;

  const newOrder = await Order.create({
    user: req.user._id,
    feedback: {
      type: feedbackType,
    },
    product: {
      orderId: productOrderId,
      displayName: productDisplayName,
      originalName: productOriginalName,
      accountInfo: productAccountInfo,
      link: productLink,
      platform: productPlatform,
      condition: productCondition,
      price: productPrice,
      less: productLess,
    },
    dealer: {
      info: {
        name: dealerName,
        phoneNumber: dealerPhoneNumber,
        telegramId: dealerTelegramId,
      },
      platform: dealerPlatform,
    },
    timeline: {
      orderPlacedAt,
      formSubmittedAt,
      deliveryDate,
      isDelivered,
    },
    review: {
      status: reviewStatus,
      text: reviewText,
      screenshot: reviewScreenshot,
    },
    rating: {
      status: ratingStatus,
      screenshot: ratingScreenshot,
    },
    sellerFeedback: {
      status: sellerFeedbackStatus,
      screenshot: sellerFeedbackScreenshot,
    },
    refund: {
      status: refundStatus,
      amount: refundAmount,
      formSubmittedAt: refundFormSubmittedAt,
      receivedAt: refundReceivedAt,
      proof: refundProof,
    },
    notes,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newOrder, "Order created successfully"));
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // ✅ Query params for filtering & pagination
  const {
    orderId,
    platform,
    refundStatus,
    reviewStatus,
    ratingStatus,
    sellerFeedbackStatus,
    sort = "desc",
    page = 1,
    limit = 10,
    startDate,
    endDate,
  } = req.query;

  // 🔍 Filter object for nested schema
  const filter = { user: userId, status: { $nin: ["deleted", "bin"] } };

  if (orderId) filter["product.orderId"] = orderId;
  if (platform) filter["product.platform"] = platform;
  if (refundStatus) filter["refund.status"] = refundStatus;
  if (reviewStatus) filter["review.status"] = reviewStatus;
  if (ratingStatus) filter["rating.status"] = ratingStatus;
  if (sellerFeedbackStatus)
    filter["sellerFeedback.status"] = sellerFeedbackStatus;

  // 📅 Date range filter (on timeline.orderPlacedAt)
  if (startDate || endDate) {
    filter["timeline.orderPlacedAt"] = {};
    if (startDate) filter["timeline.orderPlacedAt"].$gte = new Date(startDate);
    if (endDate) filter["timeline.orderPlacedAt"].$lte = new Date(endDate);
  }

  const parsedPage = Math.max(1, parseInt(page) || 1);
  const parsedLimit = Math.max(1, parseInt(limit) || 10);
  const skip = (parsedPage - 1) * parsedLimit;

  // 📦 Fetch paginated data and total count
  const [orders, total] = await Promise.all([
    Order.find(filter)
      .sort({ createdAt: sort === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(parsedLimit),
    Order.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / parsedLimit);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        orders,
        pagination: {
          total,
          page: parsedPage,
          totalPages,
          limit: parsedLimit,
        },
      },
      "Orders fetched successfully",
    ),
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

  if (!validateObjectId(orderId)) {
    throw new ApiError(400, "Invalid Order ID");
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(422, errors.array()[0].msg);
  }

  const order = await Order.findOne({ _id: orderId, user: userId });
  if (!order) {
    throw new ApiError(404, "Order not found or access denied");
  }

  let updateRefundAmount = false;
  let refundAmount = order.refund.amount;

  if (
    req.body.productPrice !== undefined ||
    req.body.productLess !== undefined
  ) {
    const price = Number(req.body.productPrice);
    const less = Number(req.body.productLess);
    refundAmount =
      isNaN(price) || isNaN(less) ? order.refund.amount : price - less;
    updateRefundAmount = true;
  }

  // 🛠 Map request body to nested order structure
  const updates = {
    "feedback.type": req.body.feedbackType,

    "product.displayName": req.body.productDisplayName,
    "product.originalName": req.body.productOriginalName,
    "product.accountInfo": req.body.productAccountInfo,
    "product.link": req.body.productLink,
    "product.platform": req.body.productPlatform,
    "product.condition": req.body.productCondition,
    "product.price": req.body.productPrice,
    "product.less": req.body.productLess,

    "dealer.info.name": req.body.dealerInfoName,
    "dealer.info.phoneNumber": req.body.dealerInfoPhoneNumber,
    "dealer.info.telegramId": req.body.dealerInfoTelegramId,
    "dealer.platform": req.body.dealerPlatform,

    "timeline.deliveryDate": req.body.deliveryDate,
    "timeline.isDelivered": req.body.isDelivered,

    "review.status": req.body.reviewStatus,
    "review.text": req.body.reviewText,
    "review.screenshot": req.body.reviewScreenshot,

    "rating.status": req.body.ratingStatus,
    "rating.screenshot": req.body.ratingScreenshot,

    "sellerFeedback.status": req.body.sellerFeedbackStatus,
    "sellerFeedback.screenshot": req.body.sellerFeedbackScreenshot,

    "refund.status": req.body.refundStatus,
    "refund.amount": updateRefundAmount ? refundAmount : order.refund.amount,
    "refund.formSubmittedAt": req.body.refundFormDate,
    "refund.receivedAt": req.body.refundReceivedDate,
    "refund.proof": req.body.refundProof,

    notes: req.body.notes,
  };

  for (const [path, value] of Object.entries(updates)) {
    if (value !== undefined && value !== "") {
      order.set(path, value);
    }
  }

  await order.save();

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order updated successfully"));
});

export const moveToBin = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const currentUser = req.user;

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
  if (
    order.user.toString() !== currentUser._id.toString() &&
    currentUser.role !== "admin"
  ) {
    throw new ApiError(403, "You are not authorized to delete this order");
  }

  // Update status to "bin" (soft delete)
  order.status = "bin";
  order.binAt = new Date(); // Set the time when it was moved to bin
  await order.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Order moved to bin successfully. It will be permanently deleted after 30 days."));
});

export const restoreFromBin = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const currentUser = req.user;
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
  if (
    order.user.toString() !== currentUser._id.toString() &&
    currentUser.role !== "admin"
  ) {
    throw new ApiError(403, "You are not authorized to restore this order");
  }

  // Update status to "active"
  order.status = "active";
  order.binAt = null; // Clear the binAt field
  await order.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Order restored from bin successfully"));
});

export const getBinOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const binOrders = await Order.find({
    user: userId,
    status: "bin",
    binAt: { $gte: getBeforeDate(30) },
  }).select("_id product.orderId product.displayName").sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, binOrders, "Bin orders fetched successfully"));
});

export const emptyBin = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  // Mark all orders in the bin as "deleted"
  await Order.updateMany(
    { user: userId, status: "bin" },
    { status: "deleted", binAt: null },
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Bin cleared successfully"));
});

export const deleteOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  const currentUser = req.user;

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
  if (
    order.user.toString() !== currentUser._id.toString() &&
    currentUser.role !== "admin"
  ) {
    throw new ApiError(403, "You are not authorized to delete this order");
  }

  // Update status to "deleted"
  if (order.status === "bin") {
    order.binAt = null; // Clear the binAt field
  }
  order.status = "deleted";
  await order.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Order deleted successfully"));
});

export const getOrderSummary = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const isAdmin = req.user.role === "admin";

  const matchCriteria = isAdmin ? {} : { user: userId };

  const [
    totalOrders,
    deliveredOrders,
    pendingReviews,
    pendingRatings,
    refundPending,
    refundReceived,
    refundSummary,
  ] = await Promise.all([
    // Total orders
    Order.countDocuments(matchCriteria),

    // Delivered orders
    Order.countDocuments({
      ...matchCriteria,
      "timeline.isDelivered": true,
    }),

    // Pending reviews
    Order.countDocuments({
      ...matchCriteria,
      "review.status": "Pending",
    }),

    // Pending ratings
    Order.countDocuments({
      ...matchCriteria,
      "rating.status": "Pending",
    }),

    // Refunds applied (i.e. still pending)
    Order.countDocuments({
      ...matchCriteria,
      "refund.status": "Pending",
    }),

    // Refunds received
    Order.countDocuments({
      ...matchCriteria,
      "refund.status": "Received",
    }),

    // Total refund amount (received only)
    Order.aggregate([
      {
        $match: {
          ...matchCriteria,
          "refund.status": "Received",
        },
      },
      {
        $group: {
          _id: null,
          totalRefundAmount: { $sum: "$refund.amount" },
        },
      },
    ]),
  ]);

  const totalRefundAmount = refundSummary[0]?.totalRefundAmount || 0;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalOrders,
        deliveredOrders,
        pendingReviews,
        pendingRatings,
        refundPending,
        refundReceived,
        totalRefundAmount,
      },
      "Order summary fetched successfully",
    ),
  );
});
