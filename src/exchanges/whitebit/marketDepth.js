const axios = require('axios');

const HOSTNAME = 'https://whitebit.com';
const API_PATH = '/api/v4/public/orderbook/XSN_USDT';

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
    const { data } = await axios.get(url);

    return data;
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
    params: ['XSN_USDT', marketDepth, '2'],
  };

  webSocket.send(JSON.stringify(marketDepthRequest));
};

module.exports = getWhitebitMarketDepth;
