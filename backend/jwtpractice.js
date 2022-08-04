// const jwt = require('jsonwebtoken')
// require('dotenv').config()

// const tokenSecret = process.env.ACCESS_TOKEN_SECRET


// const token = jwt.sign({username:'rogmer',position:'IT'}, tokenSecret, {expiresIn:'60sec'})
// console.log(token)

// veryfiy
const jwt = require('jsonwebtoken')
require('dotenv').config()
const tokenSecret = process.env.REFRESH_TOKEN_SECRET
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvZ21lciIsImlhdCI6MTY1OTU2MjgxMiwiZXhwIjoxNjU5NjQ5MjEyfQ.-_UdLHMoJ1dz4sSUozpWmGWf4-01i7q7GBK4BkTiXzM'

try {
    const decoded = jwt.verify(token, tokenSecret)
    console.log(decoded)
}catch(error){
    console.log(error)
}


