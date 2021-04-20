const generateMessage = (transaction) => {
  const { transactionAmount, transactionLink, priceInUSD } = transaction;
  const transactionValueInUSD = (priceInUSD * transactionAmount).toFixed(2);

  const message = `
      '&#x1f40b;' WHALE ALERT '&#x1f40b;'
  
      ${Number(transactionValue).toFixed(2)} XSN 
      were just moved!
      Total value: ${transactionValueInUSD} $
  
      | <a href=${transactionLink}>Transaction</a> |`;

  return message;
};

module.exports = generateMessage;
