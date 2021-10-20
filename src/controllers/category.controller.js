const catchAsync = require('../utils/catchAsync');

const getCategories = catchAsync(async (req, res) => {
    res.send("Gay");
});

module.exports = {
    getCategories,
}