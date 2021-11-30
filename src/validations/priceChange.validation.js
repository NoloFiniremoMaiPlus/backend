const Joi = require('joi');
const { objectId } = require('./custom.validation');


const priceChangeDateSchema = {
	from: Joi.date().iso().required(),
	to: Joi.date().iso().min(Joi.ref('from')), // min is used as >=
	amount: Joi.number().min(0).max(100),
}

const priceChangeUserSchema = {
	user: Joi.custom(objectId),
	amount: Joi.number().min(0).max(100),
}
	
const priceChangeReasonSchema = {
	reason: Joi.string().valid('Mint', 'Sligthy damaged', 'Damaged', 'Destroyed'),
	amount: Joi.number().min(0)
};

module.exports = {
    priceChangeDateSchema,
    priceChangeUserSchema,
    priceChangeReasonSchema,
}