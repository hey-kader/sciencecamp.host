const mongoose = require ("mongoose")
const Schema = mongoose.Schema

const camperSchema = new Schema ({
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
	},
	latest: {
		type: Date,
	},
})

module.exports = mongoose.model("Camper", camperSchema);
