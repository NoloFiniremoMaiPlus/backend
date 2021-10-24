const Joi = require('joi');
const { objectId } = require('./custom.validation');
const { periodSchema } = require('./period.validation')


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
  // availability: {
  //   type: [dateRangeSchema],
  // },

const addItem = {
    body: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string(),
      rating: Joi.number().integer().min(1).max(5),
      totalRatings: Joi.number().integer().default(0),
      basePrice: Joi.number().required(),
      dailyPrice: Joi.number().required(),
      frontImage: Joi.string().allow(null, '').default(null),
      otherImages: Joi.array().items(Joi.string().allow(null, '')).default(null),
      //TODO: mancano quei cosi
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
    rating: Joi.number().integer().min(1).max(5),
    totalRatings: Joi.number().integer(),
    basePrice: Joi.number().required(),
    dailyPrice: Joi.number().required(),
    frontImage: Joi.string().allow(null, ''),
    otherImages: Joi.array().items(Joi.string().allow(null, '')),
    //TODO: mancano quei cosi
    enabled: Joi.boolean().default(true),
  }),
}

const getItems = {
    query: Joi.object().keys({
        name: Joi.string().allow(null, ''),
        keywords: Joi.string().allow(null, ''),
        categoryId: Joi.string().custom(objectId),
        rating: Joi.number().default(0),
        priceFrom: Joi.number().integer(),
        priceTo: Joi.number().integer(),
        dateFrom: Joi.date().format("DD/MM/YYYY"),
        dateTo: Joi.date().format("DD/MM/YYYY"),
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