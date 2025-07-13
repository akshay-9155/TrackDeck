import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true  // indexing for performance
    },

    feedback: {
        type: {
            type: String,
            enum: ['Rating', 'ReviewLive', 'Review', 'Other'],
            required: true
        }
    },

    product: {
        orderId: {
            type: String,
            required: true,
            trim: true
        },
        displayName: {
            type: String,
            required: true,
            trim: true
        },
        originalName: {
            type: String,
            required: true,
            trim: true
        },
        link: {
            type: String,
            trim: true
        },
        platform: {
            type: String,
            enum: ['Amazon', 'Flipkart', 'Meesho', 'Other'],
            default: 'Other'
        },
        condition: {
            type: String,
            enum: ['Original', 'Exchange', 'Semi Empty', 'Empty', 'Other'],
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        less: {
            type: Number,
            required: true,
            default: 0,
        }
    },

    dealer: {
        type: new mongoose.Schema({
            info: {
                name: { type: String, required: true },
                phoneNumber: { type: String },
                telegramId: { type: String }
            },
            platform: {
                type: String,
                enum: ['Telegram', 'Whatsapp'],
                required: true
            }
        }, { _id: false }),
        required: true
    },

    timeline: {
        orderPlacedAt: {
            type: Date,
            required: true,
            default: Date.now
        },
        formSubmittedAt: {
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
        }
    },

    review: {
        status: {
            type: String,
            enum: ['Pending', 'Completed', 'Not Required'],
            default: 'Not Required'
        },
        text: {
            type: String,
            trim: true
        },
        screenshot: {
            type: String,
            trim: true
        }
    },

    rating: {
        status: {
            type: String,
            enum: ['Pending', 'Completed', 'Not Required'],
            default: 'Not Required'
        },
        screenshot: {
            type: String,
            trim: true
        }
    },

    sellerFeedback: {
        status: {
            type: String,
            enum: ['Pending', 'Completed', 'Not Required'],
            default: 'Not Required'
        },
        screenshot: {
            type: String,
            trim: true
        }
    },

    refund: {
        status: {
            type: String,
            enum: ['Pending', 'Received', 'Rejected'],
            default: 'Pending'
        },
        amount: {
            type: Number,
            min: 0
        },
        formSubmittedAt: {
            type: Date
        },
        receivedAt: {
            type: Date
        },
        proof: {
            type: String,
            trim: true
        }
    },

    notes: {
        type: String,
        trim: true,
        maxlength: 1000
    }

}, { timestamps: true });


// ✅ Virtual field: netPrice = price - less
OrderSchema.virtual('netPrice').get(function () {
    return (this.product.price || 0) - (this.product.less || 0);
});

// ✅ Custom validation: Dealer must have phoneNumber or telegramId
OrderSchema.path('dealer').schema.pre('validate', function (next) {
    const hasPhone = !!this.info?.phoneNumber;
    const hasTelegram = !!this.info?.telegramId;

    if (!hasPhone && !hasTelegram) {
        this.invalidate('dealer.info.phoneNumber', 'Either phone number or telegram ID is required');
        this.invalidate('dealer.info.telegramId', 'Either phone number or telegram ID is required');
    }
    next();
});


// ✅ Index for delivery queries (optional)
OrderSchema.index({ 'timeline.deliveryDate': -1 });

export const Order = mongoose.model('Order', OrderSchema);
