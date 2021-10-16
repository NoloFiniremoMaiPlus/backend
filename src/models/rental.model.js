const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');;

// Finished = finito tempo di noleggio
// Completed = Chiuso noleggio, ha pagato anche eventuali surplus
const states = ["Booked", "Ongoing", "Finished", "Completed"];

const dateRangeSchema = mongoose.Schema({
    from: {type: Date},
    to: {type: Date}
}, {_id: false});

const rentalSchema = mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        enum: states,
        default: "Booked",
    },
    date: {
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

module.exports = Rental;