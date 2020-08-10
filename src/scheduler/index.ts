import { Telegraf } from "telegraf";
import { schedule } from "node-cron";
import { generateNews } from "../commands/newsCommand";
import {logError, logInfo} from "../util/logger";

/**
 * Schedule news
 *
 * @param bot - Main bot instance
 */
export function scheduleNews(bot: Telegraf<any>) {
    schedule("0 8 * * *", async function () {
        // Chet id
        const chetId = process.env.CHAT_ID;

        if(chetId == undefined) {
            logError("Chet id is not defined");
            return;
        }

        try {
            // Get headlines
            const newsData = await generateNews(7);

            // Send news into group
            bot.telegram.sendMessage(chetId, newsData, {
                parse_mode: "Markdown"
            })
                .then(() => logInfo(`Send News to group with id${chetId}`))
                .catch(err => logError("Something went wrong: ", err));
        }
        catch (err) {
            logError("Something went wrong", err);
            await bot.telegram.sendMessage(chetId, "Sorry but I had trouble getting the news for today.");
        }
    });
}