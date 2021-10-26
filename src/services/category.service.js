const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { Category } = require('../models');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

const addCategory = async (categoryBody) => {
    return Category.create(categoryBody);
};

const getCategories = async (filter, options) => {
    const categories = await Category.paginate(filter, options);
    return categories;
}

const getCategoryById = async (categoryId) => {
    return Category.findById(categoryId);
};

const updateCategory = async (categoryId, updateBody) => {
    
    if(!(await getCategoryById(categoryId)))
        throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
    
    if(updateBody.name && (await Category.isNameTaken(updateBody.name, categoryId)))
        throw new ApiError(httpStatus.CONFLICT, 'Name already exists');

    const updated = await Category.findByIdAndUpdate(categoryId, updateBody, {new: true});
    return updated;
};

/**
 * Delete category by id
 * @param {ObjectId} categoryId
 * @returns {Promise<Category>}
 */
const deleteCategoryById = async (categoryId) => {
    await Category.deleteOne({_id : categoryId}, (err, result) => {
        if(err || result.n === 0) throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
        return result;
    });
};

module.exports = {
    addCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategoryById,
};