const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');


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
            ref: "itemSchema"}]
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