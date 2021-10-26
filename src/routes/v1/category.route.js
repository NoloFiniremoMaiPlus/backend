const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { categoryValidation } = require('../../validations');
const { categoryController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .get(validate(categoryValidation.getCategories), categoryController.getCategories)
  .post(/*auth('manageCategories'),*/ validate(categoryValidation.addCategory), categoryController.addCategory)

router
  .route('/:categoryId')
  .get(/*auth('getCategory'),*/ validate(categoryValidation.getCategory), categoryController.getCategory)
  .patch(/*auth('manageCategories'),*/ validate(categoryValidation.updateCategory), categoryController.updateCategory)
  .delete(/*auth('manageCategories'),*/ validate(categoryValidation.deleteCategory), categoryController.deleteCategory);

module.exports = router;