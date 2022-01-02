const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { rentalValidation } = require('../../validations');
const { rentalController } = require('../../controllers');

const router = express.Router();

router
    .route('/')
    .get(/*auth('getUsers'),*/ validate(rentalValidation.getRentals), rentalController.getRentals)
    .post(/*auth(),*/ validate(rentalValidation.createRental), rentalController.createRental);

router
    .route('/:rentalId')
    .get(/*auth('getRentals'),*/ validate(rentalValidation.getRental), rentalController.getRental)
    .patch(/*auth('manageRental'),*/ validate(rentalValidation.updateRental), rentalController.updateRental)
    .delete(/*auth('manageRental'),*/ validate(rentalValidation.deleteRental), rentalController.deleteRental);

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
 *               - price
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
 *               price:
 *                 type: number
 *               surcharge:
 *                 type: number
 *             example:
 *               user: user-id
 *               item: item-id
 *               state: "Booked"
 *               from: 2022-01-01
 *               to: 2022-01-07
 *               price: 50
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
 *
 */