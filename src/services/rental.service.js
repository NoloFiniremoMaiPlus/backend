const httpStatus = require('http-status');
const { Rental, User } = require('../models');
const userService = require('./user.service');
const itemService = require('./item.service');
const ApiError = require('../utils/ApiError');


// If it ended, add loyalty points to User
const endRental = (rental) => {
    if(rental.state == "Returned")
        userService.updateUserById(rental.user, 
                                    { $inc : {
                                        loyalty: Math.floor(rental.price/20)
                                    } });
}

const createRental = async (rentalBody, estimate) => {

    item = await itemService.getItemById(rentalBody.item);

    if(!item)
        throw new ApiError(httpStatus.NOT_FOUND, "Item not found");

    if(await item.isUnavailable(rentalBody.from, rentalBody.to) || !item.enabled)
        throw new ApiError(httpStatus.FORBIDDEN, "Item unavailable")

    if(!(await userService.getUserById(rentalBody.user)))
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");

    if(!(await User.enoughLoyalty(rentalBody.user, rentalBody.loyalty)))
        throw new ApiError(httpStatus.FORBIDDEN, "Insufficent loyalty points");
    
    if(!rentalBody.base && !rentalBody.discounts){
        const {base, total, discounts} = await getRentalPrice(item, new Date(rentalBody.from), new Date(rentalBody.to));
        rentalBody.base = base;
        rentalBody.discounts = discounts;
        rentalBody.total = total;
    }

    // Cap max loyalty points
    if(rentalBody.loyalty > rentalBody.total)
        rentalBody.loyalty = rentalBody.total;
    
    rentalBody.total -= rentalBody.loyalty;

    if (estimate) {
        return new Rental(rentalBody);
    } else {
        // Mark item unavailable
        itemService.addUnavailable(rentalBody.item, rentalBody.from, rentalBody.to);

        // Subtract loyalty points from user
        userService.updateUserById(rentalBody.user, {$inc : {loyalty: -rentalBody.loyalty} });

        endRental(rentalBody);

        return Rental.create(rentalBody);
    }
};

const queryRentals = async (filter, options) => {
    const rentals = await Rental.paginate(filter, options);
    return rentals
};

const getRentalById = async (id) => {
    return Rental.findById(id);
};

const updateRentalById = async (rentalId, updateBody) => {
    rent = await getRentalById(rentalId);
    if (!rent)
        throw new ApiError(httpStatus.NOT_FOUND, 'Rental not found');

    from = rent.from
    to = rent.to
    
    // if 'from', 'to' or 'item' isn't passed, use the one in rent
    updateBody.from = updateBody.from || from;
    updateBody.to = updateBody.to || to;
    updateBody.item = updateBody.item || rent.item;
    
    if(updateBody.from > updateBody.to)
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid dates")

    item = await itemService.getItemById((updateBody.item));
    if(!item)
        throw new ApiError(httpStatus.NOT_FOUND, "Item not found");

    rangeId = item.unavailable.find(obj => {
        return obj.from.getTime() == from.getTime() 
            && obj.to.getTime() == to.getTime();
    }).id;
    //Check if expanding the range, it overlaps with another rental
    if( (new Date(updateBody.from) < from && await item.isUnavailable(updateBody.from, from-1, rangeId)) ||
            (to < new Date(updateBody.to) && await item.isUnavailable(to+1, updateBody.to, rangeId)) )
        throw new ApiError(httpStatus.FORBIDDEN, "Item unavailable")

    if(updateBody.user && !(await userService.getUserById(updateBody.user)))
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");

    var rental = await Rental.findByIdAndUpdate(rentalId, updateBody, { returnDocument: 'after' }).exec();
    
    endRental(rental);

    // Delete old date range
    await itemService.deleteUnavailable(updateBody.item, from, to);

    // Add new date range
    await itemService.addUnavailable(updateBody.item, updateBody.from, updateBody.to);
    
    return await getRentalById(rentalId);
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
    
    itemService.deleteUnavailable(rental.item, rental.from, rental.to);

    // If still Booked, refound loyalty points
    if(rental.state == "Booked")
        userService.updateUserById(rental.user, {$inc : {loyalty: rental.loyalty} });
    
    await rental.remove();
    return rental;
};

const getRentalPrice = async (item, from, to) => {
    const base = item.basePrice + (Math.floor((to-from) / (1000*60*60*24))+1) * item.dailyPrice;
    var discounts = (item.discount > 0) ? [{amount: item.discount, description: "Flat Discount"}] : [];
    var total = item.basePrice * (1-((item.discount)/100));

    for(d = from; d <= to; d.setDate(d.getDate() + 1)){
        var max = 0;
        item.discountsDate.forEach(discount => {
            if((from < discount.from || discount.to < to) // discount can't start or end in rental range [from,to]
                && discount.from <= d && d <= discount.to // day is in discount range
                && discount.amount > max){ // new discount is better than the old
                max = discount.amount;
            }
        });
        item.discountsWeekday.forEach(discount => {
            if((from < discount.from || discount.to < to) // discount can't start or end in rental range [from,to]
                && discount.from <= d.getDay() && d.getDay() <= discount.to // day is in discount range
                && discount.amount > max){ // new discount is better than the old
                max = discount.amount;
            }
        });
        if (max != 0){
            discounts.push({
                amount: max,
                description: d.toISOString().split('T')[0]
            });
        }
        total += item.dailyPrice * (1-((item.discount+max)/100));
    }
    return {base, total, discounts};
};

module.exports = {
    createRental,
    queryRentals,
    getRentalById,
    updateRentalById,
    deleteRentalById,
}
