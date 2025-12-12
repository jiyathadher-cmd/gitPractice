// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// // Create a Stripe Customer
// const createCustomer = async (req, res) => {
//     try {
//         const { email, name } = req.body;
//         const customer = await stripe.customers.create({ email, name });
//         res.status(201).json({ message: "Customer created successfully", customer });
//     } catch (err) {
//         res.status(500).json({ message: "Internal Server Error", error: err.message });
//     }
// };

// //add card / PaymentMethod to customer
// const addCard = async (req, res) => {
//     try {
//         const { customerId, token } = req.body;

//         const paymentMethod = await stripe.paymentMethods.create({
//             type: "card",
//             card: { token },
//         });

//         // Attach payment method to customer
//         await stripe.paymentMethods.attach(paymentMethod.id, { customer: customerId });

//         // Set as default for invoices/subscriptions
//         await stripe.customers.update(customerId, {
//             invoice_settings: { default_payment_method: paymentMethod.id },
//         });

//         res.status(200).json({ message: "Payment method added successfully", paymentMethod });
//     } catch (err) {
//         res.status(500).json({ message: "Internal Server Error", error: err.message });
//     }
// };

// //  Create Product
// const createProduct = async (req, res) => {
//     try {
//         const { name, description } = req.body;
//         const product = await stripe.products.create({ name, description });
//         res.status(201).json({ message: "Product created successfully", product });
//     } catch (err) {
//         res.status(500).json({ message: "Internal Server Error", error: err.message });
//     }
// };

// // Create Price (replaces old Plan API)
// const createPrice = async (req, res) => {
//     try {
//         const { productId, unit_amount, interval } = req.body; // interval = 'month' or 'year'

//         const price = await stripe.prices.create({
//             unit_amount,
//             currency: 'usd',
//             recurring: { interval },
//             product: productId,
//         });

//         res.status(201).json({ message: "Price created successfully", price });
//     } catch (err) {
//         res.status(500).json({ message: "Internal Server Error", error: err.message });
//     }
// };

// //  Create Subscription (uses Price ID)
// const createSubscription = async (req, res) => {
//     try {
//         const { customerId, priceId } = req.body;

//         const subscription = await stripe.subscriptions.create({
//             customer: customerId,
//             items: [{ price: priceId }],
//             expand: ['latest_invoice.payment_intent'],
//         });

//         res.status(201).json({ message: "Subscription created successfully", subscription });
//     } catch (err) {
//         res.status(500).json({ message: "Internal Server Error", error: err.message });
//     }
// };

// // Create PaymentIntent (for one-time payments)
// const createPaymentIntent = async (req, res) => {
//     try {
//         const { amount, customerId, paymentMethodId } = req.body;

//         const paymentIntent = await stripe.paymentIntents.create({
//             amount,
//             currency: 'usd',
//             customer: customerId,
//             payment_method: paymentMethodId,
//             confirm: true, 
//             off_session: true,
//         });

//         res.status(201).json({ success: true, message: "PaymentIntent created", paymentIntent });
//     } catch (err) {
//         res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
//     }
// };

// // Create Checkout Session
// const createCheckoutSession = async (req, res) => {
//     try {
//         const { line_items, success_url, cancel_url } = req.body;

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             line_items,
//             mode: 'payment',
//             success_url,
//             cancel_url,
//         });

//         res.status(200).json({ success: true, message: "Checkout session created", sessionId: session.id });
//     } catch (err) {
//         res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
//     }
// };

// module.exports = {
//     createCustomer,
//     addCard,
//     createProduct,
//     createPrice,
//     createSubscription,
//     createPaymentIntent,
//     createCheckoutSession
// };

//------------------------------------------------------------------------------------------------------
const express = require('express');
const { number } = require('joi');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const createCustomer = async (req, res) => {
    try {
        const { email, name } = req.body;
        const customer = await stripe.customers.create({ email, name });
        res.status(201).json({
            message: "Customer created successfully",
            customer
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
};

//cus_TZWOVw6C00eVhG  
//this type of id is required here will be generated by create customer api

const addCard = async (req, res) => {
    try {
        const { customerId } = req.body;

        // 1. Create payment method using token
        const paymentMethod = await stripe.paymentMethods.create({
            type: "card",
            card: { token: "tok_visa" },
        });

        // 2. Attach the card to customer
        await stripe.paymentMethods.attach(paymentMethod.id, {
            customer: customerId,
        });

        // 3. Set as default payment method
        await stripe.customers.update(customerId, {
           invoice_settings: { default_payment_method: paymentMethod.id },
        });

        // await stripe.customers.update(customerId, {
        //     default_source: paymentMethod.id,
        // });
        
        res.json({
            message: "Payment method added successfully",
            paymentMethod
        });

    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
};

//{
//   "customerId": "cus_TZWOVw6C00eVhG",
//   "paymentMethodId": "pm_1ScPHYQOTrRYw5eVCU6tcq6s",  //will be generated by add card api
//   "amount": 5000
// }  this is required in body

const createPaymentIntent = async (req, res) => {
    try {
        const { amount, customerId, paymentMethodId } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            customer: customerId,
            payment_method: paymentMethodId,  
            confirm: true,
            off_session: true,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: "never"
            }
        });
        res.status(201).json({
            success: true,
            message: "Payment intent created successfully",
            paymentIntent
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message
        });
    }
}

// you will get an session id from here
const createCheckoutSession = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'T-shirt',
                    },
                    unit_amount: 2000,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'https://example.com/success',
            cancel_url: 'https://example.com/cancel',
        });

        res.status(200).json({
            success: true,
            message: "Checkout session created successfully",
            sessionId: session.id
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message
        });
    }
}
//prod_TZuAqvPI1LlLvS  this type of id is required here will be generated by create product api
const createProduct = async (req, res) => {
    try {
        const product = await stripe.products.create({
            name: 'premium plan',
            description: 'premium plan description',

        });
        res.status(201).json({
            message: "Product created successfully",
            product
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
};
// plan_TZuDbfMnVRadQ2 this type of id is required here will be generated by create plan api
const createPlan = async (req, res) => {
    const { productId, amount, interval } = req.body;
    try {
        const plan = await stripe.plans.create({
            amount: amount,
            interval: 'month',
            product: productId, 
            currency: 'usd',
            recurring: { 
                interval: interval
            },
        });
        res.status(201).json({
            message: "Plan created successfully",
            plan
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
};
// sub_1SckRFQOTrRYw5eVJvTcmYhf  this type of id is required here will be generated by create subscription api
const createSubscription = async (req, res) => {
    const { customerId, planId } = req.body;
    try {
        const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [{ plan: planId }],
            expand: ['latest_invoice.payment_intent'],
        });
        res.status(201).json({
            message: "Subscription created successfully",
            subscription
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
};
module.exports = {
    createCustomer,
    addCard,
    createPaymentIntent,
    createCheckoutSession,
    createProduct,
    createPlan,
    createSubscription
};