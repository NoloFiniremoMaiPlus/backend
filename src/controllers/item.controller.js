const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { itemService } = require('../services');
const ApiError = require('../utils/ApiError');


const getItems = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['_id']);
    if(req.query.hasOwnProperty('text'))
        filter.$text = { $search: req.query.keywords };

    // User can't see hidden items
    if(req.role === 'user')
        filter.enabled = true;

    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const items = await itemService.getItems(filter, options);
    res.send(items);
});

const getItem = catchAsync(async (req, res) => {
     const item = await itemService.getItemById(req.params.itemId);
    if (!item) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
    }
    res.send(item);
});

const addItem = catchAsync(async (req, res) => {
    const item = await itemService.addItem(req.body);
    res.status(httpStatus.CREATED).send(item);
});

const updateItem = catchAsync(async (req, res) => {
    const item = await itemService.updateItem(req.params.itemId, req.body);
    res.status(httpStatus.OK).send(item);
});

const deleteItem = catchAsync(async (req, res) => {
    await itemService.deleteItemById(req.params.itemId);
    res.sendStatus(httpStatus.NO_CONTENT);
});

const enableItem = catchAsync(async (req, res) => {
    const item = await itemService.updateItem(req.params.itemId, {"enabled" : "true"});
    res.status(httpStatus.OK).send(item);
});

const disableItem = catchAsync(async (req, res) => {
    const item = await itemService.updateItem(req.params.itemId, {"enabled" : "false"});
    res.status(httpStatus.OK).send(item);
});

module.exports = {
    getItems,
    getItem,
    addItem,
    updateItem,
    deleteItem,
    enableItem,
    disableItem,
}