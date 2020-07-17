module.exports = (bot) => {
  // Handle greeting command
  bot.command('hello', ctx => {
    return require('./greeting').simpleGreet(ctx);
  });

  // Handle random fun fact
  bot.command('fact', ctx => require('./facts').getFact(ctx));

  // Handle help command
  bot.command('help', ctx => require('./help').getHelp(ctx));

  // Handle news command
  bot.command('news', ctx => require('./news').getNews(ctx));

  // Handle joke command
  bot.command('joke', ctx => require('./joke').getJoke(ctx));

  // Handle joke command
  bot.command('meme', ctx => require('./meme').getMeme(ctx));

  // Handle weather command
  bot.command('weather', ctx => require('./weather').getWeather(ctx));

  // Handle version command
  bot.command('version', ctx => require('./version').getVersion(ctx));
}
