import {Telegraf} from "telegraf";

// Import commands
import helloCommand from "./helloCommand";
import factsCommand from "./factsCommand";
import helpCommand from "./helpCommand";
import jokeCommand from "./jokeCommand";
import memeCommand from "./memeCommand";
import versionCommand from "./versionCommand";
import weatherCommand from "./weatherCommand";
import quizCommand from "./quizCommand";
import {newsCommand} from "./newsCommand";


export default (bot: Telegraf<any>) => {
    // Handle hello command
    bot.command("hello", helloCommand);

    // Handle fact command
    bot.command("fact", factsCommand);

    // Handle help command
    bot.command("help", helpCommand);

    // Handle joke command
    bot.command("joke", jokeCommand);

    // Handle meme command
    bot.command("meme", memeCommand);

    // Handle weather command
    bot.command("weather", weatherCommand);

    // Handle quiz command
    bot.command("quiz", quizCommand);

    // Handle news command
    bot.command("news", ctx => newsCommand(ctx, 7));

    // Handle version command
    bot.command("version", versionCommand);
}