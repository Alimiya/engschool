const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String },
    password: { type: String },
    blocked:{type:Boolean,default:false},
    role: { type: String, default: 'student'},
    status:{type:String ,enum:['created','added'], default:'created'},
    class:{type:mongoose.Schema.Types.ObjectId, ref:'Class'},
    attendance:[{type:mongoose.Schema.Types.ObjectId, ref:'Attendance'}],
    payment:{type:Boolean, default:false},
    createdAt:{type:Date, default:Date.now()}
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student