const express = require("express");
const router = express.Router();
const { createTask, getTasks, updateTaskStatus } = require("../controller/taskcontroller");
const authMiddleware = require('../middleware/authmiddle');
const authRole = require("../middleware/authrole");

router.post("/create", authMiddleware, authRole(['admin']), createTask);
router.get("/list", authMiddleware, authRole(['admin', 'member']), getTasks);
router.put("/update/:id", authMiddleware, authRole(['member']), updateTaskStatus);

module.exports = router;