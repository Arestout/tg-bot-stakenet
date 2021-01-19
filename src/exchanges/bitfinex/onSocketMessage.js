const sendMessage = require('../../shared/sendMessage');

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

const onSocketMessageBitfinex = (telegram, chatId, parsedData) => {
  if (parsedData.event && parsedData.pair === 'XSNUSD') {
    channelUSDid = parsedData.chanId;
    return;
  }

  if (parsedData.event && parsedData.event === 'pong') return;
  if (parsedData.event && parsedData.event === 'info') return;
  if (parsedData.length < 3) return;

  console.log(parsedData);

  const [id, messageType, trade] = parsedData;
  const [amount, price] = trade.splice(2);
  const type = amount > 0 ? 'buy' : 'sell';

  const data = {
    id,
    price,
    amount: Math.abs(amount),
    type,
    exchange: 'Bitfinex',
  };
  if (id === channelUSDid && messageType === 'tu') {
    sendMessage(telegram, chatId, data);
  }
};

module.exports = onSocketMessageBitfinex;
