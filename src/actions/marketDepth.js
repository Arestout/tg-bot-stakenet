const getWhitebitMarketDepth = require('../exchanges/whitebit/marketDepth');
const getBitfinexMarketDepth = require('../exchanges/bitfinex/marketDepth');
const convertToImage = require('../lib/htmlToImage');

const FETCHING_TIMEOUT = 60000;

const markets = new Map([
  ['whitebit-usdt', getWhitebitMarketDepth],
  ['bitfinex-usd', getBitfinexMarketDepth],
]);

const fetchingMarkets = [];

const marketDepth = async (bot) => {
  bot.action(['whitebit-usdt', 'bitfinex-usd'], async (ctx) => {
    const { match: market } = ctx;

    if (fetchingMarkets.includes(market)) {
      return;
    }

    try {
      const { message_id } = await ctx.reply(
        `Loading ${market} market depth...`
      );

      fetchingMarkets.push(market);
      const getMarketData = markets.get(market);
      const response = await getMarketData();
      const image = await convertToImage(response);

      await ctx.replyWithPhoto({ source: image });

      return ctx.deleteMessage(message_id);
    } catch (error) {
      console.log(error.message);
      ctx.reply('Something went wrong, please try again');
    } finally {
      setTimeout(
        () => fetchingMarkets.splice(fetchingMarkets.indexOf(market)),
        FETCHING_TIMEOUT
      );
    }
  });
};

module.exports = marketDepth;
