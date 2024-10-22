const express = require("express");
const {
  getProduct,
  addProduct,
  upload,
} = require("../controllers/productController");
const router = express.Router();

router.get("/", getProduct);
router.post("/addProduct", upload.single("image"), addProduct);

module.exports = router;
