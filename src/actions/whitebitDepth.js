const getWhitebitMarketDepth = require('../exchanges/whitebit/marketDepth');
const convertToImage = require('../lib/htmlToImage');

const whitebitUsdtDepth = (bot) => {
  bot.action('whitebit-usdt', async (ctx) => {
    isFetching = false;

    if (isFetching) {
      return;
    }

    try {
      const { message_id } = await ctx.reply('Loading market depth...');
      isFetching = true;
      const response = await getWhitebitMarketDepth();
      const image = await convertToImage(response);

      ctx.deleteMessage(message_id);

      return ctx.replyWithPhoto({ source: image });
    } catch (error) {
      console.log(error.message);
      ctx.reply('Something went wrong, please try again');
    } finally {
      isFetching = false;
    }
  });
};

module.exports = whitebitUsdtDepth;
