const mysql = require("mysql2");
require("dotenv").config();

// Konfigurasi database connection
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "sipepu",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Promise wrapper untuk async/await
const promisePool = pool.promise();

// Test koneksi database
const testConnection = async () => {
  try {
    const connection = await promisePool.getConnection();
    console.log("✅ Database connected successfully");
    connection.release();
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    return false;
  }
};

module.exports = {
  pool: promisePool,
  testConnection,
};
