const stripe = require("../data/configStripe");
const User = require("../models/userModel");
const StripeLog = require("../models/stripeLogmodel");
const Booking = require("../models/bookingModel"); 
class StripeService {

    // Create Customer
    static async createCustomerService(userId, email) {
        const user = await User.findById(userId);
        if (!user) throw { status: 404, message: "User not found" };

        if (user.stripeCustomerId) {
            return { customerId: user.stripeCustomerId, message: "Customer already exists" };
        }

        const customer = await stripe.customers.create({ email });

        user.stripeCustomerId = customer.id;
        await user.save();

        await StripeLog.create({
            userId,
            action: "CREATE_CUSTOMER",
            stripeId: customer.id
        });

        return { customerId: customer.id };
    }

    // Add Card
    static async addCardService(userId, cardToken) {
        const user = await User.findById(userId);
        if (!user) throw { status: 404, message: "User not found" };
        if (!user.stripeCustomerId)
            throw { status: 400, message: "User does not have a Stripe customer ID" };

        const card = await stripe.customers.createSource(
            user.stripeCustomerId,
            { source: cardToken }
        );

        await StripeLog.create({
            userId,
            action: "ADD_CARD",
            stripeId: card.id
        });

        return card;
    }


    //Payment Intent
    static async createPaymentIntentService(userId, amount) {
        const user = await User.findById(userId);
        if (!user) throw { status: 404, message: "User not found" };

        if (!user.stripeCustomerId)
            throw { status: 400, message: "Stripe customer missing" };

        const intent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: "usd",
            customer: user.stripeCustomerId,
        });

        return {
            clientSecret: intent.client_secret,
            paymentIntentId: intent.id
        };
    }

    // Checkout Session
    static async createCheckoutSessionService(userId, tour) {
        const user = await User.findById(userId);
        if (!user) throw { status: 404, message: "User not found" };

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            customer: user.stripeCustomerId,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: tour.name,
                            description: tour.summary
                        },
                        unit_amount: tour.price * 100,
                    },
                    quantity: 1,
                },
            ],

            metadata: {
                userId,
                tourId: tour._id.toString()
            },

            success_url: "http://localhost:3000/payment-success",
            cancel_url: "http://localhost:3000/payment-cancel",
        });

        await Booking.create({
            userId: userId.toString(),
            tourId: tour._id.toString(),
            amount: tour.price,
            stripeCustomerId: tour.stripeCustomerId,
            paymentIntentId: session.payment_intent,
            paymentStatus: "pending"
        });
        return session;
    }
}

module.exports = StripeService;
