const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const rentalStates = require('../config/rentalStates');

const rentalSchema = mongoose.Schema(
  {
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
      enum: rentalStates,
      default: 'Booked',
    },

    // Date Fields
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
    },

    // Price Fields
    price: {
      type: mongoose.Types.Decimal128,
      min: 0,
      required: true,
    },
    surcharge: {
      type: mongoose.Types.Decimal128,
      min: 0,
    },
  },
  { timestamps: true, collection: 'rentals' }
);

// add plugin that converts mongoose to json
rentalSchema.plugin(toJSON);
rentalSchema.plugin(paginate);

/**
 * @typedef Rental
 */
const Rental = mongoose.model('Rental', rentalSchema);

module.exports = { rentalSchema, Rental };
