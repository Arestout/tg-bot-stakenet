const Broker = require('rascal').BrokerAsPromised;
const config = require('./configFile');

const whaleTransactionHandler = require('./handlers/whalteTransaction.handler');

const handlers = new Map([['whale_transaction', whaleTransactionHandler]]);

async function initRabbitMQ() {
  try {
    const broker = await Broker.create(config);
    broker.on('error', console.error);

    // Consume a message
    const subscription = await broker.subscribe('exchange_bot_subscriber');
    subscription
      .on('message', (message, content, ackOrNack) => {
        // console.log('message: ', message);
        // console.log(content);
        const handler = handlers.get(message.fields.routingKey);

        if (handler) {
          handler(content);
        }
        ackOrNack();
      })
      .on('error', console.error);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { initRabbitMQ };
