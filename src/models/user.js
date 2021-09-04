const mongoose = require("mongoose")

const schema = mongoose.Schema({
	email: String,
  password: String,
  name: String,
  token: { type: String },
  created: {type: Date, default: new Date()},
  updated: {type: Date, default: new Date()}
},{ timestamps: false })

module.exports = mongoose.model("User", schema)