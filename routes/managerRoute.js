const express = require('express')
const router = express.Router()
const Controller = require('../controllers/managerController')
const Student = require('../controllers/studentController')
const {verifyManagerToken, verifyStudentToken} = require('../middlewares/verify')
const {MANAGER_TOKEN_SECRET} = process.env

router.get('/class/:id', verifyManagerToken(MANAGER_TOKEN_SECRET),Controller.getClassById)
router.get('/student/:id', verifyManagerToken(MANAGER_TOKEN_SECRET),Controller.getStudentById)
router.get('/classes', verifyManagerToken(MANAGER_TOKEN_SECRET),Controller.getClasses)
router.get('/:id', verifyManagerToken(MANAGER_TOKEN_SECRET), Controller.getManagerById)
router.post('/:studentId/:year/:month', verifyManagerToken(MANAGER_TOKEN_SECRET), Student.payDate)

module.exports = router