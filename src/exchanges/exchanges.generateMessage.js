const cache = require('../shared/cache');
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
  const tradeValue = (price * amount).toFixed(2);

  if (tradeValue < minValue) {
    return;
  }

  if (cache.get(id + amount)) {
    return;
  }

  cache.set(id + amount);

  const emoji = generateEmoji(type, tradeValue, minValue);
  const currency = exchange === 'Whitebit' ? 'USDT' : 'USD';
  const message = `
  ${type.toUpperCase()} TRANSACTION on ${exchange}

${emoji}
    
${Number(amount).toFixed(2)} XSN - ${
    type === 'sell' ? 'sold' : 'bought'
  } for - ${Number(price).toFixed(3)} ${currency}            
Total value: ${tradeValue} $

| <a href="https://whitebit.com/trade/XSN_USDT">Whitebit</a> | <a href="https://trading.bitfinex.com/t/XSN:USD">Bitfinex</a> |`;

  return message;
};

module.exports = generateMessage;
