const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Routes
router.post("/add", addProduct);        // add product
router.post("/list", getProducts);      // get all products for user
router.post("/get/:id", getProductById); // get product by id
router.post("/update/:id", updateProduct);  // update product (send user_id + product_id)
router.post("/delete/:id", deleteProduct); // delete product

module.exports = router;
