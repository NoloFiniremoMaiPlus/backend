const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { Category } = require('../models');
const ApiError = require('../utils/ApiError');

const addCategory = async (categoryBody) => {
    return Category.create(categoryBody);
};

const getCategories = async (filter, options) => {
    const categories = await Category.paginate(filter, options);
    return categories;
}

/**
 * Delete category by id
 * @param {ObjectId} categoryId
 * @returns {Promise<Category>}
 */
const deleteCategoryById = async (categoryId) => {
    await Category.deleteOne({_id : categoryId}, (err, result) => {
        console.log(result);
        if(err || result.n === 0) throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
        return result;
    });
};

module.exports = {
    addCategory,
    getCategories,
    deleteCategoryById,
};