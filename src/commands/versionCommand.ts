import { Context } from "telegraf";
import {logError, logInfo} from "../util/logger";

/**
 * Get bot version and co.
 *
 * @param ctx - Bot context object
 */
export default function (ctx: Context): void {
    ctx.replyWithMarkdown(
        `Hey, my dude. I\'m the *${process.env.BOT_NAME}*. ` +
        `I am currently running on the version *${process.env.BOT_VERSION}\n*` +
        'If you want to expand me, you can find me at Github. \n' +
        `Let me give you the link. [GitHub](https://github.com/stplasim/lonely-bot)\n`
    )
        .then(() => logInfo(`Send bot version to ${ctx.from?.username}`))
        .catch(err => logError("Something went wrong: ", err));
}