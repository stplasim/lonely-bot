const axios = require('axios');

module.exports = {
  /**
   * Get memes from reddit.
   * This command is using the meme api
   * https://github.com/R3l3ntl3ss/Meme_Api
   *
   * @param ctx - Bot context object
   */
  getMeme(ctx) {
    // Get meme data from api
    axios.get('https://meme-api.herokuapp.com/gimme')
      .then(data => {
        // Return meme as image to user
        return ctx.replyWithPhoto({
          url: data.data.url,
          filename: data.data.title
        });
      })
      .catch(e => {
        console.log(e);
        // Handle potential error
        ctx.reply('Sorry but the meme Lord says no to your request');
    });
  }
}
