const mongoose = require('mongoose');
const { dateRangeSchema } = require('./dateRange.model');
const itemStates = require('../config/itemStates');

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

const priceChangeUserSchema = mongoose.Schema({
	user: {
		type: mongoose.Types.ObjectId,
		ref: "User"
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
		enum: itemStates,
	},
	amount: {
		type: Number,
		min: 0
	}
});

module.exports = {
    priceChangeDateSchema,
    priceChangeWeekDaySchema,
    priceChangeUserSchema,
    priceChangeReasonSchema,
}