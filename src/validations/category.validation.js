const Joi = require('joi');
const { objectId } = require('./custom.validation');

// basePrice : 
// dailyPrice : 
// discountsUser: {
//   type: [priceChangeUserSchema],
// discountsDate: {
//   type: [priceChangeDateSchema],
// },
// surchargeUser: {
//   type: [priceChangeUserSchema],
// },
// surchargeDate: {
//   type: [priceChangeDateSchema],
// },
// surchargeExtra:{
//   type: [priceChangeReasonSchema],
// },

const addCategory = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string(),
    }),
}

const getCategories = {
    query: Joi.object().keys({
        name: Joi.string().allow(null, ''),
        text: Joi.string().allow(null, ''),
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