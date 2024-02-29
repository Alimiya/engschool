const TelegramApi = require("node-telegram-bot-api")
const bot = new TelegramApi(process.env.TELEGRAM_TOKEN, { polling: false })

module.exports = bot

