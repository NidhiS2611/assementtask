const express = require("express");
const router = express.Router();
const { createProject, getMyProjects ,deleteProject } = require("../controller/projectcontroller");  
const authMiddleware = require('../middleware/authmiddle');
const authRole = require("../middleware/authrole");

router.post("/create", authMiddleware, authRole(['admin']), createProject);
router.get("/list", authMiddleware, authRole(['admin']), getMyProjects);
router.delete("/delete/:id", authMiddleware, authRole(['admin']), deleteProject);

module.exports = router;