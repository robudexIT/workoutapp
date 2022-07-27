const db = require('../config/database')
const { DataTypes } = require('sequelize')
const { NUMBER } = require('sequelize')
// const User = require('./User')


const Workout = db.define('Workout', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
       
        
    },
    title: {
        type:DataTypes.STRING

    },
    load: {
        type:DataTypes.STRING
    },
    reps: {
        type:DataTypes.INTEGER
    }
})

// User.hasMany(Workout)
// Workout.belongsTo(User)
// Workout.sync()

module.exports = Workout

