const deleteMessage = (ctx) => {
  let chatId = ctx.chat.id;
  let msgId = ctx.message_id;
  ctx.deleteMessage(chatId, msgId);
};

const serviceMessages = (bot) => {
  bot.on('new_chat_members', (ctx) => {
    try {
      console.log('chat new members: ', ctx.message.new_chat_members);
      console.log('chat message: ', ctx.message);
      deleteMessage(ctx);
    } catch (error) {
      console.log(error);
    }
  });
  bot.on('left_chat_member', (ctx) => deleteMessage(ctx));
};

module.exports = serviceMessages;
