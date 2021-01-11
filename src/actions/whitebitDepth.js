const getWhitebitMarketDepth = require('../exchanges/whitebit/marketDepth');
const convertToImage = require('../lib/htmlToImage');

const whitebitUsdtDepth = (bot) => {
  bot.action('whitebit-usdt', async (ctx) => {
    try {
      const response = await getWhitebitMarketDepth();
      const image = await convertToImage(response);

      return ctx.replyWithPhoto({ source: image });
    } catch (error) {
      console.log(error.message);
      ctx.reply('Something went wrong, please try again');
    }
  });
};

module.exports = whitebitUsdtDepth;
