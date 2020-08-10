import { Context } from "telegraf";
import {logError, logInfo} from "../util/logger";

/**
 * Display help dialog
 *
 * @param ctx - Bot context object
 */
export default function (ctx: Context): void {
    ctx.replyWithMarkdown(
        'Hi, my dude, looks like you need some help. ' +
        'Here you have a list of all the commands I understand. \n\n' +
        '*/help* - Get some help \n\n' +
        '*/hello* - Does nobody greet you? No problem, I\'ll do it.\n\n' +
        '*/fact* - Get information that will change your life \n\n' +
        '*/news* - Here you get some real news.' +
        '*/joke* - Want to hear a bad joke? Then you\'re in the right place.\n\n' +
        '*/meme* - You really need a meme. Here you get one.\n\n' +
        '*/weather* - Get the current weather situation\n\n' +
        '*/quiz* - Don\'t know what to do?. No problemo. Play a quiz.\n\n' +
        '*/version* - Get infos about me'
    )
        .then(() => logInfo(`Send help to ${ctx.from?.username}`))
        .catch(err => logError("Something went wrong: ", err));
}