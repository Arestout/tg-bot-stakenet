const { RABBITMQ_HOST } = require('../../config/config');

module.exports = {
  vhosts: {
    lsgwaoxk: {
      connection: {
        url: RABBITMQ_HOST,
        heartbeat: 1,
        socketOptions: {
          timeout: 3000,
        },
      },
      queues: ['transactions_queue'],
      subscriptions: {
        exchange_bot_subscriber: {
          queue: 'transactions_queue',
          prefetch: 1,
        },
      },
    },
  },
};
