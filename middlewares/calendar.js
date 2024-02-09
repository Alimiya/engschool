const calendar = require('node-calendar')

function generateMonthCalendar(year, month) {
    const cal = new calendar.Calendar(calendar.MONDAY)
    const monthCalendar = cal.monthdayscalendar(year, month)

    const monthData = monthCalendar.map(week => week.map(day => day === 0 ? '' : day))

    const monthName = calendar.month_name[month]
    const yearData = { year, month: monthName, days: monthData, daysOfWeek: calendar.day_abbr }

    return yearData
}

module.exports = { generateMonthCalendar }