const mongoose = require('mongoose')

const classScheduleSchema = mongoose.Schema({
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    calendar: {
        days: [[Number]],
        daysOfWeek: [String]
    },
    numberOfLessons: { type: Number, min:10, max:12, required: true },
    lessonDays: [{ type: Number, required: true }],
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    teacher:{type:mongoose.Schema.Types.ObjectId, ref:'Teacher'}
})

const ClassSchedule = mongoose.model('ClassSchedule', classScheduleSchema)

module.exports = ClassSchedule