const { addToCache, checkCache } = require('./cache');
const { MIN_VALUE } = require('../config');

const generateEmoji = (type, tradeValue, minValue) => {
  const emojiType = type === 'sell' ? '&#x1F534;' : '&#x1F7E2';
  const repeatCount = Math.floor(tradeValue / minValue);
  const emoji = emojiType.repeat(repeatCount);

  return emoji;
};

const sendMessage = (telegram, chatId, parsedData) => {
  const { id, price, amount, type, exchange = 'Whitebit' } = parsedData;
  const minValue = Number(MIN_VALUE);
  const tradeValue = (price * amount).toFixed(2);

  if (tradeValue < minValue) {
    return;
  }

  if (checkCache(id)) {
    return;
  }

  addToCache(id);

  const emoji = generateEmoji(type, tradeValue, minValue);
  const currency = exchange === 'Whitebit' ? 'USDT' : 'USD';
  const response = `
  ${type.toUpperCase()} TRANSACTION on ${exchange}

    ${emoji}
    
    ${Number(amount).toFixed(2)} XSN - ${
    type === 'sell' ? 'sold' : 'bought'
  } for - ${Number(price).toFixed(3)} ${currency}
    Total value: ${tradeValue} $

    | <a href="https://whitebit.com/trade/XSN_USDT">Whitebit</a> | <a href="https://trading.bitfinex.com/t/XSN:USD">Bitfinex</a> |`;

  telegram.sendMessage(chatId, response, {
    parse_mode: 'HTML',
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Bitfinex USD market depth', callback_data: 'bitfinex-usd' }],
        [
          {
            text: 'Whitebit USDT market depth',
            callback_data: 'whitebit-usdt',
          },
        ],
      ],
    },
  });
};

module.exports = sendMessage;
