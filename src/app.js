const { Telegraf } = require('telegraf');
const Telegram = require('telegraf/telegram');
const WebSocket = require('ws');
const express = require('express');

const { TELEGRAM_TOKEN, PORT } = require('./config');

const bot = new Telegraf(TELEGRAM_TOKEN);
const telegram = new Telegram(TELEGRAM_TOKEN);
const webSocket = new WebSocket('wss://api.whitebit.com/ws');
const expressApp = express();

const startBot = require('./commands/start');
const help = require('./commands/help');
const depth = require('./commands/depth');

const goBack = require('./actions/goBack');
const whitebitDepth = require('./actions/whitebitDepth');
const deleteMessage = require('./actions/deleteMessage');

const { keepAlive, cancelKeepAlive } = require('./utils/keepAlive');
const sendWhitebitMessage = require('./exchanges/whitebit/sendMessage');

expressApp.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

bot.catch((err, ctx) => {
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
});

let chatId;

// Commands
bot.start((ctx) => {
  chatId = ctx.chat.id;
  startBot(ctx, webSocket);
});
help(bot);
depth(bot);

// Actions
whitebitDepth(bot);
goBack(bot);
deleteMessage(bot);

webSocket.on('open', function open() {
  keepAlive(webSocket);
  console.log('WebSocket opened');
});

webSocket.on('close', function close(code, reason) {
  cancelKeepAlive();
  console.log(`Disconnected: ${code} ${reason}`);
});

webSocket.on('error', function error(error) {
  console.log(error);
});

webSocket.on('message', async function incoming(data) {
  const parsedData = JSON.parse(data);

  if (parsedData.id === 0) {
    console.log(parsedData);
  }

  if (parsedData.params) {
    console.log(parsedData.params[1][0]);
    sendWhitebitMessage(telegram, parsedData.params[1][0]);
  }
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
