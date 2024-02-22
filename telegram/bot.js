const TelegramApi = require("node-telegram-bot-api");
const bot = new TelegramApi(process.env.TELEGRAM_TOKEN, { polling: true })

module.exports = bot;

