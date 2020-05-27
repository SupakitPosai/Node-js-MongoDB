const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name_product: String,
  price_product: Number,
  description_product: String,
});

module.exports = mongoose.model("Product", productSchema);
