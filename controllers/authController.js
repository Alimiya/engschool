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
                token = generateAdminToken(user)
                return handleLoginSuccess(res, token, 'admin')
            }
        }

        user = await Manager.findOne({username})
        if (user) {
            const validPassword = await bcrypt.compare(password, user.password)
            if (validPassword) {
                token = generateManagerToken(user)
                return handleLoginSuccess(res, token, 'manager')
            }
        }

        user = await Teacher.findOne({username})
        if (user) {
            const validPassword = await bcrypt.compare(password, user.password)
            if (validPassword) {
                token = generateTeacherToken(user)
                return handleLoginSuccess(res, token, 'teacher')
            }
        }

        user = await Student.findOne({username})
        if (user) {
            const validPassword = await bcrypt.compare(password, user.password)
            if (validPassword) {
                token = generateStudentToken(user)
                return handleLoginSuccess(res, token, 'student')
            }
        }

        return res.json({message: "Incorrect username or password"})
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: "Internal server error"})
    }
}

function handleLoginSuccess(res, token, role) {
    res.cookie(role, token, {maxAge: process.env.TOKEN_EXPIRE * 100000})
    res.header('Authorization', `Bearer ${token}`)
    return res.json({token})
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie('admin')
        res.clearCookie('manager')
        res.clearCookie('teacher')
        res.clearCookie('student')
        res.json({message:"logouted"})
    } catch (err) {
        console.log(err)
    }
}