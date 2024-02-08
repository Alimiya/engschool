const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String },
    password: { type: String },
    role: { type: String, default: 'student'},
    status:{type:String ,enum:['created','added'], default:'created'},
    class:{type:mongoose.Schema.Types.ObjectId, ref:'Class'},
    attendance:[{type:mongoose.Schema.Types.ObjectId, ref:'Attendance'}],
    payment:{type:Boolean, default:false}
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student