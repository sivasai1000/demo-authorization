const pool = require("../config/db");

// ✅ Add product
exports.addProduct = async (req, res) => {
  try {
    const { user_id, name, price, description } = req.body;

    if (!user_id) return res.status(400).json({ message: "user_id is required" });
    if (!name || !price) return res.status(400).json({ message: "Name and price are required" });

    const [result] = await pool.query(
      "INSERT INTO products (user_id, name, price, description) VALUES (?, ?, ?, ?)",
      [user_id, name, price, description]
    );

    console.log("Product added:", result);

    res.status(201).json({ message: "Product added", product_id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all products for a user
exports.getProducts = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) return res.status(400).json({ message: "user_id is required" });

    const [rows] = await pool.query("SELECT * FROM products WHERE user_id = ?", [user_id]);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { user_id } = req.body;
    const { id } = req.params; // product ID from URL

    if (!user_id) return res.status(400).json({ message: "user_id is required" });

    const [rows] = await pool.query(
      "SELECT * FROM products WHERE product_id = ? AND user_id = ?",
      [id, user_id]
    );

    if (rows.length === 0) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Update product
exports.updateProduct = async (req, res) => {
  try {
    const { user_id, product_id, name, price, description } = req.body;

    if (!user_id) return res.status(400).json({ message: "user_id is required" });
    if (!product_id) return res.status(400).json({ message: "product_id is required" });

    const [existing] = await pool.query(
      "SELECT * FROM products WHERE product_id = ? AND user_id = ?",
      [product_id, user_id]
    );

    if (existing.length === 0) return res.status(404).json({ message: "Product not found" });

    await pool.query(
      "UPDATE products SET name = ?, price = ?, description = ? WHERE product_id = ? AND user_id = ?",
      [name, price, description, product_id, user_id]
    );

    res.status(200).json({ message: "Product updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { user_id } = req.body;
    const { id } = req.params; // product ID from URL

    if (!user_id) return res.status(400).json({ message: "user_id is required" });

    const [existing] = await pool.query(
      "SELECT * FROM products WHERE product_id = ? AND user_id = ?",
      [id, user_id]
    );

    if (existing.length === 0) return res.status(404).json({ message: "Product not found" });

    await pool.query(
      "DELETE FROM products WHERE product_id = ? AND user_id = ?",
      [id, user_id]
    );

    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

