const bcrypt = require("bcryptjs")
const Student = require('../models/studentModel')
const Manager = require('../models/managerModel')
const Teacher = require('../models/teacherModel')
const Class = require('../models/classModel')

exports.getManagers = async (req, res) => {
    try {
        const managers = await Manager.find({})
        res.json({managers})
    } catch (err) {
        console.log(err)
    }
}

exports.createManager = async (req, res) => {
    const {name, surname, lastname, username, password} = req.body

    const userExists = await Manager.findOne({username})
    if (userExists) {
        return res.json({message: "Username already taken"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
        const newUser = await new Manager({
            name,
            surname,
            lastname,
            username,
            password: hashedPassword,
        })
        await newUser.save()
        res.json({newUser})
    } catch (err) {
        console.log(err)
    }
}

exports.blockManager = async (req, res) => {
    const managerId = req.params.id
    try {
        const manager = await Manager.findByIdAndUpdate(managerId, { blocked: true }, { new: true })
        if (!manager) res.json({message:'Manager not found'})
        res.redirect(req.get('referer'))

    } catch (err) {
        console.log(err)
    }
}

exports.unblockManager = async (req, res) => {
    const managerId = req.params.id
    try {
        const manager = await Manager.findByIdAndUpdate(managerId, { blocked: false }, { new: true })
        if (!manager) res.json({message:'Manager not found'})
        res.redirect(req.get('referer'))

    } catch (err) {
        console.log(err)
    }
}

exports.blockTeacher = async (req, res) => {
    const teacherId = req.params.id
    try {
        const teacher = await Teacher.findByIdAndUpdate(teacherId, { blocked: true }, { new: true })
        if (!teacher) res.json({message:'Teacher not found'})
        res.redirect(req.get('referer'))

    } catch (err) {
        console.log(err)
    }
}

exports.unblockTeacher = async (req, res) => {
    const teacherId = req.params.id
    try {
        const teacher = await Teacher.findByIdAndUpdate(teacherId, { blocked: false }, { new: true })
        if (!teacher) res.json({message:'Teacher not found'})
        res.redirect(req.get('referer'))

    } catch (err) {
        console.log(err)
    }
}

exports.blockStudent = async (req, res) => {
    const studentId = req.params.id
    try {
        const student = await Student.findByIdAndUpdate(studentId, { blocked: true }, { new: true })
        if (!student) res.json({message:'Student not found'})
        res.redirect(req.get('referer'))
    } catch (err) {
        console.log(err)
    }
}

exports.unblockStudent = async (req, res) => {
    const studentId = req.params.id
    try {
        const student = await Student.findByIdAndUpdate(studentId, { blocked: false }, { new: true })
        if (!student) res.json({message:'Student not found'})
        res.redirect(req.get('referer'))
    } catch (err) {
        console.log(err)
    }
}

exports.getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find({})
        res.json({teachers})
    } catch (err) {
        console.log(err)
    }

}
exports.getTeacherById = async (req, res) => {
    const teacherId = req.params.id
    try {
        const teacher = await Teacher.findById(teacherId)
        res.json({teacher})
    } catch (err) {
        console.log(err)
    }
}

exports.createTeacher = async (req, res) => {
    const {name, surname, lastname, username, password} = req.body

    const userExists = await Teacher.findOne({username})
    if (userExists) {
        return res.json({message: "Username already taken"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
        const newUser = await new Teacher({
            name,
            surname,
            lastname,
            username,
            password: hashedPassword,
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

exports.addStudent = async (req, res) => {
    const userId = req.params.id
    const {username, password} = req.body

    const userExists = await Student.findOne({username})
    const user = await Student.findById(userId)

    if (userExists) return res.json({message: "Username already taken"})
    if (!user) return res.json({message: "Student not found"})
    if (user.status !== 'created') return res.json({message: "Student already added"})

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
        const updateUser = await Student.findOneAndUpdate(
            {_id: userId},
            {username, password: hashedPassword, status: 'added'},
            {new: true}
        )
        await updateUser.save()
        res.json({updateUser})
    } catch (err) {
        console.log(err)
    }
}

exports.getClasses = async (req, res) => {
    try {
        const classes = await Class.find({}).populate({
            path:'students',
        })
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
