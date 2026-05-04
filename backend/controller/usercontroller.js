const user = require("../model/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generatetoken");
const task = require("../model/taskmodel");
const Project = require("../model/projectmodel");

const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Name, email and password are required" });
        }
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new user({ name, email, password: hashedPassword, role });
        const token = generateToken(newUser._id);
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
   
    } catch (err) {
        console.error(err);

        res.status(500).json({ error: err.message });
    }   
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        const existingUser = await user.findOne({ email});
        if (!existingUser) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
      
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        const token = generateToken(existingUser._id);
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
        res.json({ message: "Login successful", user:existingUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }   
};



const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // 🔹 saare user ke tasks
    const tasks = await task.find({ assignedTo: userId })
      .populate("projectId", "name");

    // 🔹 stats
    const total = tasks.length;
    const pending = tasks.filter(t => t.status === "pending").length;
    const completed = tasks.filter(t => t.status === "completed").length;
    const overdue = tasks.filter(t => t.status === "overdue").length;

    res.json({
      stats: { total, pending, completed, overdue },
      tasks
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
};


const getAdminDashboard = async (req, res) => {
  try {
    // 🔥 counts
    const totalProjects = await Project.countDocuments();
    const totalTasks = await task.countDocuments();
    const totalUsers = await user.countDocuments();

    const pending = await task.countDocuments({ status: "pending" });
    const completed = await task.countDocuments({ status: "completed" });
    const overdue = await task.countDocuments({ status: "overdue" });

    // 🔥 recent tasks (last 5)
    const recentTasks = await task.find()
      .populate("projectId", "name")
      .populate("assignedTo", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    // 🔥 recent projects (last 5)
    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      stats: {
        totalProjects,
        totalTasks,
        totalUsers,
        pending,
        completed,
        overdue
      },
      recentTasks,
      recentProjects
    });

  } catch (err) {
    res.status(500).json({
      message: "Dashboard fetch error",
      error: err.message
    });
  }
};

const allusers = async (req, res) => {
  try {
    const users = await user.find({ role: "member" });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { name, password } = req.body;

    let updateData = {};

    // 🔹 Name update
    if (name && name.trim() !== "") {
      updateData.name = name;
    }


    if (password && password.length >= 6) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    await user.findByIdAndUpdate(userId, updateData);

    res.json({ message: "Profile updated successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
module.exports = { createUser, login, logout ,getUserDashboard ,getAdminDashboard,allusers, updateProfile};