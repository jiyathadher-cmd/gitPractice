const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            //required:true,
        },
        tour: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tour",
            //required:true,
        },
        bookingDate: {
            type: Date,
            default: Date.now,
        },
        numOfPeople: {
            type: Number,
            required: true,
            min: 1,
        },
        totalPrice: {
            type: Number,
            //required: true,
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled"],
            default: "pending",
        },
        paymentStatus: {
            type: String,
            enum: ["paid", "unpaid"],
            default: "unpaid",
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    { timestamps: true ,versionKey:false }
);

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;