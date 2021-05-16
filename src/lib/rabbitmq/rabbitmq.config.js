const Broker = require('rascal').BrokerAsPromised;
const config = require('./configFile');
const sendMessage = require('../../shared/sendMessage');
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

    const subscription = await broker.subscribe('exchange_bot_subscriber');
    subscription
      .on('message', async (message, content, ackOrNack) => {
        const generateMessage = handlers.get(message.fields.routingKey);

        if (!generateMessage) {
          return;
        }

        const transactionValueInUSD = getTransactionValueInUSD(content);
        const messageToSend = generateMessage({
          ...content,
          transactionValueInUSD,
        });
        await sendMessage(messageToSend);
        ackOrNack();
      })
      .on('error', console.error);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { initRabbitMQ };
