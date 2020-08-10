import { Context } from "telegraf";
import axios from "axios";
import {logError, logInfo} from "../util/logger";

/**
 * Get news headlines form the news api
 * This command is using the News API from
 * https://newsapi.org
 *
 * @param ctx - Bot context object
 * @param headlines - Number of headlines to display
 * @param chetId - Options chet id to sent to
 */
export async function newsCommand(ctx: Context, headlines: number): Promise<void> {
    try {

        // Get headlines
        const newsRes = await generateNews(headlines);

        // Send news to user
        ctx.replyWithMarkdown(newsRes)
            .then(() => logInfo(`Send News to ${ctx.from?.username}`))
            .catch(err => logError("Something went wrong: ", err));
    }
    catch (err) {
        logError("Something went wrong", err);
        await ctx.reply("It looks like something didn't quite go as planned. Just try it again my dude.");
    }
}

/**
 * Generate list of news from api
 *
 * @param headlines - Number of headlines to display
 */
export function generateNews(headlines: number): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
        if (headlines > 10 || headlines < 1) {
            logError("A maximum of 10 headlines are allowed and there must be at least one headline");
            reject("It looks like something didn't quite go as planned. Just try it again my dude.");
        }

        const news = await axios({
            "method": "GET",
            "url": "https://newsapi.org/v2/top-headlines",
            "params": {
                "sources": "techcrunch,spiegel-online,bbc-news,cnn",
                "pageSize": "40",
                "apiKey": process.env.NEWS_API
            }
        });

        // Handle error case
        if (news.data == null) {
            logError("Something went wrong", news.statusText);
            reject("Sorry dude but I had trouble getting the data.");
            return;
        }

        // Set heading
        let newsRes = `All right, guys, here are your top ${headlines} headlines of the day. \n\n`;

        // Select 7 random news from the api
        for (let i = 0; i < headlines; i++) {
            // Make article
            const {title, description, url} = news.data.articles.shuffle().pop();
            newsRes += `*${title}*\n\n`
            newsRes += description + '\n';
            newsRes += `[More here](${url})\n`;
            newsRes += '\n----------------------------------------\n\n'
        }

        resolve(newsRes);
    });
}