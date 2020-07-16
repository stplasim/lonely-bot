const data = require('../data/useless');

module.exports = {
  async getFact(ctx) {
    const randomIndex = Math.floor(Math.random() * data.length);
    const fact = data[randomIndex];
    return ctx.reply(fact);
  }
}
