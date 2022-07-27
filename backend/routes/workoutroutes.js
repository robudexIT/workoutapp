const express = require('express')
const router = express.Router()
const workoutControllers = require('../controllers/workoutControllers')
const authMiddleware = require('../middleware/authMiddleware')


// define route endpoint


router.get('/getworkouts', authMiddleware,workoutControllers.getWorkouts)


router.post('/workout', authMiddleware,workoutControllers.postWorkout)

router.delete('/workout/:workoutId',authMiddleware,workoutControllers.deleteWorkout)

module.exports = router