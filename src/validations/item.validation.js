const Joi = require('joi');
const { objectId } = require('./custom.validation');
const brands = require('../config/brands');
const categories = require('../config/categories');
const itemStates = require('../config/itemStates');
const { discountDateSchema, discountWeekDaySchema } = require('./discount.validation');

const getItems = {
  query: Joi.object().keys({
    name: Joi.string().allow(null, ''),
    keywords: Joi.string().allow(null, ''),
    category: Joi.string().valid(...categories),
    brand: Joi.string().valid(...brands),
    state: Joi.string().valid(...itemStates),
    enabled: Joi.boolean(),
    priceFrom: Joi.number().integer(),
		priceTo: Joi.number().integer(),
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
    category: Joi.string().valid(...categories),
    brand: Joi.string().valid(...brands),
    state: Joi.string().valid(...itemStates).default(itemStates[0]),
    basePrice: Joi.number().required(),
		dailyPrice: Joi.number().required(),
    discount: Joi.number(),
    discountsDate: Joi.array().items(discountDateSchema),
    discountsWeekday: Joi.array().items(discountWeekDaySchema),
    enabled: Joi.boolean().default(true),
    unavailable: Joi.array().items({
      from: Joi.date().iso().required(),
      to: Joi.date().iso().min(Joi.ref('from')) // min is used as >=
    }),
  }),
};

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
    category: Joi.string().valid(...categories),
    brand: Joi.string().valid(...brands),
    state: Joi.string().valid(...itemStates),
    basePrice: Joi.number(),
		dailyPrice: Joi.number(),
    discount: Joi.number(),
    discountsDate: Joi.array().items(discountDateSchema),
    discountsWeekday: Joi.array().items(discountWeekDaySchema),
    enabled: Joi.boolean(),
    unavailable: Joi.array().items({
      from: Joi.date().iso(),
      to: Joi.date().iso().min(Joi.ref('from')) // min is used as >=
    }),
  }).min(1),
};

const deleteItem = {
  params: Joi.object().keys({
    itemId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  addItem,
  updateItem,
  getItems,
  getItem,
  deleteItem,
};
