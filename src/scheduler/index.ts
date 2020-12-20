import { Telegraf } from "telegraf";
import { schedule } from "node-cron";
import {logError, logInfo} from "../util/logger";
import {getMemeFromAPI} from "../commands/memeCommand";
import {getUselessFactFromAPI} from "../commands/factsCommand";

/**
 * Schedule daily meme
 *
 * @param bot - Main bot instance
 */
export function scheduleMemes(bot: Telegraf<any>) {
    schedule("0 8 * * *", async function () {
        // Chet id
        const chetId = process.env.CHAT_ID;

        if(chetId == undefined) {
            logError("Chet id is not defined");
            return;
        }

        try {
            // Get daily meme
            const dailyMeme = await getMemeFromAPI()

            // Send daily meme with text
            bot.telegram.sendPhoto(chetId, dailyMeme.data.url)
                .then(() => logInfo(`Send daily meme to group with id ${chetId}`))
                .catch(err => logError("Something went wrong: ", err));

            bot.telegram.sendMessage(
                chetId,
                `Greetings my dudes, here is your daily meme from the ${dailyMeme.data.subreddit} subreddit. `
            )
                .then(() => logInfo(`Send daily meme to group with id ${chetId}`))
                .catch(err => logError("Something went wrong: ", err));
        }
        catch (err) {
            logError("Something went wrong", err);
            await bot.telegram.sendMessage(chetId, "Sorry, but I had problems selling your data to the NSA.");
        }
    });
}