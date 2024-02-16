const Student = require('../models/studentModel')
const Teacher = require('../models/teacherModel')
const Class = require('../models/classModel')
const Manager = require('../models/managerModel')

exports.getTeacherById = async (req, res) => {
    const teacherId = req.params.id
    const userId = req.user._id

    try {
        const teacher = await Teacher.find({_id: teacherId}).populate(
            {
                path: 'classes',
                populate: ['schedule', 'students'],
            })
        res.json({teacher})
    } catch (err) {
        console.log(err)
    }
}

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
    const teacherId = req.user._id
    const {name} = req.body

    try {
        const managers = await Manager.find({})
        const newClass = await new Class({
            name,
            teacher: teacherId
        })

        await newClass.save()
        await Teacher.findByIdAndUpdate(teacherId, {$push: {classes: newClass._id}})
        for (const manager of managers) {
            await Manager.findByIdAndUpdate(manager._id, {$push: {classes: newClass._id}})
        }
        res.json({newClass})
    } catch (err) {
        console.log(err)
    }
}

exports.getClasses = async (req, res) => {
    try {
        const classes = await Class.find({}).populate('schedule')
        res.json({classes})
    } catch (err) {
        console.log(err)
    }
}

exports.getClassById = async (req, res) => {
    const classId = req.params.id

    try {
        const classInfo = await Class.findById(classId).populate('schedule')
        res.json({classInfo})
    } catch (err) {
        console.log(err)
    }
}

exports.addStudentsToClass = async (req, res) => {
    const teacherId = req.user._id
    let {studentIds, classId} = req.body

    if (!Array.isArray(studentIds)) {
        studentIds = [studentIds]
    }

    try {
        const checkTeacher = await Class.find({teacher: teacherId})
        const classInfo = await Class.findById({_id: classId})

        const studentsExist = await Student.find({_id: {$in: studentIds}})
        const studentsWithCreatedStatus = studentsExist.filter(student => student.status === 'created')
        const studentsWithoutClass = await Student.find({class: {$exists: false, $eq: null}})

        if (!checkTeacher) return res.json({message: "Not same teacher"})
        if (!classInfo) return res.json({message: "Class not found"})
        if (studentsExist.length !== studentIds.length) return res.json({error: 'Student or students not found'})
        if (studentsWithCreatedStatus.length > 0) return res.json({message: 'Student or students not added'})
        if (studentsWithoutClass.length !== studentIds.length) return res.json({error: 'Student or students not found or already have a class'})

        await Promise.all(studentIds.map(async studentId => {
            await Student.findByIdAndUpdate(studentId, {$set: {class: classId}})
        }))
        await Class.findByIdAndUpdate(classId, {$addToSet: {students: {$each: studentIds}}})
        return res.json({classInfo})
    } catch (err) {
        console.log(err)
    }
}
