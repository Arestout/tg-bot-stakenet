const { Telegraf } = require('telegraf');
const express = require('express');

const { TELEGRAM_TOKEN, PORT, CHAT_ID } = require('./config');

const bot = new Telegraf(TELEGRAM_TOKEN);
const expressApp = express();

const startBot = require('./commands/start');
const help = require('./commands/help');
const depth = require('./commands/depth');
const stop = require('./commands/stop');
const serviceMessages = require('./commands/serviceMessages');

const goBack = require('./actions/goBack');
const whitebitDepth = require('./actions/whitebitDepth');
const deleteMessage = require('./actions/deleteMessage');

const connectToSocket = require('./lib/sockets/connect');

expressApp.get('/', (req, res) => {
  res.send('Hello World!');
});

expressApp.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

bot.catch((err, ctx) => {
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
});

let chatId = CHAT_ID;

// Sockets
connectToSocket('whitebit', 'wss://api.whitebit.com/ws');

// Commands
bot.start((ctx) => {
  chatId = ctx.chat.id;
  console.log(chatId);
  startBot(ctx, webSocket);
});
bot.command('stop', (ctx) => {
  stop(webSocket, ctx);
});
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
