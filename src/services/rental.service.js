const httpStatus = require('http-status');
const { Rental, User } = require('../models');
const userService = require('./user.service');
const itemService = require('./item.service');
const ApiError = require('../utils/ApiError');

// If it ended, add loyalty points to User
const endRental = (rental) => {
    if(rental.state == "Completed")
        userService.updateUserById(rental.user, 
                                    { $inc : {
                                        loyalty: Math.floor(rental.price/20)
                                    } });
}

const createRental = async (rentalBody) => {
    if( ! (await User.enoughLoyalty(rentalBody.user, rentalBody.loyalty)))
        throw new ApiError(httpStatus.FORBIDDEN, "Insufficend loyalty points");

    userService.updateUserById(rentalBody.user, {$inc : {loyalty: -rentalBody.loyalty} });

    endRental(rentalBody);

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
    var rental = await Rental.findByIdAndUpdate(rentalId, updateBody, { returnDocument: 'after' }).exec();
    if (!rental)
        throw new ApiError(httpStatus.NOT_FOUND, 'Rental not found');

    endRental(rental);

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