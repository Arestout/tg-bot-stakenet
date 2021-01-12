const { Telegraf } = require('telegraf');
const Telegram = require('telegraf/telegram');
const WebSocket = require('ws');
const express = require('express');

const { TELEGRAM_TOKEN, PORT } = require('./config');

const bot = new Telegraf(TELEGRAM_TOKEN);
const telegram = new Telegram(TELEGRAM_TOKEN);
const expressApp = express();

const startBot = require('./commands/start');
const help = require('./commands/help');
const depth = require('./commands/depth');
const stop = require('./commands/stop');

const goBack = require('./actions/goBack');
const whitebitDepth = require('./actions/whitebitDepth');
const deleteMessage = require('./actions/deleteMessage');

const { keepAlive, cancelKeepAlive } = require('./utils/keepAlive');
const sendWhitebitMessage = require('./exchanges/whitebit/sendMessage');
const {
  subscribeToMarketTrades,
} = require('./exchanges/whitebit/marketTrades');

expressApp.get('/', (req, res) => {
  res.send('Hello World!');
});

expressApp.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

bot.catch((err, ctx) => {
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
});

let chatId;
let webSocket;

const connect = () => {
  webSocket = new WebSocket('wss://api.whitebit.com/ws');

  webSocket.on('open', function open() {
    console.log('WebSocket opened');
    keepAlive(webSocket);
    subscribeToMarketTrades(webSocket);
  });
  webSocket.on('error', function error(error) {
    console.log('socket error ' + error.message);
  });
  webSocket.on('close', function close(code, reason) {
    console.log(`Disconnected: ${code} ${reason}`);
    cancelKeepAlive();
    setTimeout(connect, 1000);
  });
};
connect();

// Commands
bot.start((ctx) => {
  chatId = ctx.chat.id;
  console.log(chatId);
  startBot(ctx, webSocket);
});
bot.command('stop', (ctx) => {
  stop(webSocket, ctx);
});
bot.on('new_chat_members', (ctx) => console.log('new members'));
bot.on('left_chat_member', (ctx) => console.log('left members'));
help(bot);
depth(bot);

// Actions
whitebitDepth(bot);
goBack(bot);
deleteMessage(bot);

webSocket.on('message', async function incoming(data) {
  const parsedData = JSON.parse(data);

  if (parsedData.id === 0 || parsedData.id === 10) {
    console.log(parsedData);
  }

  if (parsedData.params) {
    console.log(parsedData.params[1][0]);

    sendWhitebitMessage(telegram, chatId, parsedData.params[1][0]);
  }
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
