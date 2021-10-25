const Joi = require('joi');
const { objectId } = require('./custom.validation');
const { priceChangeDateSchema,
		priceChangeUserSchema,
		priceChangeReasonSchema } = require('./priceChange.validation');


const addCategory = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		description: Joi.string(),
		basePrice: Joi.number().required(),
		dailyPrice: Joi.number().required(),
		discountsUser: Joi.array().items(priceChangeUserSchema),
		discountsDate: Joi.array().items(priceChangeDateSchema),
		surchargeUser: Joi.array().items(priceChangeUserSchema),
		surchargeDate: Joi.array().items(priceChangeDateSchema),
		surchargeExtra: Joi.array().items(priceChangeReasonSchema),
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