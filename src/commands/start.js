const subscribeRequest = {
  id: 9,
  method: 'trades_subscribe',
  params: ['XSN_USDT'],
};

const startBot = (ctx, socket) => {
  socket.send(JSON.stringify(subscribeRequest));
  ctx.reply('Bot has started!');
};

module.exports = startBot;
