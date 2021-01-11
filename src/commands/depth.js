const depth = (bot) => {
  bot.command('d', async (ctx) => {
    const commandWithMessage = ctx.message.text;
    const message = commandWithMessage.split(' ')[1];
    const depth = commandWithMessage.split(' ')[2];

    if (message.toLowerCase() !== 'usdt') {
      return ctx.reply('Wrong command, you dummy.');
    }

    try {
      const response = await getWhitebitData(depth);
      const image = await convertToImage(response);
      return ctx.replyWithPhoto({ source: image });
    } catch (error) {
      console.log(error.message);
      ctx.reply('Something went wrong, please try again');
    }
  });

  bot.command('depth', (ctx) => {
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

module.exports = depth;
