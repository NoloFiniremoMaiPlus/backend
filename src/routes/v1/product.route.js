const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { productValidation } = require('../../validations');
const { productController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .get(validate(productValidation.getProducts), productController.getProducts)
  .post(/*auth('manageProducts'),*/ validate(productValidation.addProduct), productController.addProduct)

router
  .route('/:productId')
  .get(/*auth('getProduct'),*/ validate(productValidation.getProduct), productController.getProduct)
  .patch(/*auth('manageProducts'),*/ validate(productValidation.updateProduct), productController.updateProduct)
  .delete(/*auth('manageProducts'),*/ validate(productValidation.deleteProduct), productController.deleteProduct);

module.exports = router;