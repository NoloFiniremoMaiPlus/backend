const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { Product } = require('../models');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

const addProduct = async (productBody) => {
    return Product.create(productBody);
};

const getProducts = async (filter, options) => {
    const products = await Product.paginate(filter, options);
    return products;
}

const getProductById = async (productId) => {
    return Product.findById(productId);
};

const updateProduct = async (productId, updateBody) => {
    
    if(!(await getProductById(productId)))
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    
    if(updateBody.name && (await Product.isNameTaken(updateBody.name, productId)))
        throw new ApiError(httpStatus.CONFLICT, 'Name already exists');

    Product.findByIdAndUpdate(productId, updateBody, {new: true}, (err, result) => {
        if(err) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
        return result;
    });
};

/**
 * Delete product by id
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const deleteProductById = async (productId) => {
    Product.deleteOne({_id : productId}, (err, result) => {
        if(err || result.n === 0) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
        return result;
    });
};

module.exports = {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProductById,
};