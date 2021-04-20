const Telegram = require('telegraf/telegram');
const { TELEGRAM_TOKEN, CHAT_ID } = require('./config');

const telegram = new Telegram(TELEGRAM_TOKEN);
const chatId = CHAT_ID;

module.exports = { telegram, chatId };
