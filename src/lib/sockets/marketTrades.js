const subscribeRequestCollection = {
  whitebit: {
    id: 9,
    method: 'trades_subscribe',
    params: ['HDX_USDT'],
  },
  bitfinex: {
    event: 'subscribe',
    channel: 'trades',
    symbol: 'tXSNUSD',
  },
};

const subscribeToMarketTrades = (exchange, webSocket) => {
  const subscribeRequest = subscribeRequestCollection[exchange];

  webSocket.send(JSON.stringify(subscribeRequest));
};

module.exports = subscribeToMarketTrades;
