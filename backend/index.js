const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017/todosdb";
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected ✅"))
.catch((err) => console.error("MongoDB connection error:", err));

// Todo Schema
const todoSchema = new mongoose.Schema({
  name: String,
});

const Todo = mongoose.model("Todo", todoSchema);

// API endpoints
app.get("/api/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/api/todos", async (req, res) => {
  const { name } = req.body;
  const todo = new Todo({ name });
  await todo.save();
  res.json(todo);
});

app.listen(5000, () => console.log("Backend running on port 5000 🚀"));
