const jwt = require("jsonwebtoken")

const generateAdminToken = (user) => {
    return jwt.sign({_id: user._id, role: 'Admin'}, process.env.ADMIN_TOKEN_SECRET)
}
const generateUserToken = (user) => {
    return jwt.sign({_id: user._id, role: 'User'}, process.env.USER_TOKEN_SECRET)
}

module.exports = {generateAdminToken, generateUserToken}
