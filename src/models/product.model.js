const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose, 2);
const { toJSON, paginate } = require('./plugins');
const { priceChangeDateSchema,
		priceChangeUserSchema,
		priceChangeReasonSchema } = require('./priceChange.model');

const productSchema = mongoose.Schema({
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
    collection: 'products'
	});
  
  
// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

productSchema.statics.isNameTaken = async function (name, excludeProductId) {
	const product = await this.findOne({ name, _id: { $ne: excludeProductId } });
	return !!product;
};

/**
 * @typedef Product
 */
productSchema.index( {name: "text", description: "text"} );
const Product = mongoose.model('Product', productSchema);

module.exports = Product;