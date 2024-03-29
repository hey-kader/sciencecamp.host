const mongoose = require ("mongoose")
const Schema = mongoose.Schema

const onlineSchema = new Schema ({
  username: {
    type: String,
    unique: true,
    dropDups: true
  },
  location: {
    type: String
  },
  since: {
    type: Date,
    default: Date()
  },
})


module.exports = mongoose.model("online", onlineSchema)
