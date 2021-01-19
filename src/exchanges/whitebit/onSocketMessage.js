const sendMessage = require('../../shared/sendMessage');

const onSocketMessageWhitebit = (telegram, chatId, parsedData) => {
  if (parsedData.id === 0 || parsedData.id === 10) {
    console.log(parsedData);
  }

  if (parsedData.params) {
    console.log(parsedData.params[1][0]);

    sendMessage(telegram, chatId, parsedData.params[1][0]);
  }
};

module.exports = onSocketMessageWhitebit;
