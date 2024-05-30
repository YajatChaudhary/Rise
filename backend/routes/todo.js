const express = require("express");
const jwt = require("jsonwebtoken");
const Todo = require("../models/todo");
const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    console.log("No token provided");
    return res.status(401).send("Access denied");
  }

  try {
    const decoded = jwt.verify(token, "secretkey");
    console.log("Token decoded:", decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    return res.status(400).send("Invalid token");
  }
};

// Create a todo
router.post("/todos", async (req, res) => {
  const { title, description, userId } = req.body;
  const user = userId;
  console.log("Create todo request:", {
    title,
    description,
    user: user,
  });
  if (!title || !description) {
    return res.status(400).send("Title and description are required");
  }

  try {
    const todo = new Todo({
      title,
      description,
      user: user,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).send("Error creating todo");
  }
});

// Get all todos for a user
router.get("/todos/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const todos = await Todo.find({ user: userId });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).send("Error fetching todos");
  }
});

// Update a todo
router.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).send("Error updating todo");
  }
});

// Delete a todo
router.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.status(200).send("Todo deleted");
  } catch (error) {
    res.status(500).send("Error deleting todo");
  }
});

module.exports = router;
