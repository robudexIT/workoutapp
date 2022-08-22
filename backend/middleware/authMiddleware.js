const jwt = require('jsonwebtoken')
require('dotenv').config()
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
// const userRefreshTokenList = require('../config/tokenlist').refreshToken
// const userAccessTokenList = require('../config/tokenlist').accessToken
const User = require('../models/User')
const memcached = require('../config/memcached')

module.exports = async(req, res, next) =>{
  const refreshToken = req.cookies.refreshToken
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  console.log(authHeader)
  try {
    if(!refreshToken ||  !token){
      console.log('Its either refreshToken and token has falsy value')
      res.status(401).json({message:'Unauthorized Access need to signin'})
      return
    } 
    console.log('verifying')
    const verifyRefreshToken = jwt.verify(refreshToken, refreshTokenSecret)
    const verifyAccessToken = jwt.verify(token, accessTokenSecret)
    if(!verifyRefreshToken || !verifyAccessToken)  {
      console.log('refreshToken or token cannot verify')
      res.status(401).json({message:'Unauthorized Access need to signin'})
      return
    }
    const getSaveTokens = await memcached.get(verifyRefreshToken.username)
    const tokens = JSON.parse(getSaveTokens)
    if(tokens.accesToken != token){
          console.log('access token from memcached is ',tokens.accesToken)
          console.log('token from client is ',token)
          console.log('accessToken has been used, Request new accessToken need')
          res.status(401).json({message:'Unauthorized Access need to signin'})
          return
    }
    if(tokens.refreshTokenList.findIndex(rf => rf == refreshToken)==-1){
          console.log('user is not in userRefreshTokenList or refreshToken is not in the userArray')
          res.status(401).json({message:'Unauthorized Access need to signin'})
          return
    }
    console.log('populating values on the request object and jump to the next middleware')
    req.accesToken = token
    req.username = verifyRefreshToken.username
    req.refreshToken = refreshToken
    req.user = await User.findOne({where:{username:req.username}})
    req.isAuthenticated  = true
    next() 
      
    
    // if(userAccessTokenList[verifyAccessToken.username] != token){
    //   console.log('accessToken has been used, Request new accessToken need')
    //   res.status(401).json({message:'Unauthorized Access need to signin'})
    //   return
    // }
    // if(!userRefreshTokenList.hasOwnProperty(verifyRefreshToken.username) || userRefreshTokenList[verifyRefreshToken.username].findIndex(rf => rf==refreshToken) == -1){
    //   console.log('user is not in userRefreshTokenList or refreshToken is not in the userArray')
    //   res.status(401).json({message:'Unauthorized Access need to signin'})
    //   return
    // }
    // console.log('populating values on the request object and jump to the next middleware')
    // req.accesToken = token
    // req.username = verifyRefreshToken.username
    // req.refreshToken = refreshToken
    // req.user = await User.findOne({where:{username:req.username}})
    // req.isAuthenticated  = true
    //  userAccessTokenList[req.username] = ''
    // next() 
  }catch(error){
    console.log('Error')
    console.log(error)
    res.status(401).json({message:'Unauthorized Access'})
  }
 
 }