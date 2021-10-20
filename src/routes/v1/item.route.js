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
