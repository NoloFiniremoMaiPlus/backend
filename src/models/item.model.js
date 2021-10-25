const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { dateRangeSchema } = require('./dateRange.model');
const itemStates = require('../config/itemStates');


const itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  totalRatings: {
    type: Number,
    default : 0,
  },
  frontImage: {
    type: String,
  },
  otherImages: {
    type: [String],
  },
  state: {
    type: String,
    enum: itemStates,
    default: 'Mint',
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  availability: {
    type: [dateRangeSchema],
  },
}, {
  timestamps: true,
  collection: 'categories'
  });


// add plugin that converts mongoose to json
itemSchema.plugin(toJSON);
itemSchema.plugin(paginate);


/**
 * @typedef Item
 */
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;