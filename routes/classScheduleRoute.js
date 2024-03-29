const express = require('express')
const router = express.Router()
const Controller = require('../controllers/classScheduleController')
const {verifyTeacherToken, verifyStudentToken} = require('../middlewares/verify')
const {TEACHER_TOKEN_SECRET, STUDENT_TOKEN_SECRET} = process.env

router.post('/create', verifyTeacherToken(TEACHER_TOKEN_SECRET), Controller.createClassSchedule)
router.get('/:id', verifyTeacherToken(TEACHER_TOKEN_SECRET), Controller.getClassScheduleById)
router.post('/add/lessons', verifyTeacherToken(TEACHER_TOKEN_SECRET), Controller.selectLessonDays)
router.post('/update/lessons', verifyTeacherToken(TEACHER_TOKEN_SECRET), Controller.updateLessonDays)
router.get('/:classId/:year/:month', Controller.getCurrentSchedule)

module.exports = router