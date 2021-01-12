const subscribeToMarketTrades = (webSocket) => {
  const subscribeRequest = {
    id: 9,
    method: 'trades_subscribe',
    params: ['XSN_USDT'],
  };

  webSocket.send(JSON.stringify(subscribeRequest));
};

const unsubscribeFromMarketTrades = (webSocket) => {
  const unsubscribeRequest = {
    id: 10,
    method: 'trades_unsubscribe',
    params: [],
  };

  webSocket.send(JSON.stringify(unsubscribeRequest));
};

module.exports = { subscribeToMarketTrades, unsubscribeFromMarketTrades };
