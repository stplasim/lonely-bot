module.exports = {
  simpleGreet(ctx) {
    const day = new Date().getDay();

    // Wednesday message
    if(day === 3) {
      // Send text
      ctx.reply(
        'Hey, my dude. It\'s Wednesday. Here\'s your Wednesday cookie. 🍪'
      );

      // Send frog meme
      return ctx.replyWithPhoto({
        source: 'assets/image/665.jpg'
      })
    }

    // Send regular non wednesday message
    return ctx.reply(`Hi ${ctx.from.username}, hope you have a nice day`);
  }
}
