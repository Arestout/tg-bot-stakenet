const deleteMessage = (ctx) => {
  let chatId = ctx.chat.id;
  let msgId = ctx.message_id;
  ctx.deleteMessage(chatId, msgId);
};

const serviceMessages = (bot) => {
  bot.on('new_chat_members', (ctx) => deleteMessage(ctx));
  bot.on('left_chat_member', (ctx) => deleteMessage(ctx));
};
