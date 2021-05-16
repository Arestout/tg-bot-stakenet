const { telegram, chatId } = require('../config/telegram');

const sendMessage = async (message) => {
  await telegram.sendMessage(chatId, message, {
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
