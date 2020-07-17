const axios = require('axios');

module.exports = {
  getWeather(ctx) {
    const info = ctx.message.text.replace('/weather ', '').split(' ');

    if(info.length === 2) {
      axios({
        "method": "GET",
        "url": "http://api.openweathermap.org/data/2.5/weather",
        "params": {
          "zip": `${info[0]},${info[1]}`,
          "appid": process.env.WEATHER_API,
          "units": "metric"
        }
      })
      .then(data => {
        return ctx.replyWithMarkdown(
          `Today the temperature in ${data.data.name} is ${data.data.main.temp} degrees ` +
          `with a maximum of ${data.data.main.temp_max} and a minimum of ${data.data.main.temp_min} degrees\n` +
          `But let's face it, it's gonna feel like ${data.data.main.feels_like} degrees \n\n` +
          `further weather conditions are\n` +
          `Weather: ${data.data.weather[0].description}\n` +
          `The wind speed is ${data.data.wind.speed} km/h\n\n` +
          'That\'s all for now. Have a nice day'
        )
      })
      .catch(err => {
        console.log(err);
        return ctx.reply('The weather gods don\'t want to tell you the weather right now');
      });
    }
    else {
      return ctx.replyWithMarkdown(
        'I\'m sorry, my dude. But you messed up on something.\n' +
        'You probably didn\'t enter the command completely or entered it wrong\n' +
        'Here is the command how you should use it\n' +
        '_/weather <ZIP Code> <city code>_\n\n' +
        'Here is an example\n' +
        '_/weather 39042 it_'
      );
    }
  }
}
