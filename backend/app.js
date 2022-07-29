const express = require('express')
require('dotenv').config()
const app = express()
const db = require('./config/database')
const workoutRoutes = require('./routes/workoutroutes')
const authRoutes = require('./routes/authRoutes')
const jwt = require('jsonwebtoken')
const tokenSecret = process.env.TOKEN_SECRET
// const User =  require('./models/User')
// const Workout = require('./models/Workout')

const PORT = process.env.PORT
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(setCustomHeaders)
app.use(authRoutes)
app.use(workoutRoutes)

const connectDB = async() => {
     try{
        await db.authenticate()
        console.log('Successfully Connect to db')
        app.listen(PORT, () => {
            console.log('App is running on port ', PORT)
        })
     }catch(error){
        console.log(error)
     }
    
}


function setCustomHeaders(req, res, next) {
     // Website you wish to allow to connect
     res.setHeader('Access-Control-Allow-Origin', '*');

     // Request methods you wish to allow
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 
     // Request headers you wish to allow
     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
 
     // Set to true if you need the website to include cookies in the requests sent
     // to the API (e.g. in case you use sessions)
     res.setHeader('Access-Control-Allow-Credentials', true);
 
     // Pass to next layer of middleware
     next();
}
connectDB()