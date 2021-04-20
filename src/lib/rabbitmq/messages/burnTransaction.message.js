const generateBurnTransactionMessage = (content) => {
  const { transactionAmount, transactionHash, transactionValueInUSD } = content;

  const message = `
&#x1f525;  BURN ALERT  &#x1f525;
    
${Number(transactionAmount).toFixed(2)} XSN ${
    transactionAmount <= 1 ? 'has' : 'have'
  } been burned!
Total value: ${transactionValueInUSD} $
    
| <a href='https://xsnexplorer.io/transactions/${transactionHash}'>Transaction</a> |`;

  return message;
};

module.exports = generateBurnTransactionMessage;
