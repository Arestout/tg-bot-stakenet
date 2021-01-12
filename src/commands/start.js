const {
  subscribeToMarketTrades,
} = require('../exchanges/whitebit/marketTrades');

const startBot = (ctx, webSocket) => {
  subscribeToMarketTrades(webSocket);
  ctx.reply('Bot has started!');
};

module.exports = startBot;
