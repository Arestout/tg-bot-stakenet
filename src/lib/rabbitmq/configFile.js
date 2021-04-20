const { RABBITMQ_HOST } = require('../../config/config');

module.exports = {
  vhosts: {
    v1: {
      connection: {
        url: RABBITMQ_HOST,
        heartbeat: 1,
        socketOptions: {
          timeout: 1000,
        },
      },
      // exchanges: ['transactions_exchange'],
      queues: ['whale_transactions_queue'],
      // bindings: [
      //   'transactions_exchange[whale_transaction] -> whale_transactions_queue',
      // ],
      // publications: {
      //   bot_publisher: {
      //     vhost: 'v1',
      //     exchange: 'transactions_exchange',
      //     routingKey: 'whale_transaction',
      //   },
      // },
      subscriptions: {
        exchange_bot_subscriber: {
          queue: 'whale_transactions_queue',
          prefetch: 1,
        },
      },
    },
  },
};
