const sendMessage = require('../../shared/sendMessage');

const onSocketMessageWhitebit = (telegram, chatId, parsedData) => {
  if (parsedData.id === 0 || parsedData.id === 10) {
    console.log(parsedData);
  }

  if (parsedData.params) {
    console.log(parsedData.params[1][0]);

    const data = {
      id: parsedData.params[1][0].id,
      price: parsedData.params[1][0].price,
      amount: parsedData.params[1][0].amount,
      type: parsedData.params[1][0].type,
      exchange: 'Whitebit',
    };

    sendMessage(telegram, chatId, data);
  }
};

module.exports = onSocketMessageWhitebit;
