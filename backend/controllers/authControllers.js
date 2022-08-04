const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
const userRefreshTokenList = require('../config/tokenlist').refreshToken
const userAccessTokenList = require('../config/tokenlist').accessToken

module.exports.signupUser = async(req, res, next) => {
   
    const username = req.body.username 
    const password = req.body.password
    try{
        const userExist = await checkIfUserExist(username)
        if(userExist) {
            res.status(200).json({message:'User Already exist',signup:false})
            return
        }
        const result = await generateHashAndSalt(password, 10)
        const user = await User.create(
                {username:username,hashpassword:result.hash,salt:result.salt})
                if(!user){
                    res.status(400).json({message:'Signup User is failed',signup:false,error:error})
                    return
                } 
                res.status(200).json({message:'Signup User is sucsess',signup:true})          
    }catch(error){
        console.log(error)
        res.status(400).json({message:'Signup User is failed',signup:false,error:error})
    }
    
    
}
module.exports.signinUser = async(req, res, next) => {
    const refreshToken = req.cookies.refreshToken
    const username = req.body.username
    const password = req.body.password
    console.log('signing process')
    console.log(refreshToken)
     
    if(!refreshToken){
        console.log('No refreshToken in req.cookies start login process')
        proccessLogin(username,password)
        return
    }
    const verifyRefreshToken = jwt.verify(refreshToken, refreshTokenSecret)  
    if(!verifyRefreshToken){
        console.log('refreshToken is invalid or already expired delete the cookie and start login process.')
        res.clearCookie(refreshToken)
        proccessLogin(username,password)
        return
    }
        
     const tokenUser  = verifyRefreshToken.username
     if(username === tokenUser && userRefreshTokenList.hasOwnProperty(username) && userRefreshTokenList[username].findIndex(rf => rf == refreshToken) != -1) {
        console.log('Refresh token is still valid.Checking if signin user and the tokenuser is equal')
        res.status(200).json({message:'User is already signed'})
        console.log(userRefreshTokenList)
        return
        
    }
    console.log(`tokenUser  and the username is not equal. if tokenUser is in the 
                is in the userRefreshTokenList, delete its refreshToken
               `)
    if(userRefreshTokenList.hasOwnProperty(tokenUser)) {
        userRefreshTokenList[tokenUser] = userRefreshTokenList[tokenUser].filter(rf => rf != refreshToken)
    }
    console.log('Finally clear cookie and process the login...')
    res.clearCookie(refreshToken)
    proccessLogin(username,password)
    

   async function proccessLogin(username,password){
        
        try {
            const user = await checkIfUserExist(username)
            if(!user){
                res.status(400).json({message:'User is not exist yet.Please signup first', signin:false})
                return
            }
            console.log(user)
            const hash = user.hashpassword
            const correctPassword = await bcrypt.compare(password, hash)
            if(!correctPassword){
                res.status(400).json({message:'Incorrect Password..Please try again..', signin:false})
                return
            }
             
            // generate refreshtoken here
            const refreshToken = jwt.sign({username:username}, refreshTokenSecret, {expiresIn: '1d'})  // crypto.randomBytes(32).toString('hex')
            const accesToken = jwt.sign({username:username}, accessTokenSecret, {expiresIn:'300sec'})
            if(userRefreshTokenList.hasOwnProperty(username)){
                userRefreshTokenList[username].push(refreshToken)
            }else{
                userRefreshTokenList[username] = []
                userRefreshTokenList[username].push(refreshToken)
            }
           
            
      
            res.cookie('refreshToken', refreshToken, {httpOnly:true, expires: new Date(Date.now() +(1000*60*60))})
            const response = {message:'User has successfully signed in', signin:true,username:user.username, token:accesToken,expires:Date.now()+ (60000*5)}
            
            console.log(userRefreshTokenList.length)
            console.log(userRefreshTokenList)
            console.log(res)
            res.status(200).json(response)
            
        }catch(error){
            console.log(error)
            res.status(400).json({message:'There is an error in signin.Please try again', signin:false, error:error})
        }
    }
},
module.exports.signoutUser = (req, res, next) => {
    if(req.isAuthenticated){
        userRefreshTokenList[req.username] = userRefreshTokenList[req.username].filter(rf => rf != req.refreshToken) 
        req.clearCookie(req.refreshToken)
        res.json({message:'User Loggedout', token:'' })
    }
    
}
async function checkIfUserExist(username){
    try {
        const user = await User.findOne({where:{username:username}})
        if(!user){
            return false
        }
        return user
    }catch(error){
        console.log(error)
        return false
    }
}
async function generateHashAndSalt(password,saltRounds){
    try{
        const salt = await bcrypt.genSalt(saltRounds)
        const hash = await bcrypt.hash(password,salt)
        return { hash,salt}
        
    }catch(error){
        console.log(error)
    }
    
}


