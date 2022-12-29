const mongoose = require ("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema ({
	username: String,
	password: String,
	date: Date
})

module.exports = mongoose.model("User", userSchema);
