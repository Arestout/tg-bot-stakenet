const {
  unsubscribeFromMarketTrades,
} = require('../exchanges/whitebit/marketTrades');

const stop = (bot, webSocket) => {
  bot.command('stop', (ctx) => {
    unsubscribeFromMarketTrades(webSocket);
    ctx.reply('Bot has stopped');
  });
};

module.exports = stop;
