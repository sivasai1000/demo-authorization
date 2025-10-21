const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
pool.getConnection().then((conn)=>{
  console.log("database is connected")
  conn.release();
})
.catch(err => {
        console.error("MySQL connection failed:", err.message);
        process.exit(1);
    });


module.exports = pool;
