const express = require('express')
const {signupUser, loginUser} = require('../Controller/UserController')

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);

module.exports = router