const jwt = require('jsonwebtoken')

const verifyAdminToken = (secretKey) => (req, res, next) => {
    const token = req.cookies['Admin']
    if (!token) return res.json({message: "Unauthorized"})

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.json({message: "No token"})

        const {_id, role} = decoded
        req.user = {_id, role}
        next()
    })
}

const verifyUserToken = (secretKey) => (req, res, next) => {
    const token = req.cookies['User']
    if (!token) return res.json({message: "Unauthorized"})

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.json({message: "No token"})

        const {_id, role} = decoded
        req.user = {_id, role}
        next()
    })
}

module.exports = {verifyAdminToken, verifyUserToken}