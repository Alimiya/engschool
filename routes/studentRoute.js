const express = require('express')
const router = express.Router()
const Controller = require('../controllers/studentController')
const {verifyStudentToken} = require('../middlewares/verify')
const {STUDENT_TOKEN_SECRET} = process.env

router.get('/:id', verifyStudentToken(STUDENT_TOKEN_SECRET), Controller.getStudentById)

module.exports = router