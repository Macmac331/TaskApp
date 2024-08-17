const express = require('express');
const TaskModel = require('../Model/TaskModel');


const addTask = async(req, res) => {
    const {title, description, startDate, dueDate, userId, status } = req.body
    console.log('User:', userId);
    try{

        await TaskModel.addTask(title, description, startDate, dueDate, userId, status )
        res.status(201).json({
            message: 'Added Task successful',
        });
    }catch(error){
        res.status(400).json({ error: error.message });
    }
}

const getTasks = async (req, res) => {
    try {
        const userId = req.params.id; 
        
        const task = await TaskModel.findTasksByUser(userId);
        res.status(200).json(task);
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({ error: error.message });
    }
}
module.exports = {
    addTask,
    getTasks
}