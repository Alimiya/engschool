const mongoose = require('mongoose')

const classSchema = mongoose.Schema({
    name:{type:String, required:true},
    schedule:[{type:mongoose.Schema.Types.ObjectId, ref:'ClassSchedule'}],
    teacher:{type:mongoose.Schema.Types.ObjectId, ref:'Teacher'},
    students:[{type:mongoose.Schema.Types.ObjectId, ref:'Student'}],
    lessons:[{type:mongoose.Schema.Types.ObjectId, ref:'Lesson'}],
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School'}
})

const Class = mongoose.model('Class', classSchema)

module.exports = Class