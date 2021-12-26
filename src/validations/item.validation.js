const Joi = require('joi');
const { objectId } = require('./custom.validation');


const addItem = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    frontImage: Joi.string().allow(null, '').default(null),
    otherImages: Joi.array().items(Joi.string().allow(null, '')).default(null),
    state: Joi.string().valid('Mint', 'Sligthy damaged', 'Damaged', 'Destroyed').default('Mint'),
    availability: Joi.array().items({
      from: Joi.date().iso().required(),
      to: Joi.date().iso().min(Joi.ref('from')) // min is used as >=
    }),
    enabled: Joi.boolean().default(true),
  }),
}

const updateItem = {
  params: Joi.object().keys({
    itemId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    frontImage: Joi.string().allow(null, ''),
    otherImages: Joi.array().items(Joi.string().allow(null, '')),
    state: Joi.string().valid('Mint', 'Sligthy damaged', 'Damaged', 'Destroyed'),
    availability : Joi.array().items({
      from: Joi.date().iso().required(),
      to: Joi.date().iso().min(Joi.ref('from')) // min is used as >=
    }),
    enabled: Joi.boolean(),
  }),
}

const getItems = {
  query: Joi.object().keys({
    name: Joi.string().allow(null, ''),
    keywords: Joi.string().allow(null, ''),
    productId: Joi.string().custom(objectId),
    state: Joi.array().items(Joi.string().valid('Mint', 'Sligthy damaged', 'Damaged', 'Destroyed')),
    dateFrom: Joi.date(),
    dateTo: Joi.date(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getItem = {
  params: Joi.object().keys({
    itemId: Joi.string().custom(objectId),
  }),
};

const disableItem = {
  params: Joi.object().keys({
    itemId: Joi.string().custom(objectId),
  }),
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
  disableItem,
  deleteItem,
};