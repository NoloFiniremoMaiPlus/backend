const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const dateRangeSchema = mongoose.Schema({
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date
  },
}, {_id: false});


dateRangeSchema.plugin(toJSON);
dateRangeSchema.plugin(paginate);

/**
 * @typedef Item
 */
const DateRange = mongoose.model('DateRange', DateRange);

module.exports = dateRange;