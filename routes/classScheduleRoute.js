const express = require('express')
const router = express.Router()
const Controller = require('../controllers/classScheduleController')
const {verifyTeacherToken} = require('../middlewares/verify')
const {TEACHER_TOKEN_SECRET} = process.env

router.post('/create', verifyTeacherToken(TEACHER_TOKEN_SECRET), Controller.createClassSchedule)
router.get('/:id', verifyTeacherToken(TEACHER_TOKEN_SECRET), Controller.getClassScheduleById)

module.exports = router