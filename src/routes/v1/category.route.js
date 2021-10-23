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

/**
 * Nelle slide c'è scritto che un utente non loggato può vedere le categorie di oggetti
 * ma non gli oggetti singoli e date di disponibilità. MA IL PREZZO SI?!?!
 * Bisogna spostare il prezzo dall'oggetto singolo alla categoria di oggetti PALLE
 *
 * /category/
 *   get:
 *     summary: Get inventory categories
 *     description: User doesn't need to be authenticated
 *     parameters: None
 *     responses:
 *       "200":
 *         [category {
 *           name : "name",
 *           description: "desc",
 *           priceFrom: // ??
 *           priceTo: // ??
 *         }]
 */