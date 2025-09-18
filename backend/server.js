const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

// connect to PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "user",
  password: process.env.DB_PASSWORD || "pass",
  database: process.env.DB_NAME || "mydb",
  port: 5432,
});

app.get("/", (req, res) => {
  res.send("Backend is running with PostgreSQL 🚀");
});

// Example API: get all users
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error querying database");
  }
});

// Example API: add a user
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
