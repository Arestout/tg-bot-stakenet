const http = require('http');
const axios = require('axios');

const timeout = 50000;
const { SERVER_LINK, PORT } = require('../../config');

const startServer = () => {
  http.createServer((req, res) => res.end('Hello World!')).listen(PORT);

  function keepServerRunning() {
    axios.get(SERVER_LINK).catch((err) => console.log(err.message));
    console.log('check');
    setTimeout(keepServerRunning, timeout);
  }
  keepServerRunning();
};

module.exports = startServer;
