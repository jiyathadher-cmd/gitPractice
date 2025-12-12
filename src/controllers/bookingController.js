const bookingService = require("../services/bookingService");
const Tour = require("../models/tourModel");
const stripeService = require("../services/stripeService");
const Booking = require("../models/bookingModel");


exports.createBookingCheckout = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                status: "fail",
                message: "User not authenticated → token missing or invalid"
            });
        }

        const tourId = req.body.tourId;
        if (!tourId) {
            return res.status(400).json({ status: "fail", message: "tourId is required" });
        }

        const tour = await Tour.findById(tourId);
        if (!tour) throw { status: 404, message: "Tour not found" };

        const session = await stripeService.createCheckoutSessionService(req.user.id, tour);

        res.status(200).json({
            status: "success",
            url: session.url
        });
    } catch (err) {
        next(err);
    }
};

exports.getUserBookings = async (req, res, next) => {
    try {
        const bookings = await bookingService.getUserBookingsService(req.user.id);
        res.status(200).json({
            message: "User bookings fetched successfully",
            bookings
        });
    } catch (err) {
        next(err);
    }
};

exports.cancelBooking = async (req, res, next) => {
    try {
        const result = await bookingService.cancelBookingService(req.params.bookingId, req.user.id);
        res.status(200).json({
            message: result.message
        });
    } catch (err) {
        next(err);
    }
};
