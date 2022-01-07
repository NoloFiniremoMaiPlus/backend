const Joi = require('joi');
const { objectId } = require('./custom.validation');
const itemStates = require('../config/itemStates')

const getItems = {
  query: Joi.object().keys({
    name: Joi.string().allow(null, ''),
    keywords: Joi.string().allow(null, ''),
    //state: Joi.array().items(Joi.string().valid(...itemStates)),
    state: Joi.string().valid(...itemStates),
    // TODO change this to convention
    priceFrom: Joi.number().integer(),
		priceTo: Joi.number().integer(),
    dateFrom: Joi.date(),
    dateTo: Joi.date(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const addItem = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    image: Joi.string().allow(null, '').default(null),
    basePrice: Joi.number(),
		dailyPrice: Joi.number(),
    state: Joi.string().valid(...itemStates).default(itemStates[0]),
    enabled: Joi.boolean().default(true),
    availability: Joi.array().items({
      from: Joi.date().iso().required(),
      to: Joi.date().iso().min(Joi.ref('from')) // min is used as >=
    }),
  }),
}

const getItem = {
  params: Joi.object().keys({
    itemId: Joi.string().custom(objectId),
  }),
};

const updateItem = {
  params: Joi.object().keys({
    itemId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    image: Joi.string().allow(null, ''),
    basePrice: Joi.number(),
		dailyPrice: Joi.number(),
    state: Joi.string().valid(...itemStates),
    enabled: Joi.boolean(),
    availability: Joi.array().items({
      from: Joi.date().iso(),
      to: Joi.date().iso().min(Joi.ref('from')) // min is used as >=
    }),
  }).min(1),
}

const deleteItem = {
  params: Joi.object().keys({
    itemId: Joi.string().custom(objectId),
  }),
}

module.exports = {
  addItem,
  updateItem,
  getItems,
  getItem,
  deleteItem,
};