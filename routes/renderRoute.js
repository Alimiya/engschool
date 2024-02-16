const express = require('express')
const router = express.Router()
const Controller = require('../controllers/renderController')

router.get('/', Controller.getLogin)
router.get('/profile/manager/:id', Controller.getManager)
router.get('/profile/teacher/:id', Controller.getTeacher)
router.get('/profile/admin/:id', Controller.getAdmin)
router.get('/profile/admin/manager/create', Controller.createManager)
router.get('/profile/admin/teacher/create', Controller.createTeacher)
router.get('/profile/admin/student/add/:id', Controller.addStudent)
router.get('/profile/student/:id', Controller.getStudent)
router.get('/profile/teacher/student/create', Controller.createStudent)
router.get('/profile/teacher/class/create', Controller.createClass)
router.get('/profile/teacher/class/add/students', Controller.addStudentToClass)
router.get('/profile/teacher/class/add/schedule', Controller.createClassSchedule)
router.get('/profile/teacher/class/add/lessons', Controller.addLessons)

module.exports = router