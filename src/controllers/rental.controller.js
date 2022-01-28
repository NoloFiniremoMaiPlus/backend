const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { rentalService } = require('../services');
const ApiError = require('../utils/ApiError');

const createRental = catchAsync(async (req, res) => {
    
    if(req.user.role == "user"){
        // State Booked
        delete req.body.state;
        // No return date
        delete req.body.return;

        if(req.user.id != req.body.user)
            throw new ApiError(httpStatus.FORBIDDEN, "Cannot rent an item for another user");
    } else {
        // if rental is created by manager or backoffice, they become the resp
        req.body.resp = req.user.id
    }
    
    const rental = await rentalService.createRental(req.body);
    res.status(httpStatus.CREATED).send(rental);
});
  
const getRentals = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['user', 'resp', 'item', 'state', 'from', 'to']);
    
    if(req.user.role == "user"){
        filter.user = req.user.id
    }
    // add searching for from and to

    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await rentalService.queryRentals(filter, options);
    res.send(result);
});

const getRental = catchAsync(async (req, res) => {
    const rental = await rentalService.getRentalById(req.params.rentalId);
    if (!rental) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Rental not found');
    } else if (req.user.role = "user" && req.user.id !== rental.user) {
        // User can see their rental, mangager/backoffice can see every rental
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
    }
    res.send(rental); 
});

const updateRental = catchAsync(async (req, res) => {
    // when backoffice or manager edit the rental they become the resp
    if(req.user.role != "user")
        req.body.resp = req.user.id
    const rental = await rentalService.updateRentalById(req.params.rentalId, req.body);
    res.send(rental);
});

const deleteRental = catchAsync(async (req, res) => {
    await rentalService.deleteRentalById(req.params.rentalId);
    res.sendStatus(httpStatus.NO_CONTENT);
});

module.exports = {
    createRental,
    getRentals,
    getRental,
    updateRental,
    deleteRental,
}