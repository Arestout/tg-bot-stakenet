const sendMessage = require('../../shared/sendMessage');
const generateMessage = require('../exchanges.generateMessage');

/* 
[
  CHANNEL_ID,
  <"te", "tu">,
  [
    ID,
    MTS,
    AMOUNT,
    PRICE
  ]
]

Amount bought (positive) or sold (negative).
*/

let channelUSDid;

const onSocketMessageBitfinex = (parsedData) => {
  if (parsedData.event && parsedData.pair === 'XSNUSD') {
    channelUSDid = parsedData.chanId;
    return;
  }

  if (parsedData.event && parsedData.event === 'pong') return;
  if (parsedData.event && parsedData.event === 'info') return;
  if (parsedData.length < 3) return;

  const [id, messageType, trade] = parsedData;

  if (id === channelUSDid && messageType === 'tu') {
    const [amount, price] = trade.splice(2);
    const type = amount > 0 ? 'buy' : 'sell';
    const data = {
      id,
      price,
      amount: Math.abs(amount),
      type,
      exchange: 'Bitfinex',
    };

    const message = generateMessage(data);

    if (message) {
      sendMessage(message);
    }
  }
};

module.exports = onSocketMessageBitfinex;
