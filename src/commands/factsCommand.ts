import { Context } from "telegraf";
import { loadFileFromPath } from "../util/fileIO";
import { logInfo, logError } from "../util/logger";
import axios, { AxiosResponse } from "axios";

type UselessFactData = {
    id: string
    text: string
    source: string
    language: string
}

/**
 * Get random fact from fact file
 *
 * @param ctx - Bot context object
 */
async function factCommand(ctx: Context): Promise<void> {
    try {
        const data = loadFileFromPath(__dirname, "..", "..", "data", "useless.json");

        // Convert facts json to Object
        const factObj = JSON.parse(data);

        // Generate random index
        const randomIndex = Math.floor(Math.random() * factObj.length);

        // Get fact and return it
        const fact = factObj[randomIndex];
        ctx.reply(fact)
            .then(() => logInfo(`Send fact Nr. ${randomIndex} to user ${ctx.from?.username}`))
            .catch(err => logError("Something went wrong", err));
    }
    catch (err) {
        logError("Something went wrong", err);
        await ctx.reply("It looks like something didn't quite go as planned. Just try it again my dude.");
    }
}

/**
 * Get useless fact from api
 */
async function getUselessFactFromAPI(): Promise<AxiosResponse<UselessFactData>> {
    return await axios.get("https://uselessfacts.jsph.pl/random.json", {
        headers: {
            Accept: "application/json"
        }
    });
}

/**
 * Useless fact command
 */
async function uselessFactCommand(ctx: Context): Promise<void> {
    try {

        const fact = await getUselessFactFromAPI()

        ctx.reply(fact.data.text)
            .then(() => logInfo(`Send useless fact to user ${ctx.from?.username}`))
            .catch(err => logError("Something went wrong", err));
    }
    catch (err) {
        logError("Something went wrong", err);
        await ctx.reply("It looks like something didn't quite go as planned. Just try it again my dude.");
    }
}

export { uselessFactCommand, factCommand, getUselessFactFromAPI }
export type { UselessFactData }