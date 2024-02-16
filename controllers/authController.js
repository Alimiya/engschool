const bcrypt = require("bcryptjs")
const {
    generateAdminToken,
    generateManagerToken,
    generateTeacherToken,
    generateStudentToken
} = require('../middlewares/token')

const Admin = require('../models/adminModel')
const Student = require('../models/studentModel')
const Manager = require('../models/managerModel')
const Teacher = require('../models/teacherModel')

exports.login = async (req, res) => {
    const {username, password} = req.body

    try {
        let user
        let token

        user = await Admin.findOne({username})
        if (user) {
            const validPassword = await bcrypt.compare(password, user.password)
            if (validPassword) {
                userId = user._id
                token = generateAdminToken(user)
                return handleLoginSuccess(res, token, 'admin', userId)
            }
        }

        user = await Manager.findOne({username})
        if (user) {
            const validPassword = await bcrypt.compare(password, user.password)
            if (validPassword) {
                userId = user._id
                token = generateManagerToken(user)
                return handleLoginSuccess(res, token, 'manager', userId)
            }
        }

        user = await Teacher.findOne({username})
        if (user) {
            const validPassword = await bcrypt.compare(password, user.password)
            if (validPassword) {
                userId = user._id
                token = generateTeacherToken(user)
                return handleLoginSuccess(res, token, 'teacher', userId)
            }
        }

        user = await Student.findOne({username})
        if (user) {
            const validPassword = await bcrypt.compare(password, user.password)
            if (validPassword) {
                userId = user._id
                token = generateStudentToken(user)
                return handleLoginSuccess(res, token, 'student', userId)
            }
        }

        return res.json({message: "Incorrect username or password"})
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: "Internal server error"})
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie('admin')
        res.clearCookie('manager')
        res.clearCookie('teacher')
        res.clearCookie('student')

        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
}

function handleLoginSuccess(res, token, role, userId) {
    res.cookie(role, token, {maxAge: process.env.TOKEN_EXPIRE * 100000})
    res.header('Authorization', `Bearer ${token}`)

    res.redirect(`/profile/${role}/${userId}`)
}