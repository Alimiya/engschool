const mongoose = require('mongoose')

const lessonSchema = mongoose.Schema({
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    day: { type: Number, required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
})

const Lesson = mongoose.model('Lesson', lessonSchema)

module.exports = Lesson