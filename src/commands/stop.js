const {
  unsubscribeFromMarketTrades,
} = require('../exchanges/whitebit/marketTrades');

const stop = (webSocket, ctx) => {
  unsubscribeFromMarketTrades(webSocket);
  console.log('Bot has stopped');
  ctx.reply('Bot has stopped');
};

module.exports = stop;
