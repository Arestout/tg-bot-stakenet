const generateAmount = (amount, toFixedValue) => {
  return Number(amount).toLocaleString('en-US', {
    minimumFractionDigits: toFixedValue,
    maximumFractionDigits: toFixedValue,
  });
};

module.exports = generateAmount;
