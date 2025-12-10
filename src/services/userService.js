const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const signupService = async (userData) => {
    const { name, email, password, regNumber, phone, role, age, profileImage } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already registered with this email');
    }

    const newUser = new User({
        name,
        email,
        password,
        regNumber,
        phone,
        role,
        age,
        profileImage
    });

    await newUser.save();
    return newUser;
};
const loginService = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid credentials');
    }

    const passMatch = await bcrypt.compare(password, user.password);

    if (!passMatch) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET || 'jiya',
        { expiresIn: '1h' }
    );

    return { user, token };
};
const getAllUsersService = async () => {
    return await User.find({ isDeleted: false });
};
const getOneUserService = async (id) => {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');
    return user;
};
const updateUserService = async (id, updatedData) => {

    if (updatedData.password) {
        const user = await User.findById(id);
        user.password = updatedData.password; 
        Object.assign(user, updatedData);
        await user.save();
        return user.toObject({ getters: true, virtuals: false });
    }

    const user = await User.findByIdAndUpdate(id, updatedData, { new: true }).select('-password');
    if (!user) throw new Error('User not found');
    
    return user;
};
const deleteUserService = async (id) => {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error('User not found');
    return user;
};
module.exports = {
    signupService,
    loginService,
    getAllUsersService,
    getOneUserService,
    updateUserService,
    deleteUserService,
    findUserByEmail
};
