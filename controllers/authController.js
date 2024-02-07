const bcrypt = require("bcryptjs")
const {generateAdminToken, generateUserToken} = require('../middlewares/token')

exports.login = async (req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({username})
    if (!user) return res.json({message: "Incorrect username"})

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.json({message: "Incorrect password"})

    try {
        const token = user.role === 'Admin' ? generateAdminToken(user) : generateUserToken(user)
        res.cookie(user.role, token, {maxAge: process.env.TOKEN_EXPIRE * 100000})
        res.header('Authorization', `Bearer ${token}`)
        if(user.role === 'Admin') return res.redirect('/admin')
        if(user.role === 'User') return res.redirect('/')
    } catch (err) {
        console.log(err)
    }
}
exports.logout = async (req, res) => {
    try {
        res.clearCookie('Admin')
        res.clearCookie('User')
        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
}