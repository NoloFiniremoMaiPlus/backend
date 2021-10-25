const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { priceChangeDateSchema,
			  priceChangeUserSchema,
			  priceChangeReasonSchema } = require('./priceChange.model');

const categorySchema = mongoose.Schema({
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
	basePrice:{
		type: mongoose.Types.Decimal128,
		required: true,
	},
	dailyPrice:{
		type: mongoose.Types.Decimal128,
		required: true,
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
	items: [{type: mongoose.Types.ObjectId,
						ref: "Item"}],
	}, {
		timestamps: true,
    collection: 'categories'
	});
  
  
// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

/**
 * @typedef Category
 */
categorySchema.index( {name: "text", description: "text"} );
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;