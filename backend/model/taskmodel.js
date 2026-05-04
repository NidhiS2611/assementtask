const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  status: {
    type: String,
    enum: ["pending", "completed","overdue"],
    default: "pending"
  }
  , 
    dueDate: {  
    type: Date,
    required: true
  }
});


module.exports = mongoose.model("Task", taskSchema);