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

    var options = { 
        returnDocument: 'after',
        runValidators: true,
    }
    const item = await Item.findByIdAndUpdate(itemId, updateBody, options).exec();

    if (!item) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
    }

    return item;
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

const addUnavailable = async (itemId, from, to) => {
    updateItem(itemId, {
        "$push" : 
            { unavailable : {
                from: from,
                to: to
                }
            },
    });
};

const deleteUnavailable = async (itemId, from, to) => {
    updateItem(itemId, {
        "$pull" : 
            { unavailable : {
                from: from,
                to: to
                }
            },
    });
};


module.exports = {
    getItems,
    addItem,
    getItemById,
    updateItem,
    deleteItemById,
    addUnavailable,
    deleteUnavailable,
};