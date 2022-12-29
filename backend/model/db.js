const mongoose = require ('mongoose')

const User = require ('./User')
require ("dotenv").config()

mongoose.connect(process.env.uri)
console.log('connected.')
