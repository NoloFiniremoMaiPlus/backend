const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { Item } = require('../models');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');


const getItems = async (filter, options) => {
    const items = await Item.paginate(filter, options);
    return items;
}

const addItem = async (itemBody) => {
    return Item.create(itemBody);
};

const getItemById = async (itemId) => {
    return Item.findById(itemId);
};

const updateItem = async (itemId, updateBody) => {
    
    if(!(await getItemById(itemId)))
        throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');

    Item.findByIdAndUpdate(itemId, updateBody, {new: true}, (err, result) => {
        // TODO Change error type to InternalError or smth
        if(err) throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
        return result;
    });
};

/**
 * Delete item by id
 * @param {ObjectId} itemId
 * @returns {Promise<Item>}
 */
const deleteItemById = async (itemId) => {
    Item.deleteOne({_id : itemId}, (err, result) => {
        if(err || result.n === 0) throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
        return result;
    });
};

module.exports = {
    getItems,
    addItem,
    getItemById,
    updateItem,
    deleteItemById,
};