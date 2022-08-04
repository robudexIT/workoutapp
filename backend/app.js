const express = require('express')
require('dotenv').config()
const app = express()
const db = require('./config/database')
const workoutRoutes = require('./routes/workoutroutes')
const authRoutes = require('./routes/authRoutes')
const jwt = require('jsonwebtoken')
const tokenSecret = process.env.TOKEN_SECRET
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(setCustomHeaders)
app.use('/tokens', require('./middleware/tokens'))
app.use(authRoutes)
app.use(workoutRoutes)
app.use(errorHandler)

const connectDB = async() => {
     try{
        await db.authenticate()
        console.log('Successfully Connect to db')
        app.listen(PORT, () => {
            console.log('App is running on port ', PORT)
        })
     }catch(error){
        console.log(error)
        const err = new Error('Error in Connecting on database')
        err.statusCode = 500
        next(err)
     }
    
}


function setCustomHeaders(req, res, next) {
     // Website you wish to allow to connect
     const allowedOrigins = ['http://localhost:3000','http://localhost:5173']
     const origin = req.headers.origin
     if(allowedOrigins.indexOf(origin) !== 1){
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin')
     }
     

     // Request methods you wish to allow
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 
     // Request headers you wish to allow
   //   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
     res.setHeader('Access-Control-Allow-Headers', '*');
 
     // Set to true if you need the website to include cookies in the requests sent
     // to the API (e.g. in case you use sessions)
     res.setHeader('Access-Control-Allow-Credentials', true);
 
     // Pass to next layer of middleware
     next();
}
function errorHandler(error,req, res, next){
   res.json({message: err.message, statusCode: err.statusCode})
}
connectDB()