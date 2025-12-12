const stripe = require("../data/configStripe");
const User = require("../models/userModel");
const Tour = require("../models/tourModel");
const Booking = require("../models/bookingModel");

exports.createPaymentIntentService = async (userId, tourId) => {
    const tour = await Tour.findById(tourId);
    if (!tour) throw { status: 404, message: "Tour not found" };

    const user = await User.findById(userId);
    if (!user) throw { status: 404, message: "User not found" };

    if (!user.stripeCustomerId) {
        throw { status: 400, message: "Stripe customer ID missing for user" };
    }

    const amount = tour.price * 100;

    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        customer: user.stripeCustomerId,
        metadata: {
            userId: userId.toString(),  // Ensure string
            tourId: tourId.toString()   // Ensure string
        }
    });

    await Booking.create({
        userId: userId.toString(),
        tourId: tourId.toString(),
        amount: amount / 100,
        stripeCustomerId: user.stripeCustomerId,
        paymentIntentId: paymentIntent.id,
        paymentStatus: "pending"
    });

    return {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
    };
};

exports.getUserBookingsService = async (userId) => {
    const bookings = await Booking.find({ userId })
        .populate("tourId", "name price destination imageCover")
        .sort({ createdAt: -1 });

    return bookings;
};

exports.cancelBookingService = async (bookingId, userId) => {
    const booking = await Booking.findOne({ _id: bookingId, userId });

    if (!booking) throw { status: 404, message: "Booking not found" };
    if (booking.paymentStatus === "paid") throw { status: 400, message: "Cannot cancel a paid booking" };

    await Booking.deleteOne({ _id: bookingId });

    return { message: "Booking cancelled successfully" };
};
