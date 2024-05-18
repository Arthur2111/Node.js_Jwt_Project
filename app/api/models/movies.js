const mongoose = require("mongoose");

//Define Schema

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  released_on: {
    type: Date,
    trim: true,
    required: true,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
