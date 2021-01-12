let timerId;

const pingRequest = {
  id: 0,
  method: 'ping',
  params: [],
};

function keepAlive(webSocket) {
  const timeout = 50000;
  fetch('https://arcane-fjord-86920.herokuapp.com/');
  webSocket.send(JSON.stringify(pingRequest));
  timerId = setTimeout(keepAlive.bind(this, webSocket), timeout);
}

function cancelKeepAlive() {
  if (timerId) {
    clearTimeout(timerId);
  }
}

module.exports = { keepAlive, cancelKeepAlive };
