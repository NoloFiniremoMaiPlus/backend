const Joi = require('joi');

const getCategories = {
    query: Joi.object().keys({
        name: Joi.string(),
        text: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

module.exports = {
    getCategories,
};
  