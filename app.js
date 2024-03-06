const express = require("express")
const mongoose = require("mongoose")
const path = require('path')
const axios = require('axios')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
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

const bot = require('./telegram/bot')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'translation')))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
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

const Admin = require('./models/adminModel')
const Manager = require('./models/managerModel')

bot.setMyCommands([
    {
        command: '/start',
        description: 'Start bot'
    },
    {
        command: '/info',
        description: 'Information about school'
    },
    {
        command: '/link',
        description: 'Link to website'
    },
    {
        command: '/login',
        description: 'Login'
    },
    {
        command: '/test',
        description: 'test'
    }
])


bot.on('message', async (msg) => {
    const text = msg.text
    const chatId = msg.chat.id

    if (text === '/start') {
        return bot.sendMessage(chatId, `Привет, ${msg.from.first_name}!`)
    }
    if (text === '/link') {
        return bot.sendMessage(chatId, 'Ссылка на сайт')
    }
    if (text === '/test') {
        return bot.sendMessage(chatId, `${msg}`)
    }
    if (text === '/login') {
        await bot.sendMessage(chatId, 'Введите логин')
        bot.once('message', async (msg) => {
            const username = msg.text.trim()

            await bot.sendMessage(chatId, 'Введите пароль')

            bot.once('message', async (msg) => {
                const password = msg.text.trim()

                try {
                    let user

                    user = await Admin.findOne({ username })
                    if (!user) user = await Manager.findOne({ username })
                    if (!user) return bot.sendMessage(chatId, "Неправильный логин или пароль")

                    const validPassword = await bcrypt.compare(password, user.password)
                    if (!validPassword) return bot.sendMessage(chatId, "Неправильный пароль")

                    if (user.chat_id) return bot.sendMessage(chatId, "Вход уже выполнен на другом устройстве")
                    user.chat_id = chatId

                    await user.save()
                    return bot.sendMessage(chatId, `Добро пожаловать ${msg.from.first_name}!`)
                } catch (err) {
                    console.log(err)
                    return bot.sendMessage(chatId, "Ошибка входа")
                }
            })
        })
    }
    if (text === '/info') {
        return bot.sendMessage(chatId, 'Информация о школе: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
            'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut ' +
            'aliquip ex ea commodo consequat. Duis aute irure' +
            ' dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, ' +
            'sunt in culpa qui officia deserunt mollit anim id est laborum.')
    }
})


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
    } catch (err) {
        console.log(err)
    }
}



start()

module.exports = app