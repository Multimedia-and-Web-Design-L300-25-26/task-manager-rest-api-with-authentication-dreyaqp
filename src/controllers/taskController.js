import Task from "../models/Task.js";

// Create a task
export const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user.id // user id comes from auth middleware
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all tasks for a user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a task by ID
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Check if the task belongs to the user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized, not owner" });
    }
    
    // OPTION 1: Use deleteOne() on the document (recommended)
    await task.deleteOne();
    
    // OPTION 2: Use findByIdAndDelete()
    // await Task.findByIdAndDelete(req.params.id);
    
    // OPTION 3: Use deleteMany() with condition
    // await Task.deleteOne({ _id: req.params.id, user: req.user.id });
    
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};