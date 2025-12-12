const express = require('express');
const router = express.Router();
router.use('/user', require('./UserRoutes'));
router.use('/tour', require('./tourRoutes'));
router.use('/stripe', require('./stripeRoute'));
router.use('/upload', require('./uploadRoute'));
router.use('/booking', require('./bookingRoute'));

module.exports = router;