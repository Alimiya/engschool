const Student = require('../models/studentModel')

exports.getStudentById = async (req, res) => {
    const studentId = req.params.id

    try {
        const student = await Student.findById(studentId).populate([
            {
                path: 'class',
                populate: {path: 'schedule'}
            },
            {
                path:'lessons'
            }
        ])

        res.json({student})
    } catch (err) {
        console.log(err)
    }
}

exports.payDate = async (req, res) => {
    const studentId = req.params.id
    const {year, month} = req.params

    try {
        const student = await Student.findById(studentId)
        const existingPayment = student.payments.find(p => p.year === +year && p.month === +month)

        if (!student) return res.json({message: "Student not found"})
        if (existingPayment) return res.json({message: "Payment already exists for this year and month"})

        student.payments.push({year: +year, month: +month, payment: true})
        await student.save()

        res.redirect(req.get('referer'))
    } catch (err) {
        console.log(err)
    }
}