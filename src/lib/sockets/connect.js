const Telegram = require('telegraf/telegram');
const WebSocket = require('ws');

const { CHAT_ID, TELEGRAM_TOKEN } = require('../../config');
const {
  subscribeToMarketTrades,
} = require('../../exchanges/whitebit/marketTrades');
const onSocketMessage = require('../../exchanges/whitebit/onSocketMessage');
const { keepAlive, cancelKeepAlive } = require('../../utils/keepAlive');
const telegram = new Telegram(TELEGRAM_TOKEN);

const chatId = CHAT_ID;

const connectToSocket = (exchange, address) => {
  const webSocket = new WebSocket(address);

  webSocket.on('open', function open() {
    console.log(`${exchange} socket opened`);
    keepAlive(webSocket);

    switch (exchange) {
      case 'whitebit':
        return subscribeToMarketTrades(webSocket);
    }
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

    switch (exchange) {
      case 'whitebit':
        return onSocketMessage(telegram, chatId, parsedData);
    }
  });
};

module.exports = connectToSocket;
