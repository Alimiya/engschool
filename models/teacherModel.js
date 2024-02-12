const mongoose = require('mongoose')

const teacherSchema = mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    blocked:{type:Boolean,default:false},
    role: { type: String, default:'teacher'},
    classes:[{type:mongoose.Schema.Types.ObjectId, ref:'Class'}]
})

const Teacher = mongoose.model('Teacher', teacherSchema)

module.exports = Teacher