const Joi = require('joi');
const { objectId } = require('./custom.validation');

const addCategory = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string(),
    }),
}

const getCategories = {
    query: Joi.object().keys({
        name: Joi.string(),
        text: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const deleteCategory = {
    params: Joi.object().keys({
        categoryId: Joi.string().custom(objectId),
    }),
}

module.exports = {
    addCategory,
    getCategories,
    deleteCategory,
};
  