const getWhitebitMarketDepth = require('../exchanges/whitebit/marketDepth');
const getBitfinexMarketDepth = require('../exchanges/bitfinex/marketDepth');
const convertToImage = require('../lib/htmlToImage');

const markets = new Map([
  ['whitebit-usdt', getWhitebitMarketDepth],
  ['bitfinex-usd', getBitfinexMarketDepth],
]);

const marketDepth = (bot) => {
  bot.action(['whitebit-usdt', 'bitfinex-usd'], async (ctx) => {
    const { match: market } = ctx;

    let isFetching = false;

    if (isFetching) {
      return;
    }

    try {
      const { message_id } = await ctx.reply(
        `Loading ${market} market depth...`
      );

      isFetching = true;
      const getMarketData = markets.get(market);
      const response = await getMarketData();
      const image = await convertToImage(response);

      ctx.deleteMessage(message_id);

      return ctx.replyWithPhoto({ source: image });
    } catch (error) {
      console.log(error.message);
      ctx.reply('Something went wrong, please try again');
    } finally {
      setTimeout(() => (isFetching = false), 1000);
    }
  });
};

module.exports = marketDepth;
