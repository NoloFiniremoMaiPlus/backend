const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const dateRangeSchema = require('./dateRange.model');
const reasons = require('../config/reasons');

// TODO : delete duplicated discount and surcharge Schemas

const priceChangeUserSchema = mongoose.Schema({
  user: {
    type: String,
  },
  amount: {
    type: Number,
    min: 0,
    max: 100
  }
}, {_id: false});

const priceChangeDateSchema = mongoose.Schema({
  dateRange : {
    type : dateRangeSchema,
    required : true
  },
  amount: {
    type: Number,
    min: 0,
    max: 100
  }
}, {_id: false});

// Useless for now
const priceChangeWeekDaySchema = mongoose.Schema({
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

const priceChangeReasonSchema = mongoose.Schema({
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
    type: [priceChangeUserSchema],
  },
  discountsDate: {
    type: [priceChangeDateSchema],
  },
  surchargeUser: {
    type: [priceChangeUserSchema],
  },
  surchargeDate: {
    type: [priceChangeDateSchema],
  },
  surchargeExtra:{
    type: [priceChangeReasonSchema],
  },
  enabled : {
    type: Boolean,
    default: true,
  },
  availability: {
    type: [dateRangeSchema],
  },
},);

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    items: [{type: mongoose.Types.ObjectId,
              ref: itemSchema}]
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