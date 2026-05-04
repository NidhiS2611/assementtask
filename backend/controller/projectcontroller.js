const projectModel = require("../model/projectmodel");
const task = require("../model/taskmodel");

const createProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Project name is required" });
        }
        const newProject = new projectModel({ name, description, createdBy: req.user.id });
        await newProject.save();
        res.status(201).json({ message: "Project created successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};



const getMyProjects = async (req, res) => {
  try {
    const projects = await projectModel.find({ createdBy: req.user.id });

    let result = [];

    for (let i = 0; i < projects.length; i++) {
      const count = await task.countDocuments({
        projectId: projects[i]._id
      });

      result.push({
        ...projects[i]._doc,
        taskCount: count
      });
    }

    res.json(result);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// controller/projectcontroller.js



const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    // 🔥 1. project delete
    await projectModel.findByIdAndDelete(projectId);

    // 🔥 2. us project ke saare tasks delete
    await task.deleteMany({ projectId: projectId });

    res.json({ message: "Project and its tasks deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

   
module.exports = { createProject, getMyProjects, deleteProject };