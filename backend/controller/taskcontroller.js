const task = require("../model/taskmodel");
const project = require("../model/projectmodel");

const createTask = async (req, res) => {
    try {
        const { title, description, projectId, dueDate , assignedTo  } = req.body;
        if (!title || !projectId || !dueDate) {
            return res.status(400).json({ error: "Title, Project ID and Due Date are required" });
        }
        const projectExists = await project.findById(projectId);
        if (!projectExists) {
            return res.status(404).json({ error: "Project not found" });
        }
        const newTask = new task({ title, description, projectId, dueDate, assignedTo });
        await newTask.save();
        res.status(201).json({ message: "Task created successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};



const getTasks = async (req, res) => {
  try {
    let tasks;
    const userid = req.user.id;

    console.log("USER:", req.user); // 🔍 debug

    if (req.user.role && req.user.role.toLowerCase() === "admin") {
      // 👑 Admin → sab tasks
      tasks = await task.find()
        .populate("assignedTo", "name email")
        .populate("projectId", "name")
        .sort({ createdAt: -1 });

    } else {
      // 👤 User → sirf apne tasks
      tasks = await task.find({ assignedTo: userid })
        .populate("projectId", "name")
        .sort({ dueDate: -1 });
    }

    res.status(200).json(tasks);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching tasks",
      error: err.message
    });
  }
};



const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const Task = await task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(Task);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
module.exports = { createTask, getTasks, updateTaskStatus };