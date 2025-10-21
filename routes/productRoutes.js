const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// ✅ Add product
router.post("/add", addProduct);

// ✅ Get all products for a user
router.post("/list", getProducts);

// ✅ Get product by ID using :id
router.post("/get/:id", getProductById);

// ✅ Update product
router.post("/update", updateProduct);

// ✅ Delete product using :id
router.post("/delete/:id", deleteProduct);

module.exports = router;
