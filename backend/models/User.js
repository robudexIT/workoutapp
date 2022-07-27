const db = require('../config/database')
const { DataTypes } = require('sequelize')
const Workout = require('./Workout')

const User = db.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type:DataTypes.STRING
    },
    hashpassword: {
        type:DataTypes.STRING
    },
    salt: {
        type:DataTypes.STRING
    }
})

User.hasMany(Workout,{ onDelete: 'CASCADE'})
User.sync()
Workout.belongsTo(User, {onDelete: 'CASCADE'})
Workout.sync()

module.exports = User
