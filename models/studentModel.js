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
    lessons:[{type:mongoose.Schema.Types.ObjectId, ref:'Lesson'}],
    payments:[{
        year: {type: Number, required: true},
        month: {type: Number, required: true},
        payment: {type: Number, default: 0}
    }],
    createdAt:{type:Date, default:Date.now()},
    schedule:[{type:mongoose.Schema.Types.ObjectId, ref:'ClassSchedule'}]
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student