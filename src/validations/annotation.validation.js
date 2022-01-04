const Joi = require('joi');

const annotationSchema = {
    quick: Joi.array().items(Joi.string()),
    text: Joi.string(),
}

module.exports = {
    annotationSchema,
}