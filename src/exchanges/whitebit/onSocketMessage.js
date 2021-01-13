const sendWhitebitMessage = require('./sendMessage');

const onSocketMessage = (telegram, chatId, parsedData) => {
  if (parsedData.id === 0 || parsedData.id === 10) {
    console.log(parsedData);
  }

  if (parsedData.params) {
    console.log(parsedData.params[1][0]);

    sendWhitebitMessage(telegram, chatId, parsedData.params[1][0]);
  }
};

module.exports = onSocketMessage;
