
const Joi = require('joi');

const signupSchema = Joi.object({
    name: Joi.string().min(3).required(),
    age: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    regNumber: Joi.string().optional(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).optional(),
    role: Joi.string().valid('admin', 'user').optional(),
    profileImage: Joi.string().optional(),
    
});
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
module.exports = {
    signupSchema,
    loginSchema
};