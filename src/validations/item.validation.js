const Joi = require('joi');
const { objectId } = require('./custom.validation');
const { dateRangeSchema } = require('./dateRange.validation')


const addItem = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    totalRatings: Joi.number().integer().default(0),
    frontImage: Joi.string().allow(null, '').default(null),
    otherImages: Joi.array().items(Joi.string().allow(null, '')).default(null),
    state: Joi.string().valid('Mint', 'Sligthy damaged', 'Damaged', 'Destroyed').default('Mint'),
    availability: Joi.array().items(dateRangeSchema),
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
    basePrice: Joi.number().required(),
    dailyPrice: Joi.number().required(),
    frontImage: Joi.string().allow(null, ''),
    otherImages: Joi.array().items(Joi.string().allow(null, '')),
    state: Joi.string().valid('Mint', 'Sligthy damaged', 'Damaged', 'Destroyed'),
    availability : Joi.array().items(dateRangeSchema),
    enabled: Joi.boolean(),
  }),
}

const getItems = {
  query: Joi.object().keys({
    name: Joi.string().allow(null, ''),
    keywords: Joi.string().allow(null, ''),
    categoryId: Joi.string().custom(objectId),
    rating: Joi.number().default(0),
    state: Joi.array().items(Joi.string().valid('Mint', 'Sligthy damaged', 'Damaged', 'Destroyed')),
    priceFrom: Joi.number().integer(),
    priceTo: Joi.number().integer(),
    dateFrom: Joi.date(),
    dateTo: Joi.date(),
    sortBy: Joi.string(),
    descending: Joi.bool().default(true),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getItem = {
  params: Joi.object().keys({
    itemId: Joi.string().custom(objectId),
  }),
};

const toggleFavouriteItem = {
  params: Joi.object().keys({
    itemId: Joi.string().custom(objectId),
  }),
}

const toggleItemNotifications = {
  params: Joi.object().keys({
    itemId: Joi.string().custom(objectId),
  }),
}

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
  toggleFavouriteItem,
  toggleItemNotifications,
  disableItem,
  deleteItem,
};