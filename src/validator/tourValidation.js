const Joi = require("joi");

const tourBodySchema = Joi.object({
    name: Joi.string().trim().min(3).max(50).required(),
    destination: Joi.string().trim().required(),
    duration: Joi.number().integer().min(1).required(),
    groupSize: Joi.number().integer().min(1).required(),
    type: Joi.string().default("General"),
    difficulty: Joi.string().valid("easy", "medium", "difficult").default("easy"),
    price: Joi.number().min(0).required(),
    summary: Joi.string().trim().max(200).required(),
    description: Joi.string().trim().allow("", null),
    // startDates: Joi.array().items(Joi.date()),
    // ratingsAverage: Joi.number().min(1).max(5).optional(),
    // ratingsQuantity: Joi.number().integer().min(0).optional(),
    // imageCover: Joi.string().optional(),
    // images: Joi.array().items(Joi.string()).optional(),
    // contact: Joi.string().optional(),
});

module.exports = {
    tourBodySchema
};
