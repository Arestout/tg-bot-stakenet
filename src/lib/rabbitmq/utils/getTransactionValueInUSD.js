const apiRequest = require('../../../shared/apiRequest');
const generateAmount = require('../../../shared/generateAmount');

const getTransactionValueInUSD = async (transactionValue) => {
  const xsnTickerInfo = await apiRequest(
    'https://api-pub.bitfinex.com/v2/ticker/tXSNUSD'
  );
  const priceInUSD = xsnTickerInfo[6]; // LAST_PRICE
  const transactionValueInUSD = generateAmount(
    priceInUSD * transactionValue,
    2
  );

  return transactionValueInUSD;
};

module.exports = getTransactionValueInUSD;
