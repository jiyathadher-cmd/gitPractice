const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripeController');
const userMiddleware = require('../middleware/usermiddleware');

router.post('/create-customer' , userMiddleware, stripeController.createCustomer);
router.post('/add-card', userMiddleware, stripeController.addCard);
router.post('/create-paymentIntent', userMiddleware, stripeController.createPaymentIntent);
router.post('/create-checkoutSession', userMiddleware, stripeController.createCheckoutSession);

module.exports = router;