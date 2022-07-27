// const jwt = require('jsonwebtoken')
// require('dotenv').config()

// const tokenSecret = process.env.TOKEN_SECRET



// const token = jwt.sign({username:'rogmer',position:'IT'}, tokenSecret, {expiresIn:'60sec'})
// console.log(token)

// veryfiy
const jwt = require('jsonwebtoken')
require('dotenv').config()
const tokenSecret = process.env.TOKEN_SECRET
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvZ21lciIsInBvc2l0aW9uIjoiSVQiLCJpYXQiOjE2NTg3NzkzMzYsImV4cCI6MTY1ODc3OTM5Nn0.s-nXlFm5tXmhUC9HeZ0yKiyrkUmd6-kmrptuX8LpNRI'

try {
    const decoded = jwt.verify(token, tokenSecret)
    console.log(decoded)
}catch(error){
    console.log(error)
}


