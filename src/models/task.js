const mongoose = require("mongoose")

const schema = mongoose.Schema({
	title: String,
    description: String,
    deadline: {type: Date, default: new Date()}, // time when it should be done
    reminderTime: {type: Date, default: new Date()}, //time when the reminder notification should be shown
    isCompleted: {type: Boolean , default: false}
},{ timestamps: false })

module.exports = mongoose.model("Task", schema)