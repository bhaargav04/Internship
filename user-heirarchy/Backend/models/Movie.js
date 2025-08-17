const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  url: String
});

module.exports = mongoose.model("Movie", movieSchema);
