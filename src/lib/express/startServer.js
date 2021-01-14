const express = require('express');
const axios = require('axios');

const expressApp = express();
const timeout = 50000;
const { SERVER_LINK, PORT } = require('../../config');

const startServer = () => {
  expressApp.get('/', (req, res) => {
    res.send('Hello World!');
  });

  expressApp.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

  function keepServerRunning() {
    axios.get(SERVER_LINK).catch((err) => console.log(err.message));
    console.log('check');
    setTimeout(keepServerRunning, timeout);
  }
  keepServerRunning();
};

module.exports = startServer;
