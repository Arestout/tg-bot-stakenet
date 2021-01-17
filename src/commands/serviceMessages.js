const deleteMessage = (ctx) => {
  const { message_id } = ctx.message;
  ctx.deleteMessage(message_id);
};

const serviceMessages = (bot) => {
  bot.on('new_chat_members', (ctx) => deleteMessage(ctx));
  bot.on('left_chat_member', (ctx) => deleteMessage(ctx));
};

module.exports = serviceMessages;
