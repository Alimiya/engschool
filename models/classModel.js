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

async function getClassByName(name) {
    try {
        const classInfo = await Class.findOne({ name });
        return classInfo;
    } catch (error) {
        console.error('Error finding class by name:', error);
        throw error;
    }
}


module.exports = Class