const Class = require("../models/classModel")

exports.getClasses = async (req, res) => {
    try {
        const classes = await Class.find({}).populate([
            {
                path: 'teacher',
                select: ['name', 'surname', 'lastname']
            },
            {
                path: 'schedule',
                select: ['year', 'month', 'calendar', 'lessons']
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
        const classInfo = await Class.findById(classId)
        res.json({classInfo})
    } catch (err) {
        console.log(err)
    }
}