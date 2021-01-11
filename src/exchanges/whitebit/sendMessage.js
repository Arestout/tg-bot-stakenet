const { addToCache, checkCache } = require('../../utils/cache');

const generateEmoji = (type, tradeValue, minValue) => {
  const emojiType = type === 'sell' ? '&#x1F534;' : '&#x1F7E2';
  const repeatCount = Math.floor(tradeValue / minValue);
  const emoji = emojiType.repeat(repeatCount);

  return emoji;
};

const sendWhitebitMessage = (telegram, parsedData) => {
  const { price, amount, type } = parsedData;
  const minValue = 100;
  const tradeValue = (price * amount).toFixed(2);

  if (price * tradeValue < minValue) {
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
    
    ${amount} XSN - ${type === 'sell' ? 'sold' : 'bought'} for - ${price} USDT
    Total value: ${tradeValue} $

    <a href="https://whitebit.com/trade/XSN_USDT">Whitebit</a>
    `;
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
