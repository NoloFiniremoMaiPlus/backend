const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose, 2);
const { toJSON, paginate } = require('./plugins');
const brands = require('../config/brands');
const categories = require('../config/categories');
const itemStates = require('../config/itemStates');
const { discountDateSchema, discountWeekDaySchema } = require('./discount.model');

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
      default: 0,
    },
    discountsDate: [{type: discountDateSchema}],
    discountsWeekday: [{type: discountWeekDaySchema}],
    // TODO
	  /* review: [{type: mongoose.Types.ObjectId,
                  ref: "Review"}], */ 
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
        })
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

/**
 * isAvailable?
 * @param {string} from Date from
 * @param {string} to Date to
 * @returns Range where this is available
 */
itemSchema.methods.isUnavailable = async function (from, to, rangeId) {
  const item = this;
  from = new Date(from);
  to = new Date(to);

  return item.unavailable.find((range) => {
    /**
     * If either 'from' or 'to' is inside 'range' (1, 2),
     * or includes 'range' (3)
     * the item is unavailable for that time period [from, to]
     */
    return range.id != rangeId && 
        ((range.from <= from && from <= range.to) // 1
        || (range.from <= to && to <= range.to) // 2
        || (from <= range.from && range.to <= to)); // 3
  });
};

itemSchema.pre('findOneAndUpdate', async function(next) {
  const docToUpdate = await this.model.findOne(this.getQuery()); // The document that `findOneAndUpdate()` will modify
  if (this._update.basePrice || this._update.dailyPrice) {
    base = this._update.basePrice || docToUpdate.basePrice
    daily = this._update.dailyPrice || docToUpdate.dailyPrice
    this._update.totalPrice = base + daily
  }
  next();
});

itemSchema.pre('save', async function (next) {
  const item = this;
  if (item.isModified('basePrice') || item.isModified('dailyPrice'))
    item.totalPrice = item.basePrice + item.dailyPrice;
  next();
});

/**
 * @typedef Item
 */
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
