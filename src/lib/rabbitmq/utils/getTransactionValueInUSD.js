const apiRequest = require('../../../shared/apiRequest');

const getTransactionValueInUSD = async (content) => {
  const { transactionAmount } = content;

  const xsnTickerInfo = await apiRequest(
    'https://api-pub.bitfinex.com/v2/ticker/tXSNUSD'
  );
  const priceInUSD = xsnTickerInfo[6]; // LAST_PRICE
  const transactionValueInUSD = (priceInUSD * transactionAmount).toFixed(2);

  return { ...content, transactionValueInUSD };
};

module.exports = getTransactionValueInUSD;
