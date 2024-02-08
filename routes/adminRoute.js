const express = require('express')
const router = express.Router()
const Controller = require('../controllers/adminController')
const {verifyAdminToken} = require('../middlewares/verify')
const {ADMIN_TOKEN_SECRET} = process.env

router.post('/manager/create', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.createManager)
router.post('/teacher/create', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.createTeacher)
router.post('/student/add/:id', verifyAdminToken(ADMIN_TOKEN_SECRET), Controller.addStudent)

module.exports = router