const apiRequest = require('../../../shared/apiRequest');
const sendMessage = require('../../../shared/sendMessage');

const whaleTransactionHandler = async (content) => {
  const { transactionAmount, transactionHash } = content;
  const xsnTickerInfo = await apiRequest(
    'https://api-pub.bitfinex.com/v2/ticker/tXSNUSD'
  );
  const priceInUSD = xsnTickerInfo[6]; // LAST_PRICE
  const transactionValueInUSD = (priceInUSD * transactionAmount).toFixed(2);

  const message = `
        '&#x1f40b;'  WHALE ALERT  '&#x1f40b;'
    
        ${Number(transactionAmount).toFixed(2)} XSN have been moved!
        Total value: ${transactionValueInUSD} $
    
        | <a href='https://xsnexplorer.io/transactions/${transactionHash}'>Transaction</a> |`;

  sendMessage(message);
};

module.exports = whaleTransactionHandler;
