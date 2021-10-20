const catchAsync = require('../utils/catchAsync');


const getItems = catchAsync(async (req, res) => {
    res.send("Vuoto");
});

module.exports = {
    getItems
}