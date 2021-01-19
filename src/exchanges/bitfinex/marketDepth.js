const axios = require('axios');

/*
Bitfinex response
[
  [
    PRICE,
    COUNT,
    AMOUNT
  ],
  ...
]

if AMOUNT > 0 then bid else ask

1. Remove count from array
2. add first half to bids and second half to asks

*/

const getBitfinexMarketDepth = async (market = 'tXSNUSD') => {
  const API_PATH = `https://api-pub.bitfinex.com/v2/book/${market}/P0?len=100`;

  try {
    const { data } = await axios.get(API_PATH);
    const modifiedData = data.map((item) => [item[0], item[2]]);
    const currency = market.slice(-3);

    const marketDepth = {
      bids: modifiedData.slice(0, 99),
      asks: modifiedData.slice(100),
      exchange: 'Bitfinex',
      currency,
    };

    return marketDepth;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

module.exports = getBitfinexMarketDepth;
