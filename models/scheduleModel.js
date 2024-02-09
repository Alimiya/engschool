const mongoose = require('mongoose')

const scheduleSchema = mongoose.Schema({
    year:{type:'Number', required:true},
    month: { type: String, required: true },
    calendar: {
        days: [[Number]],
        daysOfWeek: [String],
    },
})

const Schedule = mongoose.model('Schedule', scheduleSchema)

module.exports = Schedule