const Schedule = require('../models/scheduleModel')
const {generateMonthCalendar} = require('../middlewares/calendar')

exports.createSchedule = async (req, res) => {
    const { year, month, holidays } = req.body

    try {
        const monthCalendar = generateMonthCalendar(year, month)

        const newSchedule = new Schedule({
            year: year,
            month: month,
            holidays: holidays,
            calendar: monthCalendar
        })

        await newSchedule.save()

        res.json({newSchedule})
    } catch (err) {
        res.status(500).json({message: "Internal server error"})
    }
}