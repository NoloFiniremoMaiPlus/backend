const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { itemService } = require('../services');
const ApiError = require('../utils/ApiError');
const categories = require('../config/categories');
const brands = require('../config/brands');


const getItems = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name','state']);
    if(req.query.hasOwnProperty('keywords'))
        filter.$text = { $search: req.query.keywords };

    if(req.query.priceTo || req.query.priceTo){
        filter.basePrice = {};
        if(req.query.priceTo)
            filter.basePrice.$lt = req.query.priceTo;
        if(req.query.priceFrom)
            filter.basePrice.$gt = req.query.priceFrom;
    }

    // TODO cerco più 'state' possibili

    // User can't see hidden items
    if(req.role === 'user')
    filter.enabled = true;

    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const items = await itemService.getItems(filter, options);
    res.send(items);
});

const addItem = catchAsync(async (req, res) => {
    const item = await itemService.addItem(req.body);
    res.status(httpStatus.CREATED).send(item);
});

const getItem = catchAsync(async (req, res) => {
     const item = await itemService.getItemById(req.params.itemId);
    if (!item) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
    }
    res.send(item);
});

const updateItem = catchAsync(async (req, res) => {
    const item = await itemService.updateItem(req.params.itemId, req.body);
    res.status(httpStatus.OK).send(item);
});

const deleteItem = catchAsync(async (req, res) => {
    await itemService.deleteItemById(req.params.itemId);
    res.sendStatus(httpStatus.NO_CONTENT);
});

const getCategories = (req,res) => {
    res.status(httpStatus.OK).send(categories)
}

const getBrands = (req,res) => {
    res.status(httpStatus.OK).send(brands)
}

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
    addItem,
    getItem,
    updateItem,
    deleteItem,
    getCategories,
    getBrands,
    enableItem,
    disableItem,
}