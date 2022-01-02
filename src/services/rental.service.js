const httpStatus = require('http-status');
const { Rental, User, Item } = require('../models');
const ApiError = require('../utils/ApiError');

 const createRental = async (rentalBody) => {
    return Rental.create(rentalBody);
};

const queryRentals = async (filter, options) => {
    const rentals = await Rental.paginate(filter, options);
    return rentals
};

const getRentalById = async (id) => {
    return Rental.findById(id);
};

const updateRentalById = async (rentalId, updateBody) => {
    const rental = await getRentalById(rentalId);
    if (!rental) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Rental not found');
    }
    if (updateBody.email && (await Rental.isEmailTaken(updateBody.email, rentalId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    Object.assign(rental, updateBody);
    await rental.save();
    return rental;
};
  
/**
 * Delete rental by id
 * @param {ObjectId} rentalId
 * @returns {Promise<Rental>}
 */
const deleteRentalById = async (rentalId) => {
    const rental = await getRentalById(rentalId);
    if (!rental) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Rental not found');
    }
    await rental.remove();
    return rental;
};
  

module.exports = {
    createRental,
    queryRentals,
    getRentalById,
    updateRentalById,
    deleteRentalById,
}