const express = require('express')
const router = express.Router()
const Controller = require('../controllers/lessonController')
const {verifyTeacherToken, verifyStudentToken} = require('../middlewares/verify')
const {TEACHER_TOKEN_SECRET} = process.env

router.get('/:id/:year/:month/:day', verifyTeacherToken(TEACHER_TOKEN_SECRET), Controller.getLessonsByDay)
router.post('/:id/:year/:month/:day', verifyTeacherToken(TEACHER_TOKEN_SECRET), Controller.collectAttendance)
router.post('/update/:id/:year/:month/:day', verifyTeacherToken(TEACHER_TOKEN_SECRET), Controller.updateAttendance)

module.exports = router