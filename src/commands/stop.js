const stop = (bot) => {
  bot.command('stop', (ctx) => {
    console.log('Bot has stopped');
    ctx.reply('Bot has stopped');
  });
};

module.exports = stop;
