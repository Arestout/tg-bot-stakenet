const deleteMessage = (bot) => {
  bot.action('delete-message', (ctx) => {
    ctx.deleteMessage();
  });
};

module.exports = deleteMessage;
