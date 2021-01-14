const { Telegraf } = require('telegraf');

const { TELEGRAM_TOKEN, CHAT_ID } = require('./config');

const bot = new Telegraf(TELEGRAM_TOKEN);

const startBot = require('./commands/start');
const help = require('./commands/help');
const depth = require('./commands/depth');
const stop = require('./commands/stop');
const serviceMessages = require('./commands/serviceMessages');

const goBack = require('./actions/goBack');
const whitebitDepth = require('./actions/whitebitDepth');
const deleteMessage = require('./actions/deleteMessage');

const startServer = require('./lib/express');
const connectToSocket = require('./lib/sockets/connect');

if (process.env.NODE_ENV !== 'development') {
  startServer();
}

bot.catch((err, ctx) => {
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
});

let chatId = CHAT_ID;

// Sockets
connectToSocket('whitebit', 'wss://api.whitebit.com/ws');
// connectToSocket('bitfinex', 'wss://api-pub.bitfinex.com/ws/2');

// Commands
bot.start((ctx) => {
  chatId = ctx.chat.id;
  console.log(chatId);
  startBot(ctx);
});

stop(bot);
help(bot);
depth(bot);
serviceMessages(bot);

// Actions
whitebitDepth(bot);
goBack(bot);
deleteMessage(bot);

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
