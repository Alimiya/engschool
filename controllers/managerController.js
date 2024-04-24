const Class = require("../models/classModel")
const Manager = require("../models/managerModel")
const Student = require("../models/studentModel")

exports.getManagerById = async (req, res) => {
    const managerId = req.params.id
    const userId = req.user._id

    try {
        if (managerId !== userId) return res.json({message: "Not same user"})

        const manager = await Manager.findOne({_id:managerId}).populate(
            {
            path:'classes',
            populate:['schedule','students', 'teacher']
            }
        )
        res.json({manager})
    } catch (err) {
        res.status(500).json({message: "Internal server error"})
    }
}

exports.getClasses = async (req, res) => {
    const managerId = req.user._id
    try {
        const manager = await Manager.findOne({_id:managerId})
        const classes = await Class.find({school: { $in: manager.schools }}).populate([
            {
                path: 'teacher',
                select: ['name', 'surname', 'lastname']
            },
            {
                path: 'schedule',
                select: ['year', 'month', 'calendar', 'lessons', 'selectedLessonDays']
            },
            {
                path: 'students',
                select: ['name', 'surname', 'lastname', 'attendance']
            }
        ])
        res.json({classes})
    } catch (err) {
        res.status(500).json({message: "Internal server error"})
    }
}

exports.getClassById = async (req, res) => {
    const classId = req.params.id
    const managerId = req.user._id
    try {
        const manager = await Manager.findOne({_id:managerId})
        const classInfo = await Class.find({ _id: classId, school: { $in: manager.schools }}).populate([
            {
                path: 'teacher',
                select: ['name', 'surname', 'lastname']
            },
            {
                path: 'schedule',
                select: ['year', 'month', 'calendar', 'lessons', 'lessonDays', 'numberOfLessons']
            },
            {
                path: 'students',
                select: ['name', 'surname', 'lastname', 'lessons', 'blocked', 'payments'],
                populate:['lessons']
            },
            {
                path: 'lessons'
            }
        ])
        res.json({classInfo})
    } catch (err) {
        res.status(500).json({message: "Internal server error"})
    }
}

exports.getStudentById = async (req, res) => {
    const studentId = req.params.id
    const managerId = req.user._id
    try {
        const manager = await Manager.findOne({ _id: managerId })
        if (!manager) return res.json({ message: "Manager not found" })

        const student = await Student.findById(studentId)
        if (!student) return res.json({ message: "Student not found" })

        const studentClass = await Class.findById(student.class);
        if (!studentClass) return res.json({ message: "Student's class not found" })

        if (!manager.schools.includes(studentClass.school)) return res.json({ message: "Student not from manager's school" })

        res.json(student)
    } catch (err) {
        res.status(500).json({message: "Internal server error"})
    }
}