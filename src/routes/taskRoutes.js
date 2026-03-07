import express from "express";
import { createTask, getTasks, deleteTask } from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes below require authentication
router.post("/", authMiddleware, createTask);   // Create a new task
router.get("/", authMiddleware, getTasks);     // Get all tasks for the logged-in user
router.delete("/:id", authMiddleware, deleteTask); // Delete a task by ID (only owner)

// Optional: you could also add update route
// router.put("/:id", authMiddleware, updateTask);

export default router;