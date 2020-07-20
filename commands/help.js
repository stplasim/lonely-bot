module.exports = {
  getHelp(ctx) {
    console.log(ctx.message);
    return ctx.replyWithMarkdown(
      'Hi, my dude, looks like you need some help. ' +
      'Here you have a list of all the commands I understand. \n\n' +
      '*/help* - Get some help \n\n' +
      '*/hello* - Does nobody greet you? No problem, I\'ll do it.\n\n' +
      '*/fact* - Get information that will change your life \n\n' +
      '*/news* - Here you get some real news. If you only use news you will get general news. ' +
      'If you want something more specific just write: tech, germany or italy behind it to get news from these areas.\n\n' +
      '*/joke* - Want to hear a bad joke? Then you\'re in the right place.\n\n' +
      '*/meme* - You really need a meme. Here you get one.\n\n' +
      '*/weather* - Get the current weather situation\n\n' +
      '*/quiz* - Don\'t know what to do?. No problemo. Play a quiz.\n\n' +
      '*/version* - Get infos about me'
    );
  }
}
