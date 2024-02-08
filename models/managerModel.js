const mongoose = require('mongoose')

const managerSchema = mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'manager'},
    classes:[{type:mongoose.Schema.Types.ObjectId, ref:'Class'}]
})

const Manager = mongoose.model('Manager', managerSchema)

module.exports = Manager