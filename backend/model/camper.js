const mongoose = require ("mongoose")
const {v4: uuidv4} = require ("uuid")
const Schema = mongoose.Schema

const camperSchema = new Schema ({
	id: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date(),
		required: true
	},
	visits: {
		type: Number
	},
})

camperSchema.methods.visit = function() {
	this.visits++
	console.log(this.visits)
}

module.exports = mongoose.model("Camper", camperSchema);
