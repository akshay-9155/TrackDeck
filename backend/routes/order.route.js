// backend/routes/order.routes.js
import express from 'express';
import {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    moveToBin,
    getOrderSummary,
    restoreFromBin
} from '../controllers/order.controller.js';

import { validateCreateOrder, validateUpdateOrder } from '../middlewares/validations/orderValidation.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
// Optionally: import express-validator middlewares here later

const orderRouter = express.Router();

// 🔐 All routes protected
orderRouter.use(authenticate);

// ➕ Create new order
orderRouter.post('/', validateCreateOrder, createOrder);

// 📊 Static routes FIRST
orderRouter.get('/summary/me', getOrderSummary);

// 📋 Get all orders
orderRouter.get('/', getAllOrders);

// 📋 Get orders in the bin
orderRouter.get('/bin', getBinOrders);

// 🗑 Empty bin
orderRouter.delete('/bin', emptyBin);

// ♻️ Restore from bin
orderRouter.patch('/:id/restore', restoreFromBin);

// 🗑 Move to bin
orderRouter.delete('/:id', moveToBin);

// 🔍 Get single order
orderRouter.get('/:id', getOrderById);

// ✏️ Update order
orderRouter.put('/:id', validateUpdateOrder, updateOrder);

export default orderRouter;
