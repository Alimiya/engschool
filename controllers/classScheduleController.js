const ClassSchedule = require('../models/classScheduleModel')
const Class = require('../models/classModel')
const {generateMonthCalendar} = require('../middlewares/calendar')

exports.createClassSchedule = async (req, res) => {
    const { classId, year, month, selectedLessonDays, numberOfLessons } = req.body
    const teacherId = req.user._id

    try {
        let existingSchedule = await ClassSchedule.findOne({ classId, year, month })

        if (existingSchedule) {
            existingSchedule.selectedLessonDays = selectedLessonDays

            existingSchedule = await existingSchedule.save()
            res.json({ existingSchedule })
        } else {
            const monthCalendar = await generateMonthCalendar(year, month)

            const newSchedule = await ClassSchedule.create({
                classId,
                year,
                month,
                selectedLessonDays: selectedLessonDays,
                calendar: monthCalendar,
                numberOfLessons
            })

            await newSchedule.save()
            await Class.findByIdAndUpdate(classId, { $push: { schedule: newSchedule } })
            res.json({newSchedule})
        }
    } catch (err) {
        console.log(err)
    }
}

exports.getClassScheduleById = async (req, res) => {
    const teacherId = req.user._id
    const { classId } = req.params

    try {
        const schedule = await ClassSchedule.find(classId)
        if (!schedule) return res.json({ message: 'Class schedule not found' })

        const scheduleWithWeekdays = schedule.map(item => {
            const calendar = item.calendar.days
            const daysOfWeek = item.calendar.daysOfWeek
            const scheduleDays = calendar.map(week => {
                return week.map(day => {
                    if (day !== null) {
                        const date = new Date(item.year, item.month - 1, day-1)
                        const dayOfWeek = date.getDay()
                        return daysOfWeek[dayOfWeek]
                    } else {
                        return ''
                    }
                })
            })

            return { ...item.toObject(), scheduleDays }
        })
        res.json(scheduleWithWeekdays)
    } catch (err) {
        console.log(err)
    }
}

exports.getCurrentSchedule = async (req, res) => {
    const {classId, year, month} = req.params

    try {
        const schedule = await ClassSchedule.findOne({ classId, year, month })
        res.json(schedule)
    } catch (err) {
        console.log(err)
    }
}

exports.selectLessonDays = async (req, res) => {
    const { classScheduleId, lessonDays} = req.body

    try {
        const schedule = await ClassSchedule.findById(classScheduleId)

        if (!schedule) return res.json({ message: 'Class schedule not found' })
        console.log(lessonDays)
        console.log(lessonDays.length)
        console.log(schedule.numberOfLessons)
        if (lessonDays.length !== schedule.numberOfLessons) return res.json({ message: 'You exceeded the number of lessons' })

        schedule.lessonDays = lessonDays
        await schedule.save()

        return res.json({ message: 'Lesson days selected successfully', schedule })
    } catch (err) {
        console.log(err)
    }
}