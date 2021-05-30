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
        if (content?.headers?.event_version != 1) {
          console.error('Event version is not supported'); //TODO: add logger
          return;
        }

        const generateMessage = handlers.get(message.fields.routingKey);

        if (!generateMessage) {
          return;
        }

        const transactionValueInUSD = await getTransactionValueInUSD(
          content.transactionValue
        );
        const messageToSend = generateMessage({
          ...content,
          transactionValueInUSD,
        });

        await sendMessage(messageToSend);
        ackOrNack();
      })
      .on('error', (err) => {
        console.error('Subscriber error', err);
      })
      .on('invalid_content', (err, message, ackOrNack) => {
        console.error('Invalid content', err);
        ackOrNack(err);
      });
  } catch (err) {
    console.error(err);
  }
}

module.exports = { initRabbitMQ };
