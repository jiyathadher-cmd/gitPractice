const stripeService = require("../services/stripeService");
const Tour = require("../models/tourModel");

exports.createCustomer = async (req, res, next) => {
    try {
        const result = await stripeService.createCustomerService(req.user.id, req.user.email);
        res.status(200).json({ message: "Customer created", result });
    } catch (err) {
        next(err);
    }
};

exports.addCard = async (req, res, next) => {
    try {
        const result = await stripeService.addCardService(req.user.id, req.body.cardToken);
        res.status(200).json({ message: "Card added successfully", card: result });
    } catch (err) {
        next(err);
    }
};

exports.createPaymentIntent = async (req, res, next) => {
    try {
        const amount = req.body.amount;
        const data = await stripeService.createPaymentIntentService(req.user.id, amount);
        res.status(200).json({ message: "PaymentIntent created", data });
    } catch (err) {
        next(err);
    }
};

exports.createCheckoutSession = async (req, res, next) => {
    try {
        const tour = await Tour.findById(req.body.tourId);
        if (!tour) throw { status: 404, message: "Tour not found" };

        const session = await stripeService.createCheckoutSessionService(req.user.id, tour);

        res.status(200).json({
            message: "Checkout session created",
            url: session.url
        });
    } catch (err) {
        next(err);
    }
};
