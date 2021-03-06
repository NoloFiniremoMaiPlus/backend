const Joi = require('joi');
const { objectId } = require('./custom.validation');
const { annotationSchema } = require('./annotation.validation');
const rentalStates = require('../config/rentalStates');

const getRentals = {
  query: Joi.object().keys({
    user: Joi.string().custom(objectId),
    resp: Joi.string().custom(objectId),
    item: Joi.string().custom(objectId),
    state: Joi.string().valid(...rentalStates),
    from: Joi.date().iso(),
    to: Joi.date().iso().min(Joi.ref('from')), // min is used as >=, TODO require 'to' if 'from' exists
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const createRental = {
  body: Joi.object().keys({
    user: Joi.string().custom(objectId).required(),
    item: Joi.string().custom(objectId).required(),
    state: Joi.string().valid(...rentalStates),
    from: Joi.date().iso().required(),
    to: Joi.date().iso().min(Joi.ref('from')).required(), // min is used as >=
    return: Joi.date().iso().min(Joi.ref('to')),
    base: Joi.number().min(0),
    total: Joi.number().min(0),
    discounts: Joi.array().items(Joi.object().keys({
      amount: Joi.number().min(0),
      description: Joi.string(),
    })),
    loyalty: Joi.number().min(0).default(0),
    surcharge: Joi.number().min(0).default(0),
    estimate: Joi.boolean().default(false),
  }),
};

const getRental = {
  params: Joi.object().keys({
    rentalId: Joi.string().custom(objectId),
  }),
};

const updateRental = {
  params: Joi.object().keys({
    rentalId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    user: Joi.string().custom(objectId),
    item: Joi.string().custom(objectId),
    state: Joi.string().valid(...rentalStates),
    from: Joi.date().iso(),
    to: Joi.date().iso(),
    return: Joi.date().iso(),
    base: Joi.number().min(0),
    total: Joi.number().min(0),
    discounts: Joi.array().items(Joi.object().keys({
      amount: Joi.number().min(0),
      description: Joi.string(),
    })),
    surcharge: Joi.number().min(0),
    annotation: annotationSchema,
  })
  .min(1),
};

const deleteRental = {
  params: Joi.object().keys({
    rentalId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createRental,
  getRentals,
  getRental,
  updateRental,
  deleteRental,
};
