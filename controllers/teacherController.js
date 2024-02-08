const Student = require('../models/studentModel')
const Teacher = require('../models/teacherModel')
const Class = require('../models/classModel')

exports.createStudent = async (req, res) => {
    const {name, surname, lastname} = req.body

    try {
        const newUser = await new Student({
            name,
            surname,
            lastname
        })
        await newUser.save()
        res.json({newUser})
    } catch (err) {
        console.log(err)
    }
}

exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find({})
        res.json({students})
    } catch (err) {
        console.log(err)
    }
}

exports.getStudentById = async (req, res) => {
    const studentId = req.params.id

    try {
        const student = await Student.findById(studentId)
        res.json({student})
    } catch (err) {
        console.log(err)
    }
}

exports.createClass = async (req, res) => {
    const {name} = req.body

    try {
        const newClass = await new Class({
            name
        })
        await newClass.save()
        res.json({newClass})
    } catch (err) {
        console.log(err)
    }
}

exports.getClasses = async (req, res) => {
    try {
        const classes = await Class.find({})
        res.json({classes})
    } catch (err) {
        console.log(err)
    }
}

exports.getClassById = async (req, res) => {
    const classId = req.params.id

    try {
        const classInfo = await Class.findById(classId)
        res.json({classInfo})
    } catch (err) {
        console.log(err)
    }
}

exports.addStudentsToClass = async (req, res) => {
    const teacherId = req.params.id
    const classId = req.params.classId
    const studentIds = req.body

    try {
        const checkTeacher = await Class.find({teacher: teacherId})
        const classInfo = await Class.findById(classId)

        if (!checkTeacher) return res.json({message: "Not same teacher"})
        if (!classInfo) return res.json({message: "Class not found"})

        for (const studentId of studentIds) {
            const student = await Student.findById(studentId)
            if (!student) {
                return res.json({message: `Student not found`})
            }
            if (!classInfo.students.includes(studentId)) {
                classInfo.students.push(studentId)
            }
        }

        await classInfo.save()

        return res.json({classInfo})
    } catch (err) {
        console.log(err)
    }
}