const jwt = require('jsonwebtoken')
require('dotenv').config()
const tokenSecret = process.env.TOKEN_SECRET
const tokenList = require('../config/tokenlist')
const User = require('../models/User')
module.exports = async(req, res, next) =>{

  
  const authHeader = req.headers['authorization']
  console.log(authHeader)

  //user signin for the first time
  if(!authHeader && req.path === '/signin'){
    next()
    return
  }

  const token = authHeader && authHeader.split(' ')[1]
  const refreshToken = authHeader.split(' ')[2]

  try {
    if(refreshToken && (refreshToken in tokenList) && (tokenList[refreshToken] === token)){
      console.log('true')
      const verifyToken = jwt.verify(token, tokenSecret)
      if(verifyToken){
        
        const username = verifyToken.username
        const newToken = jwt.sign({username:username},tokenSecret, {expiresIn:'300sec'})
        req.token = `${newToken} ${refreshToken}`
        req.username = username
        req.user = await User.findOne({where:{username:username}})
        req.refreshToken = refreshToken
        tokenList[refreshToken] = newToken
        req.isAuthenticated  = true

        next()
      }
    }else{
      
      res.status(401).json({message:'Unauthorized Access'})
    }
      
  }catch(error){
    console.log(error)
    res.status(401).json({message:'Unauthorized Access'})
  }
 
 }