const Joi = require('joi');
const { annotationSchema } = require('./annotation.validation');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.string(),
    password: Joi.string().required().custom(password),
    role: Joi.string().required().valid('user', 'backoffice', 'manager'),
    loyalty: Joi.number().min(0),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    surname: Joi.string(),
    username: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      surname: Joi.string(),
      username: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.string(),
      password: Joi.string().custom(password),
      loyalty: Joi.number().min(0),
      annotation: annotationSchema,
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
