const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose, 2);
const { toJSON, paginate } = require('./plugins');
const brands = require('../config/brands');
const categories = require('../config/categories');
const itemStates = require('../config/itemStates');

const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
      enum: categories,
    },
    brand: {
      type: String,
      enum: brands,
    },
    // Todo delte this shit
    resp: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    state: {
      type: String,
      enum: itemStates,
      default: 'Mint',
    },
    basePrice: {
      type: Float,
      required: true,
    },
    dailyPrice: {
      type: Float,
      required: true,
    },
    totalPrice: {
      type: Float,
      default: 0,
    },
    discount: {
      type: Number,
    },
    // TODO
	  /* review: [{type: mongoose.Types.ObjectId,
                  ref: "Review"}], */ 
    /* discounts: { type: [discountSchema], },*/
    enabled: {
      type: Boolean,
      default: true,
    },
    unavailable: {
      type: [mongoose.Schema(
        {
          from: {
            type: Date,
            required: true,
          },
          to: {
            type: Date,
          },
        }, { _id: false })
      ],
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true }
  }
);

// add plugin that converts mongoose to json
itemSchema.plugin(toJSON);
itemSchema.plugin(paginate);

itemSchema.index({name: 'text', description: 'text'});

itemSchema.post('findOneAndUpdate', async function (result) {

  const modifiedFields = this.getUpdate().$set;
  const item = result;
  if (modifiedFields.hasOwnProperty('basePrice') || 
      modifiedFields.hasOwnProperty('dailyPrice')) {
    item.totalPrice = item.basePrice + item.dailyPrice;
  }

  result.save();
  
});

/**
 * @typedef Item
 */
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
