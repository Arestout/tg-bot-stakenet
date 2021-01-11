const help = (bot) => {
  bot.help((ctx) => {
    ctx.reply(`
    /depth for GUI
    or you can use a shortcut
    /d usdt
    where usdt is the trading pair to XSN
    `);
  });
};

module.exports = help;
