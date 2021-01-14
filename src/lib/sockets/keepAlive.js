let timerId;

const pingRequestCollections = {
  whitebit: {
    id: 0,
    method: 'ping',
    params: [],
  },
  bitfinex: {
    event: 'ping',
    cid: 1234,
  },
};

function keepAlive(exchange, webSocket) {
  const timeout = 50000;
  const pingRequest = pingRequestCollections[exchange];
  console.log('pingRequest: ', pingRequest);

  if (webSocket.readyState == 1) {
    webSocket.send(JSON.stringify(pingRequest));
  }

  timerId = setTimeout(keepAlive.bind(this, exchange, webSocket), timeout);
}

function cancelKeepAlive() {
  if (timerId) {
    clearTimeout(timerId);
  }
}

module.exports = { keepAlive, cancelKeepAlive };
