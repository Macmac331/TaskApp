const dotenv = require('dotenv');
const express = require('express');
const UserModel = require('../Model/UserModel');
const jwt = require('jsonwebtoken');



const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1h'})
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const user = await UserModel.login(username, password);
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            token: generateToken(user._id),
        });
    } catch (error) {
        console.log(process.env.REACT_APP_JWT_SECRET);
        res.status(400).json({ error: error.message });
    }
};

const signupUser = async (req, res) => {
    const { firstname, lastname, username, password } = req.body;

    try {
        const user = await UserModel.signup(firstname, lastname, username, password);

        res.status(201).json({
            message: 'Signup successful',
            user: {
                id: user._id,
                username: user.username
            },
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    loginUser,
    signupUser
};
