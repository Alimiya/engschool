const express = require('express')
const router = express.Router()
const Controller = require('../controllers/studentController')
const {verifyStudentToken, verifyManagerToken} = require('../middlewares/verify')
const {STUDENT_TOKEN_SECRET, MANAGER_TOKEN_SECRET} = process.env

router.get('/:id', verifyStudentToken(STUDENT_TOKEN_SECRET), Controller.getStudentById)
router.post('/:id/:year/:month', verifyManagerToken(MANAGER_TOKEN_SECRET), Controller.payDate)

module.exports = router