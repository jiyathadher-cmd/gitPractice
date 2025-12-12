const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },

    email: { type: String, required: true },

    password: { type: String, required: true },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    regNumber: {
        type: String,
        required: true,
        minlength: 10,
    },

    age: { type: String, required: true },

    phone: {
        type: String,
        minlength: 10,
    },

    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },

    profileImage: {
        type: String,
        required: false

    }, stripeCustomerId: {
        type: String,
        default: null,
    },

    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
    versionKey: false
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
