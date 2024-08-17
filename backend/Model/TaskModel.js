const mongoose = require('mongoose');
const UserModel = require('./UserModel');

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, 
      },
    status : { 
        type: String
    }
  },
  { timestamps: true }
);

taskSchema.statics.addTask = async function (title, description, startDate, dueDate, id, status) {
    const task = await this.create({ title, description, startDate, dueDate, user: id, status });
    return task;
  };
  
  taskSchema.statics.findTasksByUser = async function (userId) {
    try {
      const tasks = await this.find({ user: userId }).populate('user', 'firstname lastname');
      return tasks;
    } catch (error) {
      throw new Error(`Error fetching tasks for user: ${error.message}`);
    }
  };
  

module.exports = mongoose.model('Task', taskSchema);
