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

    },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
    versionKey: false
});

// // Methods
// userSchema.methods.getFullName = function () {
//     return `${this.name}`;
// };

// // Statics
// userSchema.statics.findYoungUsers = function () {
//     return this.find({ age: { $lt: 30 } });
// };

// // Query helper
// userSchema.query.byName = function (name) {
//     return this.where({ name: new RegExp(name, 'i') });
// };

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Post delete
userSchema.post('remove', function (doc) {
    console.log(`User ${doc.name} removed.`);
});
//pre hook
userSchema.pre('find', function (next) {
    this.where({ status: 'active' }); 
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
