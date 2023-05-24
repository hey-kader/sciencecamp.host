require ('dotenv').config()
const mongoose = require ('mongoose')
const Camper = require ('./camper')

const db = async => {
	mongoose.connect(process.env.URI)
}
console.log('connected.')
console.log(db())
