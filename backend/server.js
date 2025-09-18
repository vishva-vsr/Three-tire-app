const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "user",
  password: process.env.DB_PASSWORD || "pass",
  database: process.env.DB_NAME || "mydb",
  port: process.env.DB_PORT || 5432,
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Example API
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error querying database");
  }
});

app.post("/api/users", async (req, res) => {
  const { name } = req.body;
  try {
    await pool.query("INSERT INTO users (name) VALUES ($1)", [name]);
    res.json({ name });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error inserting into database");
  }
});

app.listen(5000, () => console.log("Backend running on port 5000"));
