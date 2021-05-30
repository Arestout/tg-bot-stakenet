const apiRequest = require('../../../shared/apiRequest');

const getTransactionValueInUSD = async (transactionValue) => {
  const xsnTickerInfo = await apiRequest(
    'https://api-pub.bitfinex.com/v2/ticker/tXSNUSD'
  );
  const priceInUSD = xsnTickerInfo[6]; // LAST_PRICE
  const transactionValueInUSD = (priceInUSD * transactionValue).toFixed(2);

  return transactionValueInUSD;
};

module.exports = getTransactionValueInUSD;
