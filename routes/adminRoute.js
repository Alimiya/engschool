const express = require('express')
const router = express.Router()
const Controller = require('../controllers/adminController')
const {verifyAdminToken} = require('../middlewares/verify')
const {ADMIN_TOKEN_SECRET} = process.env


router.get('/manager', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.getManager)
router.post('/manager/create', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.createManager)


router.get('/teacher/:id', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.getTeacherById)
router.post('/teacher/create', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.createTeacher)
router.get('/teachers', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.getTeachers)

router.get('/student/:id', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.getStudentById)
router.post('/student/add/:id', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.addStudent)
router.get('/students', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.getStudents)

module.exports = router