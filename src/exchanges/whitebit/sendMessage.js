const { addToCache, checkCache } = require('../../utils/cache');
const { MIN_VALUE } = require('../../config');

const generateEmoji = (type, tradeValue, minValue) => {
  const emojiType = type === 'sell' ? '&#x1F534;' : '&#x1F7E2';
  const repeatCount = Math.floor(tradeValue / minValue);
  const emoji = emojiType.repeat(repeatCount);

  return emoji;
};

const sendWhitebitMessage = (telegram, chatId, parsedData) => {
  const { price, amount, type } = parsedData;
  const minValue = MIN_VALUE;
  const tradeValue = (price * amount).toFixed(2);

  if (tradeValue < minValue) {
    return;
  }

  if (checkCache(parsedData.id)) {
    return;
  }

  addToCache(parsedData.id);

  const emoji = generateEmoji(type, tradeValue, minValue);
  const response = `
  ${type.toUpperCase()} TRANSACTION

    ${emoji}
    
    ${Number(amount).toFixed(2)} XSN - ${
    type === 'sell' ? 'sold' : 'bought'
  } for - ${Number(price).toFixed(3)} USDT
    Total value: ${tradeValue} $

    <a href="https://whitebit.com/trade/XSN_USDT">Whitebit</a>`;

  telegram.sendMessage(chatId, response, {
    parse_mode: 'HTML',
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Market depth', callback_data: 'whitebit-usdt' }],
      ],
    },
  });
};

module.exports = sendWhitebitMessage;
