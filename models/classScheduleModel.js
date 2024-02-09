const mongoose = require('mongoose')

const classScheduleSchema = mongoose.Schema({
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    year: { type: Number, required: true },
    month: { type: String, required: true },
    calendar: {
        days: [[Number]],
        daysOfWeek: [String]
    },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }]
})

const ClassSchedule = mongoose.model('ClassSchedule', classScheduleSchema)

module.exports = ClassSchedule