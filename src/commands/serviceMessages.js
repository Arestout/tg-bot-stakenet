const deleteMessage = (ctx) => {
  let chatId = ctx.chat.id;
  let msgId = ctx.message_id;
  ctx.deleteMessage(chatId, msgId);
};

const serviceMessages = (bot) => {
  bot.on('new_chat_members', (ctx) => {
    try {
      console.log(ctx);
      console.log(ctx.message);
      ctx.forEach((ctx) => deleteMessage(ctx));
    } catch (error) {
      console.log(error);
    }
  });
  bot.on('left_chat_member', (ctx) => deleteMessage(ctx));
};

module.exports = serviceMessages;
