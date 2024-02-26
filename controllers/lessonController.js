const Student = require('../models/studentModel')
const Class = require('../models/classModel')
const ClassSchedule = require('../models/classScheduleModel')
const Lesson = require('../models/lessonModel')

exports.collectAttendance = async (req, res) => {
    const {studentIds} = req.body
    const {year, month, day, id: classId} = req.params

    try {
        const classExists = await Class.findById(classId)
        if (!classExists) return res.json({message: 'Class not found'})

        const classSchedule = await ClassSchedule.findOne({classId, year, month})
        if (!classSchedule) return res.json({message: 'Class schedule not found'})

        const lessonDayIndex = classSchedule.lessonDays.indexOf(parseInt(day))
        if (lessonDayIndex === -1) return res.json({message: 'Invalid lesson day'})

        const lessonDay = new Date(year, month - 1, day).getDay()

        const lessonDaysOfWeek = classSchedule.calendar.daysOfWeek.map(day => day.toLowerCase())
        if (!lessonDaysOfWeek.includes(getDayOfWeek(lessonDay))) return res.json({message: 'Lesson day does not match selected lesson days'})

        let lesson = await Lesson.findOne({year, month, day, class: classId})
        if (lesson) return res.json({message: 'Lesson already collected'})
        if (!lesson) {
            lesson = new Lesson({
                year,
                month,
                day,
                class: classId,
            })
            await lesson.save()
        }

        const invalidStudents = studentIds.filter(studentId => !classExists.students.includes(studentId))
        if (invalidStudents.length > 0) return res.json({message: 'Invalid student IDs'})

        lesson.students = studentIds
        await lesson.save()

        if (!classExists.lessons.includes(lesson._id)) {
            classExists.lessons.push(lesson._id)
            await classExists.save()
        }

        classSchedule.lessons.push(lesson._id)
        await classSchedule.save()

        for (const studentId of studentIds) {
            const student = await Student.findById(studentId)
            if (student) {
                if (!student.lessons.includes(lesson._id)) {
                    student.lessons.push(lesson._id)
                    await student.save()
                }
            }
        }

        return res.json({message: 'Attendance collected successfully'})
    } catch (err) {
        console.log(err)
    }
}

exports.updateAttendance = async (req, res) => {
    const {studentIds} = req.body
    const {id: classId, year, month, day} = req.params
    try {
        const lesson = await Lesson.findOne({year, month, day, class: classId})
        if (!lesson) return res.json({success: false, message: 'Lesson not found'})

        const classExists = await Class.findById(classId)
        if (!classExists) return res.json({success: false, message: 'Class not found'})

        const classSchedule = await ClassSchedule.findOne({classId, year, month})
        if (!classSchedule) return res.json({success: false, message: 'Class schedule not found'})

        const lessonDayIndex = classSchedule.lessonDays.indexOf(parseInt(day))
        if (lessonDayIndex === -1) return res.json({success: false, message: 'Invalid lesson day'})

        const lessonDay = new Date(year, month - 1, day).getDay()
        const lessonDaysOfWeek = classSchedule.calendar.daysOfWeek.map(day => day.toLowerCase())
        if (!lessonDaysOfWeek.includes(getDayOfWeek(lessonDay))) return res.json({
            success: false,
            message: 'Lesson day does not match selected lesson days'
        })

        const invalidStudents = studentIds.filter(studentId => !classExists.students.includes(studentId))
        if (invalidStudents.length > 0) return res.json({success: false, message: 'Invalid student IDs'})

        lesson.students = studentIds
        await lesson.save()

        if (!classSchedule.lessons.includes(lesson._id)) {
            classSchedule.lessons.push(lesson._id)
            await classSchedule.save()
        }

        for (const studentId of studentIds) {
            const student = await Student.findById(studentId)
            if (student && !student.lessons.includes(lesson._id)) {
                student.lessons.push(lesson._id)
                await student.save()
            }
        }

        return res.json({success: true, message: 'Attendance updated successfully'})
    } catch (err) {
        console.log(err)
    }
}

exports.getLessonsByDay = async (req, res) => {
    const {year, month, day} = req.params
    const classId = req.params.id
    try {
        const lesson = await Lesson.findOne({class: classId, year, month, day}).populate('students')
        res.json(lesson)
    } catch (err) {
        console.log(err)
    }
}

function getDayOfWeek(day) {
    const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
    return daysOfWeek[day]
}
