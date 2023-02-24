const Joi = require("joi");
const { handleBadRequest } = require("../utils/responseHandler");
const logger = require("../utils");

const userDataValidation = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().max(15).min(5).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        logger.error(`User data validation failed: ${error.details[0].message}`);
        return handleBadRequest(res, error.details[0].message);
    } else {
        next();
    };
};

const productDataValidation = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().max(15).min(5).required(),
        desc: Joi.string().max(255).min(50).required(),
        img: Joi.string().required(),
        categories: Joi.array(),
        size: Joi.string(),
        color: Joi.string(),
        price: Joi.number().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        logger.error(`Product data validation failed: ${error.details[0].message}`);
        return handleBadRequest(res, error.details[0].message);
    } else {
        next();
    };
};

module.exports = {
    userDataValidation,
    productDataValidation
}