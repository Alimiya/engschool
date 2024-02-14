const Class = require('../models/classModel')
const Student = require('../models/studentModel')

exports.getStudentById = async (req,res) =>{
    const studentId = req.params.id
    try{
        const student = await Student.findById(studentId).populate({
            path:'class',
            populate:{path:'schedule'}
        })
        res.json({student})
    } catch(err){
        console.log(err)
    }
}