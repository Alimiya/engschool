const mongoose = require('mongoose')

const lessonSchema = mongoose.Schema({
    dayOfWeek: {
        type: String,
        enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        required: true
    },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    attendance:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }]
})

const Lesson = mongoose.model('Lesson', lessonSchema)

module.exports = Lesson