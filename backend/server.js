const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

// Environment variables with defaults
const {
  DB_HOST = "localhost",
  DB_USER = "user",
  DB_PASSWORD = "pass",
  DB_NAME = "mydb",
  DB_PORT = 5432
} = process.env;

// Connect to PostgreSQL
const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT
});

app.get("/", (req, res) => {
  res.send("Backend is running with PostgreSQL 🚀");
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error querying database");
  }
});

// Add a user
app.post("/users", async (req, res) => {
  const { name } = req.body;
  try {
    await pool.query("INSERT INTO users (name) VALUES ($1)", [name]);
    res.send("User added ✅");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error inserting into database");
  }
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
