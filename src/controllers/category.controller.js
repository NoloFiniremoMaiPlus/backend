const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');


const addCategory = catchAsync(async (req, res) => {
    const category = await categoryService.addCategory(req.body);
    res.status(httpStatus.CREATED).send(category);
});

const getCategories = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['_id', 'text']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const category = await categoryService.getCategories(filter, options);
    res.send(category);
});

module.exports = {
    addCategory,
    getCategories,
}