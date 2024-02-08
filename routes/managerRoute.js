const express = require('express')
const router = express.Router()
const Controller = require('../controllers/managerController')
const {verifyManagerToken} = require('../middlewares/verify')
const {MANAGER_TOKEN_SECRET} = process.env

router.get('/class/:id', verifyManagerToken(MANAGER_TOKEN_SECRET),Controller.getClassById)
router.get('/classes', verifyManagerToken(MANAGER_TOKEN_SECRET),Controller.getClasses)

module.exports = router