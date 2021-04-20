const sendMessage = require('../../shared/sendMessage');
const generateMessage = require('../exchanges.generateMessage');

const onSocketMessageWhitebit = (parsedData) => {
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

    const message = generateMessage(data);

    if (message) {
      sendMessage(message);
    }
  }
};

module.exports = onSocketMessageWhitebit;
