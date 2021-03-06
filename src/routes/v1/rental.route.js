const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { rentalValidation } = require('../../validations');
const { rentalController } = require('../../controllers');

const router = express.Router();

router
    .route('/')
    .get(auth(), validate(rentalValidation.getRentals), rentalController.getRentals)
    .post(auth(), validate(rentalValidation.createRental), rentalController.createRental);

router
    .route('/:rentalId')
    .get(auth(), validate(rentalValidation.getRental), rentalController.getRental)
    .patch(auth('manageRentals'), validate(rentalValidation.updateRental), rentalController.updateRental)
    .delete(auth(), validate(rentalValidation.deleteRental), rentalController.deleteRental);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Rental
 *   description: Rental management and retrieval
 */

/**
 * @swagger
 * /rentals:
 *   get:
 *     summary: Get all rents
 *     description: get all rents
 *     tags: [Rental]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *         description: User id
 *       - in: query
 *         name: resp
 *         schema:
 *           type: string
 *         description: Backoffice id responsible for this rental
 *       - in: query
 *         name: item
 *         schema:
 *           type: string
 *         description: Item id
 *       - in: query
 *         name: state
 *         schema:
 *           type: state
 *         description: Rental's State
 *       - in: query
 *         name: from
 *         schema:
 *           type: date
 *         description: Rental start date
 *       - in: query
 *         name: to
 *         schema:
 *           type: date
 *         description: Rental end date
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
 *                     $ref: '#/components/schemas/Rental'
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
 *     summary: Create a rent
 *     description:
 *     tags: [Rental]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - item
 *               - from
 *               - to
 *             properties:
 *               user:
 *                 type: string
 *                 description: User can assing rent to themself. Admin can do whatever they want
 *               item:
 *                 type: string
 *               state:
 *                 type: string
 *                 description: User can only "book" rental. Admin can do whatever they want
 *               from:
 *                 type: string
 *                 format: date
 *               to:
 *                 type: string
 *                 format: date
 *               return:
 *                 type: string
 *                 format: date
 *                 description: User cannot use this field, only admin.
 *               base:
 *                 type: number
 *               total:
 *                 type: number
 *               discounts:
 *                 type: object
 *                 properties:
 *                   amount: 
 *                     type: number
 *                   description:
 *                     type: string
 *               loyalty:
 *                 type: number
 *                 description: must be greater or equal to current User points
 *               surcharge:
 *                 type: number
 *             example:
 *               user: user-id
 *               item: item-id
 *               state: "Booked"
 *               from: 2022-01-01
 *               to: 2022-01-07
 *               return: 20220-01-14
 *               base: 50
 *               total: 50
 *               discounts: []
 *               loyalty: 100
 *               surcharge: 0
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Rental'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /rentals/{id}:
 *   get:
 *     summary: Get a rental
 *     description: Logged in users can fetch only their own rentals. Only admins can fetch rentals from any user.
 *     tags: [Rental]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Rental id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Rental'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a rental info
 *     description: Logged in users can only update their own information. Only admins can update other users.
 *     tags: [Rental]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Rental id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               item:
 *                 type: string
 *               state:
 *                 type: string
 *               from:
 *                 type: string
 *                 format: date
 *               to:
 *                 type: string
 *                 format: date
 *               return:
 *                 type: string
 *                 format: date
 *               base:
 *                 type: number
 *               total:
 *                 type: number
 *               discounts:
 *                 type: object
 *                 properties:
 *                   amount: 
 *                     type: number
 *                   description:
 *                     type: string
 *               surcharge:
 *                 type: number
 *               annotation:
 *                 $ref: '#/components/schemas/Annotation'
 *             example:
 *               user: user-id
 *               item: item-id
 *               state: "Booked"
 *               from: 2022-01-01
 *               to: 2022-01-07
 *               return: 2022-01-14
 *               base: 50
 *               total: 50
 *               discounts: []
 *               surcharge: 0
 *               annotation:
 *                 quick: ["Quick", "Text"]
 *                 text: "Text"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Rental'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a rental
 *     description: Logged in users can delete only themselves. Only admins can delete other users.
 *     tags: [Rental]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Rental id
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
