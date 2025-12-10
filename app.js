const express = require('express');
const dotenv = require('dotenv');
const { db } = require('./src/data/db');
const userMiddleware = require('./src/middleware/usermiddleware');
const errorHandler = require('./src/middleware/errormiddleware');
const { startcronJobs } = require('./src/utils/cronJobs');
const stripeee = require('./src/routes/stripeRoute.js');

dotenv.config();

const app = express();
app.use(express.json());

db(); 
app.use('/api/stripe', stripeee);
app.use('/file', require('./src/routes/uploadRoute'));
app.use('/api/user', require('./src/routes/userRoutes'));
app.use('/api/tour', require('./src/routes/tourRoutes'));
// app.use('/api/stripe', stripeRoute);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
    startcronJobs();
});
