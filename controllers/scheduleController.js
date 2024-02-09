const Schedule = require('../models/scheduleModel')
const {generateMonthCalendar} = require('../middlewares/calendar')

exports.createSchedule = async (req, res) => {
    const { year, month } = req.body

    try {
        const monthCalendar = generateMonthCalendar(year, month)

        const newSchedule = new Schedule({
            year: year,
            month: month,
            calendar: monthCalendar
        })

        await newSchedule.save()

        res.json({newSchedule})
    } catch (err) {
        console.log(err)
    }
}