const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// ✅ Enable CORS
app.use(cors({
  origin: "http://localhost:3000", // frontend URL
  credentials: true
}));

// ✅ Parse JSON body
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// ✅ Test route
app.get("/", (req, res) => res.send("Backend running..."));

// ✅ Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
