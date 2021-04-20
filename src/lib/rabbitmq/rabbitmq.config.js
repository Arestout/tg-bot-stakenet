const Broker = require('rascal').BrokerAsPromised;
const config = require('./configFile');
const sendMessage = require('../../shared/sendMessage');
const { composeAsync } = require('../../shared/compose');
const getTransactionValueInUSD = require('./utils/getTransactionValueInUSD');

const generateWhaleTransactionMessage = require('./messages/whaleTransaction.message');
const generateBurnTransactionMessage = require('./messages/burnTransaction.message');

const handlers = new Map([
  ['whale_transaction', generateWhaleTransactionMessage],
  ['burn_transaction', generateBurnTransactionMessage],
]);

async function initRabbitMQ() {
  try {
    const broker = await Broker.create(config);
    broker.on('error', console.error);

    // const message = {
    //   transactionAmount: 15000,
    //   transactionHash:
    //     '9c6319c6c17592fc4388a5abbd822132f2312f80dbff8eef6c94e1aefa490ab6',
    // };

    // const publication = await broker.publish('bot_publisher', message);
    // publication.on('error', console.error);

    const subscription = await broker.subscribe('exchange_bot_subscriber');
    subscription
      .on('message', async (message, content, ackOrNack) => {
        const generateMessage = handlers.get(message.fields.routingKey);

        if (!generateMessage) {
          return;
        }

        const handleContent = composeAsync(
          getTransactionValueInUSD,
          generateMessage,
          sendMessage
        );

        await handleContent(content);
        ackOrNack();
      })
      .on('error', console.error);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { initRabbitMQ };
