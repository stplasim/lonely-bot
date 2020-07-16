const cron = require('node-cron');

module.exports = (bot) => {
  // Schedule news
  cron.schedule('0 8 * * *', () => {
    require('../commands/news')
      .getGeneralNews()
      .then(news => bot.telegram.sendMessage(process.env.CHAT_ID, news))
      .catch(err =>  bot.telegram.sendMessage(process.env.CHAT_ID, err));
  });
}
