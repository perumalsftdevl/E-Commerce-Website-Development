const express = require("express");
const Product = require("../models/productModel"); // Import the Product model
const path = require("path");
const multer = require("multer");

const getProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products); // Add proper status code (200)
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message }); // Return error message in response
  }
};

// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (product) {
//       return res.status(200).json(product); // Add proper status code (200)
//     } else {
//       return res.status(404).json({ message: "Product not found" });
//     }
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Server Error", error: error.message }); // Include error details
//   }
// });

// router.get("/filter/:keyword", async (req, res) => {
//   const keyword = req.params.keyword
//     ? {
//         name: {
//           $regex: req.params.keyword, // Regular expression to search for keyword
//           $options: "i", // Case insensitive
//         },
//       }
//     : {};

//   try {
//     const products = await Product.find({ ...keyword });
//     return res.status(200).json(products); // Add proper status code (200)
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Server Error", error: error.message }); // Return error details
//   }
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the destination folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const uploadsDir = path.join(__dirname, "uploads");
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Preserve the original file extension
  },
});

const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${path.basename(
    req.file.path
  )}`;

  // Use `req.body` for form fields and `req.file` for file uploads
  const new_product = {
    name: req.body.name,
    description: req.body.description,
    image: fileUrl, // Get the file path if an image was uploaded
    originalPrice: req.body.originalPrice,
    discountPrice: req.body.discountPrice,
    sellingPrice: req.body.sellingPrice,
    quantity: req.body.quantity,
    uom: req.body.uom,
    hsnCode: req.body.hsnCode,
  };

  console.log("new_product", new_product);

  try {
    // Check if a product with the same hsnCode already exists
    const existingProduct = await Product.findOne({
      hsnCode: new_product.hsnCode,
    });
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "Duplicate HSN Code. Product not created." });
    }

    // Create a new product
    const product = await Product.create(new_product);

    // Construct the file URL

    // Return the created product with the file URL
    return res.status(201).json({ product }); // Use 201 for successful creation
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message }); // Return error details
  }
};
module.exports = { getProduct, addProduct, upload };
