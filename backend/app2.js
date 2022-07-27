const express = require('express')
const app = express()
const sequelize = require('sequelize')
require('dotenv').config()
const { DataTypes } = require('sequelize')

const dbHost = process.env.DB_HOST
const dbName = process.env.DB_NAME 
const dbUser = process.env.DB_USER 
const dbPwd = process.env.DB_PWD


const db = new sequelize(dbName,dbUser,dbPwd, {
    host: dbHost,
    dialect: 'mysql'
})


const User = db.define('User', {
    userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    username: {
        type:DataTypes.STRING
    },
    hashpassword: {
        type:DataTypes.STRING
    },
    salt: {
        type:DataTypes.STRING
    }
})


const Workout = db.define('Workout', {
    workoutId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        
    },
    title: {
        type:DataTypes.STRING

    },
    load: {
        type:DataTypes.STRING
    },
    reps: {
        type:DataTypes.INTEGER
    }
})


User.hasMany(Workout)
User.sync()
Workout.belongsTo(User)
Workout.sync()

app.use(express.json())

const userId = '6f5bd0fb-1c99-4f9e-a6f2-7b09bd0d710c'
const username = 'rogmer'

app.post('/workout', async (req, res, next) => {
    console.log(req.body)
    const title = req.body.title 
    const load = req.body.load 
    const reps = req.body.reps
    const user = await User.findOne({where: {username: username}})
     const workout = await user.createWorkout({title,load,reps})
    const getWorks = await user.getWorkouts()
    console.log(getWorks)
})
const connectDB = async() => {
    try{
       await db.authenticate()
       console.log('Successfully Connect to db')
       app.listen(3001, () => {
        console.log('Working')
       })
    }catch(error){
       console.log(error)
    }
   
}

connectDB()