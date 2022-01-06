const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { itemValidation } = require('../../validations');
const { itemController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .get(auth('getItems'), validate(itemValidation.getItems), itemController.getItems)
  .post(auth('manageItems'), validate(itemValidation.addItem), itemController.addItem)

router
  .route('/:itemId')
  .get(auth('getItems'), validate(itemValidation.getItem), itemController.getItem)
  .patch(auth('manageItems'), validate(itemValidation.updateItem), itemController.updateItem)
  .delete(auth('manageItems'), validate(itemValidation.deleteItem), itemController.deleteItem);


// TODO renderlo toggleEnableItem ?
router
  .route('/disableItem/:itemId')
  .post(auth('manageItems'), validate(itemValidation.disableItem), itemController.disableItem);

router
  .route('/enableItem/:itemId')
  .post(auth('manageItems'), validate(itemValidation.disableItem), itemController.enableItem);

/* TODO Spostare in product
router
  .route('/toggleFavourite/:itemId')
  .post(auth('rentItems'), validate(itemValidation.toggleFavouriteItem), toggleFavouriteItem)
router
  .route('/toggleNotifications/:itemId')
  .post(auth('rentItems'), validate(itemValidation.toggleItemNotifications), toggleItemNotifications)
*/

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Item
 *   description: Item management and retrieval
 */

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items
 *     description: get all items
 *     tags: [Item]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Item name
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Word in Item's name and/or description
 *       - in: query
 *         name: productId
 *         schema:
 *           type: string
 *         description: Item's Product ID
 *       - in: query
 *         name: state
 *         schema:
 *           type: state
 *         description: Item's State
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: date
 *         description: Item availability start date
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: date
 *         description: Item availability end date
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Item'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *   post:
 *     summary: Create a item
 *     description:
 *     tags: [Item]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               frontImage:
 *                 type: string
 *               otherImages:
 *                 type: string
 *               state:
 *                 type: string
 *               availability:
 *                 type: object
 *                 properties: 
 *                   from:
 *                     type: string
 *                     format: date
 *                   to:
 *                     type: string
 *                     format: date
 *               enabled:
 *                 type: boolean
 *             example:
 *               name: "Item"
 *               description: "Item's description"
 *               frontImage: "/path/to/file/"
 *               state: "Mint"
 *               availability: [{"from" : "2021-12-15", "to" : "2021-12-16"}]
 *               enabled: true
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Item'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get a item
 *     description: Fetch single item.
 *     tags: [Item]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Item id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Item'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a item info
 *     description: Only admins can update item info.
 *     tags: [Item]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Item id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               frontImage:
 *                 type: string
 *               otherImages:
 *                 type: string
 *               state:
 *                 type: string
 *               availability:
 *                 type: object
 *                 properties: 
 *                   from:
 *                     type: string
 *                     format: date
 *                   to:
 *                     type: string
 *                     format: date
 *               enabled:
 *                 type: boolean
 *             example:
 *               name: "Item"
 *               description: "Item's description"
 *               frontImage: "/path/to/file/"
 *               state: "Mint"
 *               availability: [{"from" : "2021-12-15", "to" : "2021-12-16"}]
 *               enabled: true
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Item'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a item
 *     description: Logged in users can delete only themselves. Only admins can delete other users.
 *     tags: [Item]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Item id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
