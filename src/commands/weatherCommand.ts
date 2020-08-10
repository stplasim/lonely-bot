import { Context } from "telegraf";
import axios from "axios";
import {logError, logInfo} from "../util/logger";

/**
 * Get weather info from api
 * https://openweathermap.org
 *
 * @param ctx - Bot context object
 */
export default async function (ctx: Context): Promise<void> {
    try {
        // Get potential args
        const info = ctx.message?.text?.replace('/weather ', '').split(' ');

        if(info == undefined || info.length != 2) {
            // Return help if command and args were wrong
            await ctx.replyWithMarkdown(
                'I\'m sorry, my dude. But you messed up on something.\n' +
                'You probably didn\'t enter the command completely or entered it wrong\n' +
                'Here is the command how you should use it\n' +
                '_/weather <ZIP Code> <city code>_\n\n' +
                'Here is an example\n' +
                '_/weather 39042 it_'
            );
            return;
        }

        // Get weather data from api
        const weatherData = await axios({
            "method": "GET",
            "url": "http://api.openweathermap.org/data/2.5/weather",
            "params": {
                "zip": `${info[0]},${info[1]}`,
                "appid": process.env.WEATHER_API,
                "units": "metric"
            }
        });

        // Handle error case
        if(weatherData.data == null) {
            logError("Something went wrong", weatherData.statusText);
            await ctx.reply("Sorry dude but I had trouble getting the data.");
            return;
        }

        // Return text with data as markdown
        ctx.replyWithMarkdown(
            `Today the temperature in ${weatherData.data.name} is ${weatherData.data.main.temp} degrees ` +
            `with a maximum of ${weatherData.data.main.temp_max} and a minimum of ${weatherData.data.main.temp_min} degrees\n` +
            `But let's face it, it's gonna feel like ${weatherData.data.main.feels_like} degrees \n\n` +
            `further weather conditions are ${weatherData.data.weather[0].description}\n` +
            `And the wind speed is around ${weatherData.data.wind.speed} km/h\n\n` +
            'That\'s all for now. Have a nice day'
        )
            .then(() => logInfo(`Send bot version to ${ctx.from?.username}`))
            .catch(err => logError("Something went wrong: ", err));
    }
    catch (err) {
        logError("Something went wrong", err);
        await ctx.reply('The weather gods don\'t want to tell you the weather right now');
    }
}