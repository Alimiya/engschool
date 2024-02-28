const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    chat_id:{type:Number, unique: true},
    role: { type: String, default:'admin'},
    schools: [{ type: mongoose.Schema.Types.ObjectId, ref: 'School' }]
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin