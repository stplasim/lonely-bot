import { Context } from "telegraf";
import axios from "axios";
import {logError, logInfo} from "../util/logger";

/**
 * Get joke form joke api
 *
 * @param ctx - Bot context object
 */
export default async function (ctx: Context): Promise<void> {
    try {
        // Get joke from api
        const joke = await axios.get("https://icanhazdadjoke.com", {
            headers: {
                Accept: "application/json"
            }
        });

        // Check if joke is not undefined
        if(joke == undefined) {
            logError("Error while getting joke from api");
            await ctx.reply("Sorry dude but I had trouble getting the data.");
            return;
        }

        // Send joke to user
        ctx.reply(`${joke.data.joke} \n\n😂😂`)
            .then(() => logInfo(`Send joke to ${ctx.from?.username}`))
            .catch(err => logError("Something went wrong: ", err));
    }
    catch (err) {
        logError("Something went wrong", err);
        await ctx.reply("It looks like something didn't quite go as planned. Just try it again my dude.");
    }
}