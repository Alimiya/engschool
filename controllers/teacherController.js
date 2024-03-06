const Student = require('../models/studentModel')
const Teacher = require('../models/teacherModel')
const Class = require('../models/classModel')
const School = require('../models/schoolModel')
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
    const teacherId = req.user._id
    const {name, surname, lastname} = req.body

    try {
        const newUser = await new Student({
            name,
            surname,
            lastname
        })

        await newUser.save()
        res.redirect(`/profile/teacher/${teacherId}`)
    } catch (err) {
        console.log(err)
    }
}

exports.getStudents = async (req, res) => {
    const teacherId = req.user._id
    try {
        const classes = await Class.find({ teacher: teacherId })
        const classIds = classes.map(cls => cls._id)
        const students = await Student.find({ class: { $in: classIds } })
        res.json(students)
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
    const { name } = req.body

    try {
        const teacher = await Teacher.findById(teacherId).populate('school')
        if (!teacher) return res.json({ error: 'Учитель не найден' })

        const existingClass = await Class.findOne({ name, school: teacher.school._id })
        if (existingClass) return res.json({ error: 'Класс с таким именем уже существует в этой школе' })

        const newClass = await new Class({
            name,
            teacher: teacherId,
            school: teacher.school._id
        })

        await newClass.save()
        await Teacher.findByIdAndUpdate(teacherId, { $push: { classes: newClass._id } })

        await School.findByIdAndUpdate(teacher.school._id, { $push: { classes: newClass._id } })

        const manager = await Manager.findOne({ school: teacher.school._id })
        if (manager) {
            await Manager.findByIdAndUpdate(manager._id, { $push: { classes: newClass._id } })
        }

        res.redirect(`/profile/teacher/${teacherId}`)
    } catch (err) {
        console.log(err)
    }
}

exports.getClasses = async (req, res) => {
    const teacherId = req.user._id
    try {
        const classes = await Class.find({teacher:teacherId}).populate('schedule')
        res.json(classes)
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

        const studentsWithClass = await Student.find({ _id: { $in: studentIds }, class: { $ne: null } })
        if (studentsWithClass.length > 0) {
            const studentNames = studentsWithClass.map(student => `${student.name} ${student.surname}`).join(', ')
            return res.json({ error: `У студентов (${studentNames}) уже есть класс` })
        }

        if (!checkTeacher) return res.json({message: "Not same teacher"})
        if (!classInfo) return res.json({message: "Class not found"})
        if (studentsExist.length !== studentIds.length) return res.json({error: 'Student or students not found'})
        if (studentsWithCreatedStatus.length > 0) return res.json({message: 'Student or students not added'})
        if (studentsWithoutClass.length !== studentIds.length) return res.json({error: 'Student or students not found or already have a class'})

        await Promise.all(studentIds.map(async studentId => {
            await Student.findByIdAndUpdate(studentId, {$set: {class: classId}})
        }))
        await Class.findByIdAndUpdate(classId, {$addToSet: {students: {$each: studentIds}}})
        res.redirect(`/profile/teacher/${teacherId}`)
    } catch (err) {
        console.log(err)
    }
}

exports.getStudentsByClass = async (req, res) => {
    const classId = req.params.id

    try {
        const students = await Class.findById(classId, { students:1, lessons:1, _id:0}).populate([
            {
                path:'students'
            },
            {
                path:'lessons'
            }
        ])
        res.json(students)
    } catch (err) {
        console.log(err)
    }
}

exports.changeStudentClass = async (req, res) => {
    const teacherId = req.user._id
    const { studentId, classId } = req.body

    try {
        const student = await Student.findById(studentId)
        if (!student) return res.json({ message: 'Student not found' })

        const cls = await Class.findById(classId)
        if (!cls) return res.json({ message: 'Class not found' })

        if (!cls.teacher.equals(teacherId)) return res.json({ message: 'Selected class does not belong to this teacher' })

        if (student.class && student.class.toString() === classId) return res.json({ message: 'Student is already in this class' })

        if (student.class) {
            const currentClass = await Class.findById(student.class)
            if (currentClass && !currentClass.teacher.equals(teacherId)) {
                return res.json({ message: 'Selected student does not belong to this teacher' })
            }

            await Class.findByIdAndUpdate(student.class, { $pull: { students: studentId } })
        }

        student.class = classId
        await student.save()

        cls.students.push(studentId)
        await cls.save()

        res.redirect(`/profile/teacher/${teacherId}`)
    } catch (err) {
        console.error(err)
    }
}

