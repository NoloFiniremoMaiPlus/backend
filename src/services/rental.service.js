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


module.exports = {
    createRental,
    queryRentals,
}