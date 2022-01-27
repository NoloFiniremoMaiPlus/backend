const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { itemService, rentalService } = require('../services');
const ApiError = require('../utils/ApiError');
const categories = require('../config/categories');
const brands = require('../config/brands');


const getItems = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name', 'resp', 'state', 'brand', 'category']);
    if(req.query.hasOwnProperty('keywords'))
        filter.$text = { $search: req.query.keywords };

    if(req.query.priceFrom || req.query.priceTo){
        filter.totalPrice = {};
        if(req.query.priceTo)
            filter.totalPrice.$lte = req.query.priceTo;
        if(req.query.priceFrom)
            filter.totalPrice.$gte = req.query.priceFrom;
    }

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

const rentItem = catchAsync(async (req, res) => {
    const {estimate, ...rentalBody} = req.body

    rentalBody.user = req.user.id;
    rentalBody.item = req.params.itemId;

    const rent = await rentalService.createRental(rentalBody, estimate);

    console.log(rent);
    res.status(httpStatus.OK).send("Rent : " + rent);
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
    rentItem,
    getCategories,
    getBrands,
    enableItem,
    disableItem,
}