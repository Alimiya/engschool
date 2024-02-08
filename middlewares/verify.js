const jwt = require('jsonwebtoken')

const verifyAdminToken = (secretKey) => (req, res, next) => {
    const token = req.cookies['admin']
    if (!token) return res.json({message: "Unauthorized"})

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.json({message: "No token"})

        const {_id, role} = decoded
        req.user = {_id, role}
        next()
    })
}

const verifyManagerToken = (secretKey) => (req, res, next) => {
    const token = req.cookies['manager']
    if (!token) return res.json({message: "Unauthorized"})

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.json({message: "No token"})

        const {_id, role} = decoded
        req.user = {_id, role}
        next()
    })
}
const verifyTeacherToken = (secretKey) => (req, res, next) => {
    const token = req.cookies['teacher']
    if (!token) return res.json({message: "Unauthorized"})

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.json({message: "No token"})

        const {_id, role} = decoded
        req.user = {_id, role}
        next()
    })
}

const verifyStudentToken = (secretKey) => (req, res, next) => {
    const token = req.cookies['student']
    if (!token) return res.json({message: "Unauthorized"})

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.json({message: "No token"})

        const {_id, role} = decoded
        req.user = {_id, role}
        next()
    })
}

module.exports = {verifyAdminToken, verifyManagerToken, verifyTeacherToken, verifyStudentToken}