const mongoose = require("mongoose");

const stripeLogSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },
    action: { 
        type: String, 
        required: true 
    },
    stripeId: { 
        type: String 
    },
    amount: {
         type: Number 
    },
}, { timestamps: true });

module.exports = mongoose.model("StripeLog", stripeLogSchema);
