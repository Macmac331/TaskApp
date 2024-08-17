require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const userRoutes = require('./Route/UserRoute')
const taskRoutes = require('./Route/TaskRoute');

app.use(express.json())
app.use(cors())

app.use('/api/user', userRoutes); 
app.use('/api/task', taskRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
