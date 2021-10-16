const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const reasons = ["sligthy damaged", "damaged", "destroyed"];

const availabilitySchema = mongoose.Schema({
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date
  },
}, {_id: false});

const discountUserSchema = mongoose.Schema({
  user: {
    type: String,
  },
  amount: {
    type: Number,
    min: 0,
    max: 100
  }
}, {_id: false});

const discountDateSchema = mongoose.Schema({
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date
  },
  amount: {
    type: Number,
    min: 0,
    max: 100
  }
}, {_id: false});

const discountWeekDaySchema = mongoose.Schema({
  from: {
    type: Number,
    required: true,
    min: 0,
    max: 6
  },
  // TODO: to->min : from
  to: {
    type: Number,
    min: 0,
    max: 6
  },
  amount: {
    type: Number,
    min: 0,
    max: 100
  }
}, {_id: false});

const surchargeUserSchema = mongoose.Schema({
  user: {
    type: String,
  },
  amount: {
    type: Number,
    min: 0,
    max: 100
  }
}, {_id: false});

const surchargeDateSchema = mongoose.Schema({
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date
  },
  amount: {
    type: Number,
    min: 0,
    max: 100
  }
}, {_id: false});

const surchargeWeekDaySchema = mongoose.Schema({
  from: {
    type: Number,
    required: true,
    min: 0,
    max: 6
  },
  // TODO: to->min : from
  to: {
    type: Number,
    min: 0,
    max: 6
  },
  amount: {
    type: Number,
    min: 0,
    max: 100
  }
}, {_id: false});

const surchargeExtraSchema = mongoose.Schema({
  reason: {
    type: String,
    enum: reasons,
  },
  amount: {
    type: Number,
    min: 0
  }
});

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
  basePrice:{
    type: mongoose.Types.Decimal128,
    required: true,
  },
  dailyPrice:{
    type: mongoose.Types.Decimal128,
    required: true,
  },
  frontImage: {
    type: String,
  },
  otherImages: {
    type: [String],
  },
  discountsUser: {
    type: [discountUserSchema],
  },
  discountsDate: {
    type: [discountDateSchema],
  },
  surchargeUser: {
    type: [surchargeUserSchema],
  },
  surchargeDate: {
    type: [surchargeDateSchema],
  },
  surchargeExtra:{
    type: [surchargeExtraSchema],
  },
  enabled : {
    type: Boolean,
    default: true,
  },
  availability: {
    type: [availabilitySchema],
  }
  // rentals : { type : [rentalSchema] }
});

const categorySchema = mongoose.Schema(
  {
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
    items: {
      type: Map,
      of: itemSchema
    }
  },
  {
    timestamps: true,
    collection: 'categories'
  }
);


// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

// add plugin that converts mongoose to json
itemSchema.plugin(toJSON);
itemSchema.plugin(paginate);

/**
 * @typedef Category
 */
 const Category = mongoose.model('Category', categorySchema);

/**
 * @typedef Item
 */
const Item = mongoose.model('Item', itemSchema);

module.exports = {Category, 
                  Item};