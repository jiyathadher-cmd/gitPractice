const express = require("express");
const router = express.Router();
const stripeController = require("../controllers/stripeController");
const auth = require("../middleware/usermiddleware");

// create customer
router.post("/customer", auth,stripeController.createCustomer);

// add card
router.post("/add-card", auth, stripeController.addCard);

// payment intent
router.post("/payment-intent", auth, stripeController.createPaymentIntent);

// checkout session
router.post("/checkout-session", auth, stripeController.createCheckoutSession);

module.exports = router;
