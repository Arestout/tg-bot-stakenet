const cache = require('../shared/cache');
const generateAmount = require('../shared/generateAmount');
const { MIN_VALUE } = require('../config');

const generateEmoji = (type, tradeValue, minValue) => {
  const emojiType = type === 'sell' ? '&#x1F534;' : '&#x1F7E2';
  const repeatCount = Math.floor(tradeValue / minValue);
  const emoji = emojiType.repeat(repeatCount);

  return emoji;
};

const generateMessage = (parsedData) => {
  const { id, price, amount, type, exchange } = parsedData;
  const minValue = Number(MIN_VALUE);
  const tradeValue = generateAmount(price * amount, 2);

  if (tradeValue < minValue) {
    return;
  }

  if (cache.get(id + amount)) {
    return;
  }

  cache.set(id + amount);

  const emoji = generateEmoji(type, tradeValue, minValue);
  const currency = exchange === 'Whitebit' ? 'USDT' : 'USD';
  const currentAmount = generateAmount(amount, 2);
  const currentPrice = generateAmount(price, 3);
  const message = `
  ${type.toUpperCase()} TRANSACTION on ${exchange}

${emoji}
    
${currentAmount} XSN - ${
    type === 'sell' ? 'sold' : 'bought'
  } for - ${currentPrice} ${currency}            
Total value: ${tradeValue} $

| <a href="https://whitebit.com/trade/XSN_USDT">Whitebit</a> | <a href="https://trading.bitfinex.com/t/XSN:USD">Bitfinex</a> |`;

  return message;
};

module.exports = generateMessage;
