const mongoose = require ('mongoose')

const Camper = require ('./camper')
require ("dotenv").config()

const db = async => {
	mongoose.connect(process.env.uri)
}
console.log('connected.')
console.log(db())
