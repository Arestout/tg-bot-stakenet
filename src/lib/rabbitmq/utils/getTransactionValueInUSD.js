const apiRequest = require('../../../shared/apiRequest');
const generateAmount = require('../../../shared/generateAmount');

const getTransactionValueInUSD = async (transactionValue) => {
  const hdxTickerInfo = await apiRequest('https://whitebit.com/api/v4/public/trades/HDX_USDT');
  const priceInUSD = hdxTickerInfo[0].price;
  const transactionValueInUSD = generateAmount(priceInUSD * transactionValue, 2);

  return transactionValueInUSD;
};

module.exports = getTransactionValueInUSD;
