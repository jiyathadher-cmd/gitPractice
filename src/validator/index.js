const { signupSchema, loginSchema } = require('./userValidation');
const { validate } = require('./validate');
const { tourBodySchema } = require("./tourValidation");

const validateTourBody = (data) => validate(tourBodySchema, data);
const validateSignup = (data) => validate(signupSchema, data);
const validateLogin = (data) => validate(loginSchema, data);

module.exports = {
    validateSignup,
    validateLogin,
    validateTourBody
};
