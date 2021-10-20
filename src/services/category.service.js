const { Category } = require('../models');

const addCategory = async (categoryBody) => {
    return Category.create(categoryBody);
};

const getCategories = async (filter, options) => {
    const categories = await Category.paginate(filter, options)
    return categories;
}

module.exports = {
    addCategory,
    getCategories,
};