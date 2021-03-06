const WebSocket = require('ws');

const subscribeToMarketTrades = require('./marketTrades');
const onSocketMessageWhitebit = require('../../exchanges/whitebit/onSocketMessage');
const onSocketMessageBitfinex = require('../../exchanges/bitfinex/onSocketMessage');
const { keepAlive, cancelKeepAlive } = require('./keepAlive');

const onMessageHandlers = new Map([
  ['whitebit', onSocketMessageWhitebit],
  ['bitfinex', onSocketMessageBitfinex],
]);

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
    const onMessageHandler = onMessageHandlers.get(exchange);

    if (onMessageHandler) {
      onMessageHandler(parsedData);
    }
  });
};

module.exports = connectToSocket;
