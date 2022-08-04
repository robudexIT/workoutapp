const jwt = require('jsonwebtoken')
require('dotenv').config()
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
const userRefreshTokenList = require('../config/tokenlist').refreshToken
const userAccessTokenList = require('../config/tokenlist').accessToken
const User = require('../models/User')

module.exports = async(req, res, next) =>{
  const refreshToken = req.cookies.refreshToken
  try {
    if(refreshToken){
  
      const verifyRefreshToken = jwt.verify(refreshToken, refreshTokenSecret)
      if(!verifyRefreshToken){
        console.log('Invalid refreshToken clearing the cookie')
        res.clearCookie(refreshToken)
        res.status(401).json({message:'Unauthorized Access'})
        return
      }
      const username = verifyRefreshToken.username
      const user = await User.findOne({where:{username:username}})

      if(!user){
         console.log('Cannot verify the existence of the user from the database')
         res.clearCookie(refreshToken)
         res.status(401).json({message:'Unauthorized Access'})
        return
      }
      console.log('User must be property of userRefreshTokenList and refreshToken must be in user array')
      if (userRefreshTokenList.hasOwnProperty(username) && userRefreshTokenList[username].findIndex(rf => rf == refreshToken) != -1) {  
         
          console.log('Rotating the user refreshToken and send the new refreshToken to the client')
          userRefreshTokenList[username] = userRefreshTokenList[username].filter(token => token != refreshToken)
          const newRefreshToken = jwt.sign({username:username}, refreshTokenSecret, {expiresIn: '1d'})
          userRefreshTokenList[username].push(newRefreshToken)

          const token = jwt.sign({username:username},accessTokenSecret, {expiresIn:'300sec'})
          
          //everytime for token, always update the userAccessTokenList
          // to make sure accessToken will be use once
          userAccessTokenList[username] = token

          res.cookie('refreshToken', newRefreshToken, {sameSite: 'none',httpOnly:true, expires: new Date(Date.now() +(1000*60*60))})
          res.status(200).json({message:'Recieve new access token', username: username,token:token,rcvToken:true,expires: Date.now()+ (60000*5)})
          return
         
       }else{
        console.log('user and refreshToken is not found in the userRefreshTokenList')
        res.clearCookie(refreshToken)
        res.status(401).json({message:'Unauthorized Access'})
        return
       } 

       
      
    }else{
      console.log('refreshToken is empty or falsy')
      res.status(401).json({message:'Unauthorized Access'})
    }
      
  }catch(error){
    console.log(error)
    res.status(401).json({message:'Unauthorized Access'})
  }
 
 }