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
            res.redirect(`/profile/teacher/${teacherId}`)
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
        const schedule = await ClassSchedule.findOne({ classId, year, month }).populate('lessons')
        res.json(schedule)
    } catch (err) {
        console.log(err)
    }
}

exports.selectLessonDays = async (req, res) => {
    const teacherId = req.user._id
    const { classScheduleId, lessonDays } = req.body

    try {
        const schedule = await ClassSchedule.findById(classScheduleId)
        const parsedLessonDays = JSON.parse(lessonDays)

        if (!schedule) return res.json({ message: 'Class schedule not found' })
        if (!Array.isArray(parsedLessonDays)) return res.json({ message: 'Invalid lesson days format' })
        if (parsedLessonDays.length !== schedule.numberOfLessons) return res.json({ message: 'You exceeded the number of lessons' })

        schedule.lessonDays = parsedLessonDays
        await schedule.save()

        res.redirect(`/profile/teacher/${teacherId}`)
    } catch (err) {
        console.log(err)
    }
}

exports.updateLessonDays = async (req, res) => {
    const teacherId = req.user._id
    const { classScheduleId, lessonDays } = req.body

    try {
        const schedule = await ClassSchedule.findById(classScheduleId)

        if (!schedule) return res.json({ message: 'Class schedule not found' })

        const parsedLessonDays = JSON.parse(lessonDays)

        if (!Array.isArray(parsedLessonDays)) return res.json({ message: 'Invalid lesson days format' })

        const scheduledLessonDays = schedule.lessons.map(lesson => lesson.day)
        const newLessonDays = parsedLessonDays.filter(day => !scheduledLessonDays.includes(day))

        if (newLessonDays.length !== schedule.numberOfLessons) return res.json({ message: 'You exceeded the number of lessons' })

        schedule.lessonDays = newLessonDays

        await schedule.save()

        res.redirect(`/profile/teacher/${teacherId}`)
    } catch (err) {
        console.log(err)
    }
}