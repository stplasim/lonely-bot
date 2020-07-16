const axios = require('axios');

module.exports = {
  getMeme(ctx) {
    axios.get('https://meme-api.herokuapp.com/gimme')
      .then(data => {
        return ctx.replyWithPhoto({
          url: data.data.url,
          filename: data.data.title
        });
      })
      .catch(e => {
        console.log(e);
        ctx.reply('Sorry but the meme Lord says no to your request');
    });
  }
}
