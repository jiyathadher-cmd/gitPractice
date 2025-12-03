const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
console.log(process.env.MONGO_URI, "==process.env.MONGO_URI");
const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB!');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1);
    }
};
module.exports = { db };
