const express = require('express')
const router = express.Router()
const authControllers = require('../controllers/authControllers')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/signup', authControllers.signupUser)

router.post('/signin', authControllers.signinUser)

router.get('/signout',authMiddleware,authControllers.signoutUser)


module.exports = router