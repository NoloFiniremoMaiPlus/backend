const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

// TODO: to->min : from
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

module.exports = dateRangeSchema;