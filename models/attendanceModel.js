const mongoose = require('mongoose')

const attendanceSchema = mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
    attended: { type: Boolean, default: false }
})

const Attendance = mongoose.model('Attendance', attendanceSchema)

module.exports = Attendance