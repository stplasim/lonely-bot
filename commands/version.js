module.exports = {
  getVersion(ctx) {
    return ctx.replyWithMarkdown(
      `Hey, my dude. I\'m the *${process.env.BOT_NAME}*. ` +
      `I am currently running on the version *${process.env.BOT_VERSION}\n*` +
      'If you want to expand me, you can find me at Github. \n' +
      `Let me give you the link. [GitHub](https://github.com/stplasim/lonely-bot)\n`
    );
  }
}
