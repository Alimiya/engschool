const express = require('express')
const router = express.Router()
const Controller = require('../controllers/renderController')

router.get('/', Controller.getLogin)
router.get('/profile/manager/:id', Controller.getManager)
router.get('/profile/teacher/:id', Controller.getTeacher)
router.get('/profile/admin/:id', Controller.getAdmin)
router.get('/profile/student/:id', Controller.getStudent)

module.exports = router