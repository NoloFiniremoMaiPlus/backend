const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose, 2);
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
	basePrice: {
		type: Float,
		required: true,
	},
	dailyPrice: {
		type: Float,
		required: true,
	},
	// TODO spostare review in un model a partes
	rating: {
	  type: Number,
	  min: 0,
	  max: 5,
	},
	totalRatings: {
	  type: Number,
	  default : 0,
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
	surchargeExtra: {
		type: [priceChangeReasonSchema],
	},
	items: [{type: mongoose.Types.ObjectId,
			ref: "Item"}],
	// TODO
	/* review: [{type :mongoose.Types.ObjectId,
				ref: "Review"}] */ 
	}, {
		timestamps: true,
    collection: 'categories'
	});
  
  
// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

categorySchema.statics.isNameTaken = async function (name, excludeCategoryId) {
	const category = await this.findOne({ name, _id: { $ne: excludeCategoryId } });
	return !!category;
};

/**
 * @typedef Category
 */
categorySchema.index( {name: "text", description: "text"} );
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;