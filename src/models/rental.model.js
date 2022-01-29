const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose, 2);
const { toJSON, paginate } = require('./plugins');
const rentalStates = require('../config/rentalStates');
const { annotationSchema } = require('./annotation.model');

const rentalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
      autopopulate: true
    },
    resp: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      autopopulate: true
    },
    item: {
      type: mongoose.Types.ObjectId,
      ref: 'Item',
      required: true,
      autopopulate: true
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
    return: {
      type: Date,
    },

    // Price Fields
    base: {
      type: Float,
      min: 0,
      required: true,
    },
    total: {
      type: Float,
      min: 0,
      required: true,
    },
    discounts: [{
      amount: {
        type: Float,
        min: 0,
      },
      description: {
        type: String
      }
    }],
    loyalty: {
      type: Number,
      min: 0,
    },
    surcharge: {
      type: Float,
      min: 0,
    },

    annotation: { 
      type: annotationSchema,
    },
  },
  { timestamps: true, collection: 'rentals' }
);

// add plugin that converts mongoose to json
rentalSchema.plugin(toJSON);
rentalSchema.plugin(paginate);
rentalSchema.plugin(require('mongoose-autopopulate'));

/**
 * @typedef Rental
 */
const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;
