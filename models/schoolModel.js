const mongoose = require('mongoose')

const schoolSchema = mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    classes:[{type:mongoose.Schema.Types.ObjectId,ref:'Class'}],
    manager:[{type:mongoose.Schema.Types.ObjectId,ref:'Manager'}],
    teachers:[{type:mongoose.Schema.Types.ObjectId,ref:'Teacher'}],
})

const School = mongoose.model('School', schoolSchema)

module.exports = School
