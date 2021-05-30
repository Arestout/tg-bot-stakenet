const generateWhaleTransactionMessage = (content) => {
  const { transactionValue, transactionId, transactionValueInUSD } = content;

  const message = `
&#x1f40b;  WHALE ALERT  &#x1f40b;
  
${Number(transactionValue).toFixed(2)} XSN have been moved!
Total value: ${transactionValueInUSD} $
  
| <a href='https://xsnexplorer.io/transactions/${transactionId}'>Transaction</a> |`;

  return message;
};

module.exports = generateWhaleTransactionMessage;
