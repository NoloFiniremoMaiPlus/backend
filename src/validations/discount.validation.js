const Joi = require('joi');

const discountDateSchema = {
	from: Joi.date().iso().required(),
	to: Joi.date().iso().min(Joi.ref('from')), // min is used as >=
	amount: Joi.number().min(0).max(100),
	description: Joi.string()
}

const discountWeekDaySchema = {
	from: Joi.number().min(0).max(6).integer().required(),
	to: Joi.number().min(Joi.ref('from')).max(6).integer(), // min is used as >=
	amount: Joi.number().min(0).max(100),
	description: Joi.string()
}

module.exports = {
	discountDateSchema,
	discountWeekDaySchema,
}