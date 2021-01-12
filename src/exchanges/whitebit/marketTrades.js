const subscribeToMarketTrades = (webSocket) => {
  const subscribeRequest = {
    id: 9,
    method: 'trades_subscribe',
    params: ['XSN_USDT'],
  };
  const timeout = 100;
  let timerId;
  console.log(webSocket.readyState);
  if (webSocket.readyState != 1) {
    timerId = setTimeout(
      subscribeToMarketTrades.bind(this, webSocket),
      timeout
    );
    return;
  }

  if (timerId) {
    clearTimeout(timerId);
  }
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
