const generateWhaleTransactionMessage = (content) => {
  const { transactionAmount, transactionHash, transactionValueInUSD } = content;

  const message = `
'&#x1f40b;'  WHALE ALERT  '&#x1f40b;'
  
${Number(transactionAmount).toFixed(2)} XSN have been moved!
Total value: ${transactionValueInUSD} $
  
| <a href='https://xsnexplorer.io/transactions/${transactionHash}'>Transaction</a> |`;

  return message;
};

module.exports = generateWhaleTransactionMessage;
