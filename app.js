const express = require('express');
const dotenv = require('dotenv');
const { db } = require('./src/data/db');
const userRoute = require('./src/routes/userRoutes');
const tourRoute = require('./src/routes/tourRoutes');
const fileRoute = require('./src/routes/uploadRoute');
const userMiddleware = require('./src/middleware/usermiddleware');
const errorHandler = require('./src/middleware/errormiddleware');
const startcronJob  =require('./src/utils/cronJobs');
dotenv.config();

const app = express();
app.use(express.json());

db(); 

app.use('/file',fileRoute);
app.use('/api/user', userMiddleware, userRoute);
app.use('/api/tour',tourRoute);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
    startcronJob ;
})

