const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description:{
        type: String,
        required:true
    },
    dueDate:{
        type: String,
    },
    priority:{
      type:String,
      enum: ['Low', 'Moderate', 'Extreme'],
      required:true
    },
    // priority: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Priority',
    // },
    taskimage:{
        type:String,
        required:true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed'],
      default: 'Pending',
    },
    collaborators: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        permission: {
          type: String,
          enum: ['Edit', 'View'],
          default: 'View',
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: Date,
  });
  
  const Task= mongoose.model('task',taskSchema);

  module.exports = Task;