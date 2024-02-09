const express = require('express')
const router = express.Router()
const Controller = require('../controllers/scheduleController')
const {verifyTeacherToken} = require('../middlewares/verify')
const {ADMIN_TOKEN_SECRET} = process.env

router.post('/add', verifyTeacherToken(ADMIN_TOKEN_SECRET), Controller.createSchedule)

module.exports = router