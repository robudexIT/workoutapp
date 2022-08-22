const jwt = require('jsonwebtoken')
require('dotenv').config()
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
const userRefreshTokenList = require('../config/tokenlist').refreshToken
const userAccessTokenList = require('../config/tokenlist').accessToken
const memcached = require('../config/memcached')
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
      const getSaveTokens = await memcached.get(username)
      const tokens = JSON.parse(getSaveTokens)
      console.log('The tokens get from memcached is', tokens)
      if(tokens && tokens.refreshTokenList.findIndex(rf => rf == refreshToken)){
            tokens.refreshTokenList = tokens.refreshTokenList.filter(rf => rf != refreshToken)
            const newRefreshToken = jwt.sign({username:username}, refreshTokenSecret, {expiresIn: '1d'})
            tokens.refreshTokenList.push(newRefreshToken)

            const token = jwt.sign({username:username},accessTokenSecret, {expiresIn:'300sec'})
            
            //everytime for token, always update the userAccessTokenList
            // to make sure accessToken will be use once
            tokens.accessToken = token
            await memcached.set(username, JSON.stringify(tokens), 86400)
            res.cookie('refreshToken', newRefreshToken, {secure:true,sameSite:'None',httpOnly:true, expires: new Date(Date.now() +(1000*60*60))})
            res.status(200).json({message:'Recieve new access token', username: username,token:token,rcvToken:true,expires: Date.now()+ (60000*5)})
            return
      }
      
        console.log('user and refreshToken is not found in the userRefreshTokenList')
        res.clearCookie(refreshToken)
        res.status(401).json({message:'Unauthorized Access'})
        return
      
    }else{
      console.log('refreshToken is empty or falsy')
      res.status(401).json({message:'Unauthorized Access'})
    }
      
  }catch(error){
    console.log(error)
    res.status(401).json({message:'Unauthorized Access'})
  }
 
 }