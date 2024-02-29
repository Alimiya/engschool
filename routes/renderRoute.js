const express = require('express')
const router = express.Router()
const Controller = require('../controllers/renderController')

router.get('/', Controller.getLogin)
router.get('/profile/manager/:id', Controller.getManager)
router.get('/profile/teacher/:id', Controller.getTeacher)
router.get('/profile/admin/:id', Controller.getAdmin)
router.get('/profile/admin/:id/school/manager/add', Controller.addManagerToSchool)
router.get('/profile/admin/:id/school/manager/update', Controller.updateSchoolManager)
router.get('/profile/admin/:id/manager/create', Controller.createManager)
router.get('/profile/admin/:id/teacher/create', Controller.createTeacher)
router.get('/profile/admin/:id/student/add', Controller.addStudent)
router.get('/profile/student/:id', Controller.getStudent)
router.get('/profile/teacher/:id/student/create', Controller.createStudent)
router.get('/profile/teacher/:id/class/create', Controller.createClass)
router.get('/profile/teacher/:id/class/add/students', Controller.addStudentToClass)
router.get('/profile/teacher/:id/class/add/schedule', Controller.createClassSchedule)
router.get('/profile/teacher/:id/class/add/lessons', Controller.addLessons)
router.get('/profile/teacher/class/add/lesson/:selectedClassId/:selectedYear/:selectedMonth/:day', Controller.getAttendance)
router.get('/profile/teacher/class/update/lesson/:selectedClassId/:selectedYear/:selectedMonth/:day', Controller.updateAttendance)

module.exports = router