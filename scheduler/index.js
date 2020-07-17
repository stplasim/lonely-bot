const cron = require('node-cron');

module.exports = (bot) => {
  // Schedule news
  cron.schedule('0 8 * * *', () => {
    require('../commands/news')
      .getGeneralNews()
      .then(news => bot.telegram.sendMessage(process.env.CHAT_ID, news, {
        parse_mode: 'Markdown'
    }))
      .catch(err =>  {
        console.log(err);
        bot.telegram.sendMessage(process.env.CHAT_ID, err)
    });
  });
}
