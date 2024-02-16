const express = require('express')
const router = express.Router()
const Controller = require('../controllers/lessonController')

router.post('/:id/:year/:month/:day', Controller.collectAttendance)

module.exports = router