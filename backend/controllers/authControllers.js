const User = require('../models/User')
const bcrypt = require('bcrypt')
const { restart } = require('nodemon')
const jwt = require('jsonwebtoken')
const tokenSecret = process.env.TOKEN_SECRET
const tokenList = require('../config/tokenlist')
const crypto = require('crypto')


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
    if(req.isAuthenticated){
        res.status(200).json({message:'User is already signed',token:req.token})
        return
    }
    const username = req.body.username
    const password = req.body.password
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
        
        // generate token here
        const token = jwt.sign({username:username}, tokenSecret, {expiresIn: '300sec'})
        
        const refreshToken = crypto.randomBytes(32).toString('hex')
        
        tokenList[refreshToken] = token

        const response = {message:'User has successfully signed in', token: `${token} ${refreshToken}`, signin:true,username:user.username}
        
        console.log(tokenList)
        res.status(200).json(response)
        
    }catch(error){
        console.log(error)
        res.status(400).json({message:'There is an error in signin.Please try again', signin:false, error:error})
    }

},
module.exports.signoutUser = (req, res, next) => {
    if(req.isAuthenticated){
        delete tokenList[req.refreshToken]
        res.json({message:'User Loggedout', token: ''})
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


