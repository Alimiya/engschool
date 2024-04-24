const bcrypt = require("bcryptjs")
const bot = require('../telegram/bot')
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
                const currentDate = new Date().toLocaleString()
                if (user.chat_id) await bot.sendMessage(user.chat_id, `Добро пожаловать Администратор! Вы успешно вошли в систему был ${currentDate}`)
                return handleLoginSuccess(res, token, 'admin', userId)
            }
        }

        user = await Manager.findOne({username})
        if (user) {
            const validPassword = await bcrypt.compare(password, user.password)
            if (validPassword) {
                userId = user._id
                token = generateManagerToken(user)
                const currentDate = new Date().toLocaleString()
                if (user.chat_id) await bot.sendMessage(user.chat_id, `Добро пожаловать Менеджер! Вы успешно вошли в систему был ${currentDate}`)
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
        res.status(500).json({message: "Internal server error"})
    }
}
function handleLoginSuccess(res, token, role, userId) {
    res.cookie(role, token, {maxAge: process.env.TOKEN_EXPIRE * 1000, httpOnly: true, secure: true, sameSite: 'Strict'})
    res.header('Authorization', `Bearer ${token}`)

    res.redirect(`/profile/${role}/${userId}`)
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie('admin')
        res.clearCookie('manager')
        res.clearCookie('teacher')
        res.clearCookie('student')

        res.redirect('/')
    } catch (err) {
        res.status(500).json({message: "Internal server error"})
    }
}

