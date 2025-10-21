const pool = require("../config/db");
const bcrypt = require("bcrypt");

// ✅ Register user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required." });

    const [existing] = await pool.query("SELECT * FROM user WHERE email = ?", [email]);//row,colum
    if (existing.length > 0)
      return res.status(400).json({ message: "Email already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO user (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    req.session.user = {  name, email };

    res.status(201).json({ message: "User registered ", user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required." });

    const [rows] = await pool.query("SELECT * FROM user WHERE email = ?", [email]);
    if (rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // save user in session
    req.session.user = { id: user.id, name: user.name, email: user.email };

    res.status(200).json({ message: "Login successful", user: req.session.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Logout user
exports.logoutUser = (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: "Logout successful" });
};
