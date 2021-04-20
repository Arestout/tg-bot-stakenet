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
      queues: ['transactions_queue'],
      // bindings: [
      //   'transactions_exchange[whale_transaction] -> transactions_queue',
      //   'transactions_exchange[burn_transaction] -> transactions_queue',
      // ],
      // publications: {
      //   bot_publisher: {
      //     vhost: 'v1',
      //     exchange: 'transactions_exchange',
      //     routingKey: 'burn_transaction',
      //   },
      // },
      subscriptions: {
        exchange_bot_subscriber: {
          queue: 'transactions_queue',
          prefetch: 1,
        },
      },
    },
  },
};
