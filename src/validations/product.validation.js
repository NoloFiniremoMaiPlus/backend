const Joi = require('joi');
const { objectId } = require('./custom.validation');
const { priceChangeDateSchema,
		priceChangeUserSchema,
		priceChangeReasonSchema } = require('./priceChange.validation');


const addProduct = {
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

const getProducts = {
	query: Joi.object().keys({
		name: Joi.string().allow(null, ''),
		keywords: Joi.string().allow(null, ''),
		priceFrom: Joi.number().integer(),
		priceTo: Joi.number().integer(),
		dateFrom: Joi.date().iso(),
		dateTo: Joi.date().iso().min(Joi.ref('from')),
		rating: Joi.number().default(0),
		sortBy: Joi.string(),
		limit: Joi.number().integer(),
		page: Joi.number().integer(),
	}),
};

const getProduct = {
	params: Joi.object().keys({
		productId: Joi.string().custom(objectId),
	}),
}

const updateProduct = {
	params: Joi.object().keys({
		productId: Joi.string().custom(objectId),
	}),
	body: Joi.object().keys({
		name: Joi.string(),
		description: Joi.string(),
		basePrice: Joi.number(),
		dailyPrice: Joi.number(),
		discountsUser: Joi.array().items(priceChangeUserSchema),
		discountsDate: Joi.array().items(priceChangeDateSchema),
		surchargeUser: Joi.array().items(priceChangeUserSchema),
		surchargeDate: Joi.array().items(priceChangeDateSchema),
		surchargeExtra: Joi.array().items(priceChangeReasonSchema),
	}),
}

const deleteProduct = {
	params: Joi.object().keys({
		productId: Joi.string().custom(objectId),
	}),
}

const toggleFavourite = {
	params: Joi.object().keys({
		productId: Joi.string().custom(objectId),
	}),
}
  
const toggleNotifications = {
	params: Joi.object().keys({
		productId: Joi.string().custom(objectId),
	}),
}

module.exports = {
	addProduct,
	getProducts,
	getProduct,
	updateProduct,
	deleteProduct,
	toggleFavourite,
	toggleNotifications,
};