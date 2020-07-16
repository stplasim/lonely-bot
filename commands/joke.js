const axios = require('axios');

module.exports = {
  getJoke(ctx) {
    axios.get('https://icanhazdadjoke.com', {
      headers: {
        Accept: 'application/json'
      }
    })
      .then(data => ctx.reply(`${data.data.joke} \n\n😂`))
      .catch(e => {
        console.log(e);
        return ctx.reply("Sorry dude but I had trouble getting the data.");
      });
  }
}
