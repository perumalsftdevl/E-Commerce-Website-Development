const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    originalPrice: { type: Number, required: true },
    discountPrice: { type: Number },
    sellingPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    uom: { type: String, required: true },
    hsnCode: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);
productSchema.index({ hsnCode: 1 });
productSchema.index({ name: 1 });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
