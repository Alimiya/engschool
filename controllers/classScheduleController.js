const ClassSchedule = require('../models/classScheduleModel')
const Class = require('../models/classModel')
const {generateMonthCalendar} = require('../middlewares/calendar')


exports.createClassSchedule = async (req, res) => {
    const { classId, year, month, selectedLessonDays } = req.body
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
                calendar: monthCalendar
            })
            await newSchedule.save()
            await Class.findByIdAndUpdate(classId, { schedule: newSchedule }, { new: true })
            res.json({newSchedule})
        }
    } catch (error) {
        console.error('Error creating class schedule:', error)
        throw error
    }
}

exports.getClassScheduleById = async (req, res) => {
    const teacherId = req.user._id
    const { classId } = req.params

    try {
        const schedule = await ClassSchedule.find(classId)

        if (!schedule) {
            return res.status(404).json({ error: 'Class schedule not found' })
        }

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