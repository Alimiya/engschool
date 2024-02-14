const Class = require("../models/classModel")
const Manager = require("../models/managerModel")

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
        console.log(err)
    }
}

exports.getClasses = async (req, res) => {
    try {
        const classes = await Class.find({}).populate([
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
        console.log(err)
    }
}

exports.getClassById = async (req, res) => {
    const classId = req.params.id
    try {
        const classInfo = await Class.findById(classId).populate([
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
                select: ['name', 'surname', 'lastname', 'attendance', 'blocked', 'payment']
            }
        ])
        res.json({classInfo})
    } catch (err) {
        console.log(err)
    }
}