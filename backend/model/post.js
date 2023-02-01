const mongoose = require ("mongoose")
const {v4: uuidv4} = require ("uuid")
const Schema = mongoose.Schema

const postSchema = new Schema ({
	username: {
		type: String
	},
	created: {
		type: Date,
		default: Date(),
		required: true
	},
	title: {
	type: String,
	required: true
	},
	text: {
		type: String,
		required: true
	},
})


module.exports = mongoose.model("Post", postSchema)
