const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { categoryValidation } = require('../../validations');
const { categoryController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .get(validate(categoryValidation.getCategories), categoryController.getCategories)
  .post(validate(categoryValidation.addCategory), categoryController.addCategory)

router
  .route('/:categoryId')
  // TODO .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
  // TODO .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
  .delete(validate(categoryValidation.deleteCategory), categoryController.deleteCategory);

module.exports = router;