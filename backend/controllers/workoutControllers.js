
const tokenList = require('../config/tokenlist')
const User = require('../models/User')
const Workout = require('../models/Workout')
const { Op } = require('sequelize')

module.exports.getWorkouts = async(req, res, next) => {
    const username = req.username
    try {
        const workouts  = await req.user.getWorkouts()
        if(workouts.length == 0){
            res.status(200).json({message:'No Available Workouts', count:0, username})
            return
        }
        res.status(200).json({message: 'Fetching Workout is successful', count:workouts.length, workouts:workouts,username})
    }catch(error){
        console.log(error)
        res.status(400).json({message:'Fetching Workouts is not succesful', error:error, fetching:false,username})
    }
}

module.exports.postWorkout  = async (req, res, next) => {
   
    const title = req.body.title 
    const load = req.body.load 
    const reps = req.body.reps
    const username = req.username
    const userId = req.userId
   try {
    //    const user = await User.findOne({where:{username: username}})
       const workout = await req.user.createWorkout({title,load,reps})
       if(workout){
         console.log('Adding Workout is successful with workId', workout.workoutId)
         res.status(200).json({message:'Adding Workout is successful', addWorkout: true, workoutId: workout.workoutId,username})
       }
   }catch(error){
      console.log(error)
      res.status(400).json({message:'Adding Workout is not successfull',addWorkout:false,username})
   }
}

module.exports.deleteWorkout = async(req, res, next) => {
    const workoutId = req.params.workoutId
    const username = req.username
    try {
         // this option set the userId to Null on the workouts table
        //  await req.user.removeWorkout(workoutId)
        
        //this option delete the record on workout table truly
        const deleteWorkout = await Workout.destroy({where:{id:workoutId}})      
        if(deleteWorkout == 0){
            res.status(400).json({message: 'Delete Workout failed', deleteWorkout:false,username})
            return
        }
        res.status(200).json({message: 'Deleting workout is successful', deleteWorkout:true,username})
    }catch(error){
        console.log(error)
        res.status(400).json({message: 'Delete Workout failed', deleteWorkout:false,token,username})
    }

}
