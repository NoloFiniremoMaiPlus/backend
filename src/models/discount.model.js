const mongoose = require('mongoose');

const discountDateSchema = mongoose.Schema(
  {
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
    },
    amount: {
      type: Number,
      min: 0,
      max: 100,
    },
    description: {
      type: String,
    },
  },
  { _id: false }
);

const discountWeekDaySchema = mongoose.Schema(
  {
    from: {
      type: Number,
      required: true,
      min: 0,
      max: 6,
    },
    // TODO: to->min : from
    to: {
      type: Number,
      min: 0,
      max: 6,
    },
    amount: {
      type: Number,
      min: 0,
      max: 100,
    },
    description: {
      type: String,
    },
  },
  { _id: false }
);

module.exports = {
  discountDateSchema,
  discountWeekDaySchema,
};
