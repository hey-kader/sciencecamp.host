const mongoose = require ('mongoose')

const Camper = require ('./camper')
require ("dotenv").config()

mongoose.connect(process.env.uri).catch()
console.log('connected.')

