const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const dateRangeSchema = require('./dateRange.model');
const {Item} = require('./item.model');
const User = require('./user.model');

// Finished = finito tempo di noleggio
// Completed = Chiuso noleggio, ha pagato anche eventuali surplus
const states = ["Booked", "Ongoing", "Finished", "Completed"];

const rentalSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    item: {
        type: mongoose.Types.ObjectId,
        ref: 'Item',
        required: true,
    },
    state: {
        type: String,
        enum: states,
        default: "Booked",
    },
    dateRange: {
        type: dateRangeSchema,
        required: true,
    },
    price: {
        type: mongoose.Types.Decimal128,
        min: 0,
        required: true,
    },
    surcharge: {
        type: mongoose.Types.Decimal128,
        min: 0,
    },
}, {timestamps: true,
    collection: 'rentals',});

// add plugin that converts mongoose to json
rentalSchema.plugin(toJSON);
rentalSchema.plugin(paginate);

/**
 * @typedef Rental
 */
const Rental = mongoose.model('Rental', rentalSchema);

module.exports = {rentalSchema, Rental};