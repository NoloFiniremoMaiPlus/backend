const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const itemController = require('../../controllers/item.controller');

const router = express.Router();

router
.route('/')
.get(itemController.getItems);

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
 *           price: // ??
 *         }]
 */

/**
 * /search or /inventory
 *   get:
 *     summary: Get items by filters
 *     parameters:
 *       keyword
 *       categoria
 *       prezzo
 *       disponibilità
 *     responses:
 *       "200":
 *         [item {
 *           name
 *           description
 *           raiting
 *           frontImage
 *           ( itemState ? )
 *         }]
 *       "404":
 *         description: Can't find what you're looking for
 */
