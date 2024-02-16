const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require("dotenv").config({path: "config/.env"})

const adminRoute = require('./routes/adminRoute')
const authRoute = require('./routes/authRoute')
const renderRoute = require('./routes/renderRoute')
const studentRoute = require('./routes/studentRoute')
const teacherRoute = require('./routes/teacherRoute')
const managerRoute = require('./routes/managerRoute')
const scheduleRoute = require('./routes/scheduleRoute')
const classScheduleRoute = require('./routes/classScheduleRoute')
const lessonRoute = require('./routes/lessonRoute')

const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())

app.use('/api/admin', adminRoute)
app.use('/api/auth', authRoute)
app.use('/api/manager', managerRoute)
app.use('/api/student', studentRoute)
app.use('/api/teacher', teacherRoute)
app.use('/api/schedule', scheduleRoute)
app.use('/api/classschedule', classScheduleRoute)
app.use('/api/lesson', lessonRoute)
app.use(renderRoute)

const start = async () => {
    try {
        await mongoose
            .connect(process.env.MONGODB_URI)
            .then(() => {
                console.log("Database is connected")
            })
            .catch((error) => console.log(error.message))
        app.listen(process.env.PORT, () => {
            console.log(`http://localhost:${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()

module.exports = app