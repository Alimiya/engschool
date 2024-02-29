const bcrypt = require("bcryptjs")
const Student = require('../models/studentModel')
const Manager = require('../models/managerModel')
const Teacher = require('../models/teacherModel')
const Class = require('../models/classModel')
const School = require('../models/schoolModel')

exports.getTeachersBySchool = async (req, res, next) => {
        const schoolId = req.params.id
    try {
        const teachers = await Teacher.find({ school:schoolId })
        res.json(teachers)
    } catch (err) {
            console.log(err)
    }
}

exports.getClassesBySchool = async (req, res, next) => {
    const schoolId = req.params.id
    try {
        const classes = await Class.find({ school:schoolId })
        res.json(classes)
    } catch (err) {
        console.log(err)
    }
}

exports.addSchoolManager = async (req, res) => {
    const adminId = req.user._id
    const { managerId, schoolId } = req.body

    try {
        const school = await School.findById(schoolId)
        if (!school) return res.json({ error: 'Школа не найдена' })

        const existingManager = await Manager.findOne({ schools: schoolId })
        if (existingManager) return res.json({ error: 'Менеджер уже существует в этой школе' })

        school.manager = managerId
        await school.save()

        await Manager.findByIdAndUpdate(managerId, { schools: schoolId }, { new: true })

        res.redirect(`/profile/admin/${adminId}`)
    } catch (err) {
        console.log(err)
    }
}

exports.updateSchoolManager = async (req, res) => {
    const adminId = req.user._id
    const { managerId, schoolId } = req.body
    try {
        const school = await School.findById(schoolId)
        if (!school) {
            return res.json({ error: 'Школа не найдена' })
        }

        school.manager = managerId
        await school.save()

        await Manager.findByIdAndUpdate(managerId, { school: schoolId }, { new: true })

        res.redirect(`/profile/admin/${adminId}`)
    } catch (err) {
        console.log(err)
    }
}

exports.getSchoolClasses = async (req, res) => {
    const schoolId = req.params.id
    try {
        const classes = await Class.find({ school: schoolId })
        res.json({ classes })
    } catch (err) {
        console.log(err)
    }
}

exports.getSchoolTeachers = async (req, res) => {
    const schoolId = req.params.id
    try {
        const teachers = await Teacher.find({ school: schoolId })
        res.json({ teachers })
    } catch (err) {
        console.log(err)
    }
}

exports.getSchoolManager = async (req, res) => {
    const schoolId = req.params.id
    try {
        const manager = await Manager.findOne({ schools: schoolId })
        res.json({ manager })
    } catch (err) {
        console.log(err)
    }
}

exports.createSchool = async (req, res) => {
    const {name, address} = req.body

    const schoolExists = await School.findOne({name})
    if (schoolExists) return res.json({message: "Name already taken"})

    const addressExists = await School.findOne({address})
    if (addressExists) return res.json({message: "Address already exists"})

    try {
        const newSchool = await new School({
            name,
            address
        })

        await newSchool.save()
        res.json(newSchool)
    } catch (err) {
        console.log(err)
    }
}

exports.getSchools = async (req, res) => {
    try {
        const schools = await School.find({})
        res.json(schools)
    } catch (err) {
        console.log(err)
    }
}

exports.getSchoolById = async (req, res) => {
    const schoolId = req.params.id
    try {
        const school = await School.findById(schoolId)
        res.json(school)
    } catch (err) {
        console.log(err)
    }
}

exports.getTeacherById = async (req, res) => {
    const teacherId = req.params.id

    try {
        const teacher = await Teacher.findById(teacherId)
        res.json(teacher)
    } catch (err) {
        console.log(err)
    }
}

exports.getManagers = async (req, res) => {
    try {
        const managers = await Manager.find({}).populate('schools')
        res.json(managers)
    } catch (err) {
        console.log(err)
    }
}

exports.getManagerById = async (req, res) => {
    const managerId = req.params.id

    try {
        const manager = await Manager.findOne(managerId)
        res.json({manager})
    } catch (err) {
        console.log(err)
    }
}

exports.createManager = async (req, res) => {
    const adminId = req.user._id
    const {name, surname, lastname, username, password} = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userExists = await Manager.findOne({username})
    if (userExists) return res.json({message: "Username already taken"})

    try {
        const newUser = await new Manager({
            name,
            surname,
            lastname,
            username,
            password: hashedPassword,
        })

        await newUser.save()
        res.redirect(`/profile/admin/${adminId}`)
    } catch (err) {
        console.log(err)
    }
}

exports.blockManager = async (req, res) => {
    const managerId = req.params.id

    try {
        const manager = await Manager.findByIdAndUpdate(managerId, {blocked: true}, {new: true})
        if (!manager) res.json({message: 'Manager not found'})

        res.redirect(req.get('referer'))

    } catch (err) {
        console.log(err)
    }
}

exports.unblockManager = async (req, res) => {
    const managerId = req.params.id

    try {
        const manager = await Manager.findByIdAndUpdate(managerId, {blocked: false}, {new: true})
        if (!manager) res.json({message: 'Manager not found'})

        res.redirect(req.get('referer'))

    } catch (err) {
        console.log(err)
    }
}

exports.blockTeacher = async (req, res) => {
    const teacherId = req.params.id

    try {
        const teacher = await Teacher.findByIdAndUpdate(teacherId, {blocked: true}, {new: true})
        if (!teacher) res.json({message: 'Teacher not found'})

        res.redirect(req.get('referer'))

    } catch (err) {
        console.log(err)
    }
}

exports.unblockTeacher = async (req, res) => {
    const teacherId = req.params.id

    try {
        const teacher = await Teacher.findByIdAndUpdate(teacherId, {blocked: false}, {new: true})
        if (!teacher) res.json({message: 'Teacher not found'})

        res.redirect(req.get('referer'))

    } catch (err) {
        console.log(err)
    }
}

exports.blockStudent = async (req, res) => {
    const studentId = req.params.id

    try {
        const student = await Student.findByIdAndUpdate(studentId, {blocked: true}, {new: true})
        if (!student) res.json({message: 'Student not found'})

        res.redirect(req.get('referer'))
    } catch (err) {
        console.log(err)
    }
}

exports.unblockStudent = async (req, res) => {
    const studentId = req.params.id

    try {
        const student = await Student.findByIdAndUpdate(studentId, {blocked: false}, {new: true})
        if (!student) res.json({message: 'Student not found'})

        res.redirect(req.get('referer'))
    } catch (err) {
        console.log(err)
    }
}

exports.getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find({})
        res.json(teachers)
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
    const adminId = req.user._id
    const { name, surname, lastname, username, password, schoolId } = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
        const userExists = await Teacher.findOne({ username })
        if (userExists) return res.json({ message: "Username already taken" })

        const newUser = await new Teacher({
            name,
            surname,
            lastname,
            username,
            password: hashedPassword,
            school: schoolId
        })

        await newUser.save()

        await School.findByIdAndUpdate(schoolId, { $addToSet: { teachers: newUser._id } }, { new: true })

        res.redirect(`/profile/admin/${adminId}`)
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

exports.getCreatedStudents = async (req, res) => {
    try {
        const students = await Student.find({status: 'created'})
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
    const adminId = req.user._id
    const {userId, username, password} = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userExists = await Student.findOne({username})
    const user = await Student.findById(userId)

    if (userExists) return res.json({message: "Username already taken"})
    if (!user) return res.json({message: "Student not found"})
    if (user.status !== 'created') return res.json({message: "Student already added"})


    try {
        const updateUser = await Student.findOneAndUpdate(
            {_id: userId},
            {username, password: hashedPassword, status: 'added'},
            {new: true}
        )

        await updateUser.save()
        res.redirect(`/profile/admin/${adminId}`)
    } catch (err) {
        console.log(err)
    }
}

exports.getClasses = async (req, res) => {
    try {
        const classes = await Class.find({}).populate([
            {
                path: 'students',
            },
            {
                path: 'schedule'
            }
        ])

        res.json(classes)
    } catch (err) {
        console.log(err)
    }
}

exports.getClassById = async (req, res) => {
    const classId = req.params.id

    try {
        const classInfo = await Class.findById(classId).populate([
            {
                path: 'students',
            },
            {
                path: 'schedule'
            }
        ])
        res.json(classInfo)
    } catch (err) {
        console.log(err)
    }
}
