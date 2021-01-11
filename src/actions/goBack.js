const goBack = (bot) => {
  bot.action('go-back', (ctx) => {
    ctx.deleteMessage();
    ctx.telegram.sendMessage(
      ctx.chat.id,
      'XSN market depth. Choose your exchange and pair.',
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Whitebit USDT', callback_data: 'whitebit-usdt' }],
          ],
        },
      }
    );
  });
};

module.exports = goBack;
