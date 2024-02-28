const express = require('express')
const router = express.Router()
const Controller = require('../controllers/adminController')
const {verifyAdminToken} = require('../middlewares/verify')
const {ADMIN_TOKEN_SECRET} = process.env

router.get('/school/:id', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.getSchoolById)
router.get('/school/:id/teachers', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.getSchoolTeachers)
router.get('/school/:id/managers', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.getSchoolManager)
router.get('/school/:id/classes', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.getSchoolClasses)
router.get('/schools', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.getSchools)

router.get('/manager/:id', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.getManagerById)
router.post('/manager/create', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.createManager)
router.post('/manager/block/:id', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.blockManager)
router.post('/manager/unblock/:id', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.unblockManager)
router.get('/managers', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.getManagers)


router.get('/teacher/:id', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.getTeacherById)
router.post('/teacher/create', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.createTeacher)
router.post('/teacher/block/:id', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.blockTeacher)
router.post('/teacher/unblock/:id', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.unblockTeacher)
router.get('/teachers', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.getTeachers)

router.get('/student/:id', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.getStudentById)
router.post('/student/block/:id', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.blockStudent)
router.post('/student/unblock/:id', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.unblockStudent)
router.post('/student/add/:id', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.addStudent)
router.get('/students', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.getStudents)
router.get('/students/created', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.getCreatedStudents)

router.get('/class/:id', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.getClassById)
router.get('/classes', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.getClasses)

module.exports = router