const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

module.exports = {
  TELEGRAM_TOKEN:
    process.env.NODE_ENV === 'development'
      ? process.env.TELEGRAM_TEST_TOKEN
      : process.env.TELEGRAM_TOKEN,
  PORT: process.env.PORT || 5000,
  CHAT_ID:
    process.env.NODE_ENV === 'development'
      ? process.env.CHAT_TEST_ID
      : process.env.CHAT_ID,
  SERVER_LINK: process.env.SERVER_LINK,
  MIN_VALUE: process.env.MIN_VALUE,
};
