const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { itemValidation } = require('../../validations');
const { itemController } = require('../../controllers');

const router = express.Router();

//TODO: creare i ruoli per l'autentication
router
  .route('/')
  .get(/*auth('getItems'),*/ validate(itemValidation.getItems), itemController.getItems)
  .post(/*auth('manageItems'),*/ validate(itemValidation.addItem), itemController.addItem)
/*
router
  .route('/:itemId')
  .get(auth('getItems'), validate(itemValidation.getItem), itemController.getItem)
  .patch(auth('manageItems'), validate(itemValidation.updateItem), itemController.updateItem)
  .delete(auth('manageItems'), validate(itemValidation.deleteItem), itemController.deleteItem);

router
  .route('/disableItem/:itemId')
  .post(auth('manageItems'), validate(itemValidation.disableItem), itemController.disableItem)
router
  .route('/toggleFavourite/:itemId')
  .post(auth('rentItems'), validate(itemValidation.toggleFavouriteItem), toggleFavouriteItem)
router
  .route('/toggleNotifications/:itemId')
  .post(auth('rentItems'), validate(itemValidation.toggleItemNotifications), toggleItemNotifications)
*/
module.exports = router;