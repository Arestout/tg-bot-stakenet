const generateAmount = require('../../../shared/generateAmount');

const generateBurnTransactionMessage = (content) => {
  const { transactionValue, transactionId, transactionValueInUSD } = content;

  const message = `
&#x1f525;  BURN ALERT  &#x1f525;
    
${generateAmount(transactionValue, 2)} XSN ${
    transactionValue <= 1 ? 'has' : 'have'
  } been burned!
Total value: ${transactionValueInUSD} $
    
| <a href='https://xsnexplorer.io/transactions/${transactionId}'>Transaction</a> |`;

  return message;
};

module.exports = generateBurnTransactionMessage;
