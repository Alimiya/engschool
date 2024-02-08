const express = require('express')
const router = express.Router()
const Controller = require('../controllers/teacherController')
const {verifyTeacherToken} = require('../middlewares/verify')
const {TEACHER_TOKEN_SECRET} = process.env

router.get('/student/:id', verifyTeacherToken(TEACHER_TOKEN_SECRET), Controller.getStudentById)
router.post('/student/create', verifyTeacherToken(TEACHER_TOKEN_SECRET), Controller.createStudent)
router.get('/students', verifyTeacherToken(TEACHER_TOKEN_SECRET), Controller.getStudents)

router.get('/class/:id', verifyTeacherToken(TEACHER_TOKEN_SECRET), Controller.getClassById)
router.post('/class/create', verifyTeacherToken(TEACHER_TOKEN_SECRET), Controller.createClass)
router.post('/class/add/:id', verifyTeacherToken(TEACHER_TOKEN_SECRET), Controller.addStudentsToClass)
router.get('/classes', verifyTeacherToken(TEACHER_TOKEN_SECRET), Controller.getClasses)


module.exports = router