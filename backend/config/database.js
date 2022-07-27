const sequelize = require('sequelize')
require('dotenv').config()

const dbHost = process.env.DB_HOST
const dbName = process.env.DB_NAME 
const dbUser = process.env.DB_USER 
const dbPwd = process.env.DB_PWD


module.exports = new sequelize(dbName,dbUser,dbPwd, {
    host: dbHost,
    dialect: 'mysql'
})