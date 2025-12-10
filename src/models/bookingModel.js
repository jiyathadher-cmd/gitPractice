const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tourId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tour',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending"
    },
    paymentIntentId: {
        type: String,
        required: true
    },
    stripeCustomerId: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
