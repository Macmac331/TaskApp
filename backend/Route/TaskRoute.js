const express = require('express')
const {addTask, getTasks} = require('../Controller/TaskController')
const verifyToken = require('../Middleware/Wrapper')

const router = express.Router();

router.post('/add',verifyToken, addTask);
router.get('/user/:id', verifyToken, getTasks);
module.exports = router