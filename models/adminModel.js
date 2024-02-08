const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default:'admin'}
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin