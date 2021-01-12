const {
  subscribeToMarketTrades,
} = require('../exchanges/whitebit/marketTrades');

const startBot = (ctx, webSocket) => {
  subscribeToMarketTrades(webSocket);
  console.log('Bot has started');
  ctx.reply('Bot has started!');
};

module.exports = startBot;
