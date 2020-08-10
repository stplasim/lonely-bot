import { Context } from "telegraf";
import {logError, logInfo, logWarning} from "../util/logger";

/**
 * Get greeting
 *
 * @param ctx - Bot context object
 */
export default function(ctx: Context): void {
    // Get current day for wednesday surprise
    const day = new Date().getDay();

    // Wednesday message
    if(day == 3) {
        // Send text
        ctx
            .reply("Hey, my dude. It\'s Wednesday. Here\'s your Wednesday cookie. 🍪")
            .then(() => logInfo(`Send Greeting to ${ctx.from?.username}`))
            .catch(err => logError("Something went wrong: ", err));

        // Send meme
        ctx
            .replyWithPhoto({ source: "../assets/image/665.jpg" })
            .then(() => logInfo(`Send Greeting to ${ctx.from?.username}`))
            .catch(err => logError("Something went wrong: ", err));

        return;
    }

    // Send regular non wednesday message
    const user = ctx.from?.username;
    ctx
        .reply(`${user === undefined || null ? 'Hey' : 'Hi ' + user }, hope you have a nice day`)
        .then(() => logInfo(`Send Greeting to ${ctx.from?.username}`))
        .catch(err => logError("Something went wrong: ", err));

    return;
}