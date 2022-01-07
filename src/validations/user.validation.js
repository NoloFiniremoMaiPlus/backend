const Joi = require('joi');
const { annotationSchema } = require('./annotation.validation');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    phone: Joi.string(),
    role: Joi.string().required().valid('user', 'backoffice', 'manager'),
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
      username: Joi.string().required(),
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      phone: Joi.string(),
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
