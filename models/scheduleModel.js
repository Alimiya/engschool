const mongoose = require('mongoose')

const scheduleSchema = mongoose.Schema({
    year:{type:'Number', required:true},
    month: { type: String, required: true },
    lessons: [{
        day: { type: String, required: true },
        daysOfWeek: [{ type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] }],
    }]
})

const Schedule = mongoose.model('Schedule', scheduleSchema)

module.exports = Schedule