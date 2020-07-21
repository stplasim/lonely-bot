const data = require('../data/useless');

module.exports = {
  /**
   * Get random fact from fact file
   *
   * @param ctx - Bot context object
   * @returns {Promise<Message|MiddlewareFn<TelegrafContext>>}
   */
  async getFact(ctx) {
    // Generate random index
    const randomIndex = Math.floor(Math.random() * data.length);

    // Get fact and return it
    const fact = data[randomIndex];
    return ctx.reply(fact);
  }
}
