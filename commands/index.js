module.exports = (bot) => {
  // Handle greeting command
  bot.command('hello', ctx => {
    return require('./greeting').simpleGreet(ctx);
  });

// Handle random fun fact
  bot.command('fact', ctx => require('./facts').getFact(ctx));

// Handle help command
  bot.command('help', ctx => {
    console.log(ctx.message);
    return ctx.reply(
      'Hi, my dude, looks like you need some help. ' +
      'Here you have a list of all the commands I understand. \n\n' +
      '/help - Get some help \n' +
      '/fact - Get information that will change your life \n' +
      '/news - Here you get some real news. If you only use news you will get general news. ' +
      'If you want something more specific just write: tech, germany or italy behind it to get news from these areas.\n' +
      '/joke - Want to hear a bad joke? Then you\'re in the right place.\n' +
      '/meme - You really need a meme. Here you get one.'
    );
  });

// Handle news command
  bot.command('news', ctx => require('./news').getNews(ctx));

// Handle joke command
  bot.command('joke', ctx => require('./joke').getJoke(ctx));

// Handle joke command
  bot.command('meme', ctx => require('./meme').getMeme(ctx));
}
