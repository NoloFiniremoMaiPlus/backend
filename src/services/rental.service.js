const httpStatus = require('http-status');
const { Rental, User, Item } = require('../models');
const userService = require('./user.service');
const itemService = require('./item.service');
const ApiError = require('../utils/ApiError');

const createRental = async (rentalBody) => {
    userService.updateUserById(rentalBody.user, {$inc : {loyalty: -rentalBody.loyalty} });

    // Assing resp from item
    item = await itemService.getItemById(rentalBody.item);
    rentalBody.resp = item.resp;

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
    if (updateBody.email && (await Rental.isEmailTaken(updateBody.email, rentalId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    var rental = await Rental.findByIdAndUpdate(rentalId, updateBody, { returnDocument: 'after' }).exec();
    if (!rental) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Rental not found');
    }

    // If it ended, add loyalty points to User
    if(rental.state == "Completed")
        userService.updateUserById(rental.user, {$inc : {loyalty: rental.loyalty} });

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
    
    // If still Booked, refound loyalty points
    if(rental.state == "Booked")
        userService.updateUserById(rental.user, {$inc : {loyalty: rental.loyalty} });
    
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