const mongoose = require('mongoose')

const lessonSchema = mongoose.Schema({
    dayOfWeek: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        required: true
    },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    attendance:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }]
})

const Lesson = mongoose.model('Lesson', lessonSchema)

module.exports = Lesson