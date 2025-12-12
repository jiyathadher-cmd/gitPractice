const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const auth = require("../middleware/usermiddleware");

router.post("/create-payment-intent", auth, bookingController.createBookingCheckout);
router.get("/my-bookings", auth, bookingController.getUserBookings);
router.delete("/cancel/:bookingId", auth, bookingController.cancelBooking);

module.exports = router;
