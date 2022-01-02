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