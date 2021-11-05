const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { Item } = require('../models');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');

const addItem = async (itemBody) => {
    return Item.create(itemBody);
};

const getItems = async (filter, options) => {
    const items = await Item.paginate(filter, options);
    return items;
}

const getItemById = async (itemId) => {
    return Item.findById(itemId);
};

const updateItem = async (itemId, updateBody) => {
    
    if(!(await getItemById(itemId)))
        throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
    
    if(updateBody.name && (await Item.isNameTaken(updateBody.name, itemId)))
        throw new ApiError(httpStatus.CONFLICT, 'Name already exists');

    Item.findByIdAndUpdate(itemId, updateBody, {new: true}, (err, result) => {
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
    addItem,
    getItems,
    getItemById,
    updateItem,
    deleteItemById,
};