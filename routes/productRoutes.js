const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// ✅ Middleware to check session
const checkSession = (req, res, next) => {
  if (!req.session.user) return res.status(401).json({ message: "Login required" });
  next();
};

router.use(checkSession); // all routes below require login

router.post("/", addProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
