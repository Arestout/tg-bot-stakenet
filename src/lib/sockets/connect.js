const Telegram = require('telegraf/telegram');
const WebSocket = require('ws');

const { CHAT_ID, TELEGRAM_TOKEN } = require('../../config');
const subscribeToMarketTrades = require('./marketTrades');
const onSocketMessageWhitebit = require('../../exchanges/whitebit/onSocketMessage');
const { keepAlive, cancelKeepAlive } = require('./keepAlive');
const telegram = new Telegram(TELEGRAM_TOKEN);

const chatId = CHAT_ID;

const connectToSocket = (exchange, address) => {
  const webSocket = new WebSocket(address);

  webSocket.on('open', function open() {
    console.log(`${exchange} socket opened`);
    keepAlive(exchange, webSocket);
    subscribeToMarketTrades(exchange, webSocket);
  });

  webSocket.on('error', function error(error) {
    console.log(`${exchange} socket error ${error.message}`);
  });

  webSocket.on('close', function close(code, reason) {
    console.log(`${exchange} socket disconnected: ${code} ${reason}`);
    cancelKeepAlive();
    setTimeout(() => connectToSocket(exchange, address), 1000);
  });

  webSocket.on('message', async function incoming(data) {
    const parsedData = JSON.parse(data);

    const onMessageHandlers = new Map();
    onMessageHandlers.set('whitebit', onSocketMessageWhitebit);
    onMessageHandlers.set('bitfinex', () => console.log(data));
    const onMessage = onMessageHandlers.get(exchange);

    onMessage(telegram, chatId, parsedData);
  });
};

module.exports = connectToSocket;
