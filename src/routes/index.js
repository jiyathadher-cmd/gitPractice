const express = require('express');
const router = express.Router();
const userRouter = require('./UserRoutes');
const tourRouter = require('./tourRoutes');
router.use('/user', userRouter);
router.use('/tour', tourRouter);

module.exports = router;