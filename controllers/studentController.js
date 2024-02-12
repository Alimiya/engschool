const Class = require('../models/classModel')

exports.getSchedule = async (req,res) =>{
    const studentId = req.user._id
    try{
        const classInfo = await Class.find({students:studentId}).populate({
            path:'schedule',
        })
    res.json({classInfo})
    } catch(err){
        console.log(err)
    }
}