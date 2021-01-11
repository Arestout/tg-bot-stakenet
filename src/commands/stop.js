const unsubscribeRequest = {
  id: 10,
  method: 'trades_unsubscribe',
  params: [],
};

const stop = (bot, webSocket) => {
  bot.stop((ctx) => {
    webSocket.send(JSON.stringify(unsubscribeRequest));
    ctx.reply('Bot has stopped');
  });
};

module.exports = stop;
