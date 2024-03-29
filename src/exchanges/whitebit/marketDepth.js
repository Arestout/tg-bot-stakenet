const apiRequest = require('../../shared/apiRequest');

const HOSTNAME = 'https://whitebit.com';
const API_PATH = '/api/v4/public/orderbook/HDX_USDT';

const whitebitDepth = {
  5: true,
  10: true,
  20: true,
  50: true,
  100: true,
};

const getWhitebitMarketDepth = async (depth) => {
  const marketDepth = Number(depth) in whitebitDepth ? Number(depth) : 50;
  const url = `${HOSTNAME}${API_PATH}?depth=${marketDepth}&level=2`;

  try {
    const data = await apiRequest(url);

    const marketDepth = {
      asks: data.asks,
      bids: data.bids,
      exchange: 'Whitebit',
      currency: 'USDT',
    };

    return marketDepth;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

const getWhitebitMarketDepthSocket = async (depth) => {
  const marketDepth = Number(depth) in whitebitDepth ? Number(depth) : 50;

  const marketDepthRequest = {
    id: 11,
    method: 'depth_request',
    params: ['HDX_USDT', marketDepth, '2'],
  };

  webSocket.send(JSON.stringify(marketDepthRequest));
};

module.exports = getWhitebitMarketDepth;
