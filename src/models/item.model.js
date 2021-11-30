const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const itemStates = require('../config/itemStates');

const itemSchema = mongoose.Schema(
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
    frontImage: {
      type: String,
    },
    otherImages: {
      type: [String],
    },
    state: {
      type: String,
      enum: itemStates,
      default: 'Mint',
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    availability: {
      type: [
        {
          from: {
            type: Date,
            required: true,
          },
          to: {
            type: Date,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
itemSchema.plugin(toJSON);
itemSchema.plugin(paginate);

/**
 * Check if Item Name is taken
 * @param {string} name - The item's name
 * @param {ObjectId} [excludeItemId] - The id of the item to be excluded
 * @returns {Promise<boolean>}
 */
itemSchema.statics.isNameTaken = async function (name, excludeItemId) {
  const item = await this.findOne({ name, _id: { $ne: excludeItemId } });
  return !!item;
};

/**
 * @typedef Item
 */
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
