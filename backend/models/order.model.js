// backend/models/Order.js
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productName: {
        type: String,
        required: true,
        trim: true
    },
    productOriginalName: {
        type: String,
        required: true,
        trim: true
    },
    productLink: {
        type: String
    },
    platform: {
        type: String,
        enum: ['Amazon', 'Flipkart', 'Meesho', 'Other'],
        default: 'Other'
    },
    price: {
        type: Number,
        required: true
    },
    less: {
        type: Number,
        required: true,
        default: 0
    },
    orderDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    orderFormDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    deliveryDate: {
        type: Date
    },
    isDelivered: {
        type: Boolean,
        default: false
    },

    // Review Info
    reviewStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Not Required'],
        default: 'Not Required'
    },
    ratingStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Not Required'],
        default: 'Not Required'
    },
    reviewText: {
        type: String
    },
    reviewScreenshot: {
        type: String  // store image path or cloud URL
    },
    ratingScreenshot: {
        type: String  // store image path or cloud URL
    },

    // Refund Info
    refundStatus: {
        type: String,
        enum: ['Not Applied', 'Applied', 'Received', 'Rejected'],
        default: 'Not Applied'
    },
    refundAmount: {
        type: Number
    },
    refundFormDate: {
        type: Date
    },
    refundReceivedDate: {
        type: Date
    },
    refundProof: {
        type: String  // file path or URL
    },

    notes: {
        type: String
    }
}, { timestamps: true });

export const Order = mongoose.model('Order', OrderSchema);
