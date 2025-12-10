const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const auth = require("../middleware/usermiddleware");

// Create Payment Intent for booking
router.post("/create-payment-intent", auth, bookingController.createPaymentIntent);

// Get logged-in user's bookings
router.get("/my-bookings", auth, bookingController.getUserBookings);

// Cancel booking
router.delete("/cancel/:bookingId", auth, bookingController.cancelBooking);

module.exports = router;
