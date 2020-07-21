const axios = require('axios');

module.exports = {
  /**
   * Get joke form joke api
   *
   * @param ctx - Bot context object
   */
  getJoke(ctx) {
    // Get joke from api
    axios.get('https://icanhazdadjoke.com', {
      headers: {
        Accept: 'application/json'
      }
    })
      // Return it to the user with emoji
      .then(data => ctx.reply(`${data.data.joke} \n\n😂`))
      .catch(e => {
        console.log(e);
        // Handle potential error
        return ctx.reply("Sorry dude but I had trouble getting the data.");
      });
  }
}
