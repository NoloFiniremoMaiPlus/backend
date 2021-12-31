const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { rentalService } = require('../services');
const ApiError = require('../utils/ApiError');

const createRental = catchAsync(async (req, res) => {
    const rental = await rentalService.createRental(req.body);
    res.status(httpStatus.CREATED).send(rental);
});
  
const getRentals = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['user', 'item', 'state', 'from', 'to']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await rentalService.queryRentals(filter, options);
    res.send(result);
});

module.exports = {
    createRental,
    getRentals,
    /*getRental,
    updateRental,
    deleteRental,*/
}