const mongoose = require('mongoose');

const annotationSchema = mongoose.Schema(
  {
    quick: {
      type: [String],
    },
    text: {
      type: String,
    },
  },
  { _id: false }
);

module.exports = {
  annotationSchema,
};
