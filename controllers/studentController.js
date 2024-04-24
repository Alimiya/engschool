const Student = require('../models/studentModel')
const ClassSchedule = require('../models/classScheduleModel')

exports.getStudentById = async (req, res) => {
    const studentId = req.params.id

    try {
        const student = await Student.findById(studentId).populate([
            {
                path: 'class',
                populate: {path: 'schedule'}
            },
            {
                path: 'lessons'
            }
        ])

        res.json(student)
    } catch (err) {
        res.status(500).json({message: "Internal server error"})
    }
}

exports.payDate = async (req, res) => {
    const managerId = req.user._id
    const {year, month, studentId} = req.params
    const {payment} = req.body

    try {
        const student = await Student.findById(studentId)
        if (!student) return res.json({message: "Student not found"})
        const schedule = await ClassSchedule.find({classId: student.class, year, month})
        if (payment > schedule[0].numberOfLessons || payment <= 0) return res.json({message: "Write correct number"})

        const existingPayments = student.payments.find(p => p.year === +year && p.month === +month)
        const totalPayments = existingPayments ? existingPayments.payment + parseInt(payment, 10) : parseInt(payment, 10)

        if (totalPayments > schedule[0].numberOfLessons) return res.json({message: "Total payments exceed the total number of lessons"})

        if (existingPayments) {
            existingPayments.payment += parseInt(payment, 10)
        } else {
            student.payments.push({year: +year, month: +month, payment})
        }

        await student.save()


        res.redirect(`/profile/manager/${managerId}`)
    } catch (err) {
        res.status(500).json({message: "Internal server error"})
    }
}