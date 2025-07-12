// backend/routes/order.routes.js
import express from 'express';
import {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrderSummary
} from '../controllers/order.controller.js';

import { validateCreateOrder, validateUpdateOrder } from '../middlewares/validations/orderValidation.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
// Optionally: import express-validator middlewares here later

const orderRouter = express.Router();

// 🔐 All routes protected
orderRouter.use(authenticate);

// ➕ Create new order
orderRouter.post('/', validateCreateOrder, createOrder);

// 📋 Get all orders for logged-in user (with optional filters)
orderRouter.get('/', getAllOrders);

// 🔍 Get single order by ID
orderRouter.get('/:id', getOrderById);

// ✏️ Update order (status, review, refund, etc.)
orderRouter.put('/:id', validateUpdateOrder, updateOrder);

// 🗑 Delete an order
orderRouter.delete('/:id', deleteOrder);

// 📊 Get dashboard stats (total orders, pending, completed etc.)
orderRouter.get('/summary/me', getOrderSummary);

export default orderRouter;
