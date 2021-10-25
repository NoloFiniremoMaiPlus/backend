const mongoose = require('mongoose');


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

module.exports = { dateRangeSchema };