const express = require('express')
const router = express.Router()
const Controller = require('../controllers/lessonController')

router.get('/:id/:year/:month/:day', Controller.getLessonsByDay)
router.post('/:id/:year/:month/:day', Controller.collectAttendance)
router.post('/update/:id/:year/:month/:day', Controller.updateAttendance)

module.exports = router