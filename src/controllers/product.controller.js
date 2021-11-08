const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');
const ApiError = require('../utils/ApiError');


const addProduct = catchAsync(async (req, res) => {
    const product = await productService.addProduct(req.body);
    res.status(httpStatus.CREATED).send(product);
});

const getProducts = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['_id']);
    if(req.query.hasOwnProperty('text'))
        filter.$text = { $search: req.query.keywords };
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const products = await productService.getProducts(filter, options);
    res.send(products);
});

const getProduct = catchAsync(async (req, res) => {
    const product = await productService.getProductById(req.params.productId);
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    res.send(product);
});

const updateProduct = catchAsync(async (req, res) => {
    const product = await productService.updateProduct(req.params.productId, req.body);
    res.send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
    await productService.deleteProductById(req.params.productId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    addProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
}