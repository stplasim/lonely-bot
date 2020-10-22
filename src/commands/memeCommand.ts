import { Context } from "telegraf";
import axios, { AxiosResponse } from "axios";
import {logError, logInfo} from "../util/logger";

type MemeData = {
    postLink: string
    subreddit: string
    title: string
    url: string
    nsfw: boolean
    spoiler: boolean
    author: string
    ups: number
}

/**
 * Get memes from reddit.pi
 * https://github.com/R3l3ntl3ss/Meme_Api
 *
 * @return { Meme data }
 */
async function getMemeFromAPI(): Promise<AxiosResponse<MemeData>> {
    return await axios.get("https://meme-api.herokuapp.com/gimme", {
        headers: {
            Accept: "application/json"
        }
    });
}

/**
 * Get memes from reddit.
 * This command is using the meme api
 * https://github.com/R3l3ntl3ss/Meme_Api
 *
 * @param ctx - Bot context object
 */
async function memeCommand(ctx: Context): Promise<void> {
   try {
       // Get meme data from api
       const meme = await getMemeFromAPI()

       // Handle error case
       if(meme.data == null) {
           logError("Something went wrong", meme.statusText);
           await ctx.reply("Sorry dude but I had trouble getting the data.");
           return;
       }

       // Send meme
       ctx.replyWithPhoto({
           url: meme.data.url,
           filename: meme.data.title
       })
           .then(() => logInfo(`Send meme ${meme.data.postLink} to ${ctx.from?.username}`))
           .catch(err => logError("Something went wrong: ", err));
   }
   catch (err) {
       logError("Something went wrong", err);
       await ctx.reply("It looks like something didn't quite go as planned. Just try it again my dude.");
   }
}

export { memeCommand, getMemeFromAPI }
export type { MemeData }