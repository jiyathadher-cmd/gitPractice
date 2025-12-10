const bookingService = require("../services/bookingService");

exports.createPaymentIntent = async (req, res, next) => {
    try {
        const data = await bookingService.createPaymentIntentService(req.user.id, req.body.tourId);

        res.status(200).json({
            message: "Payment intent created successfully",
            clientSecret: data.clientSecret,
            paymentIntentId: data.paymentIntentId
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
